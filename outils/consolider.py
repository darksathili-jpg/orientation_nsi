"""Reconstruit les données embarquées et le registre de contrôle à partir des exports officiels."""
import argparse
from collections import Counter, defaultdict
import csv
import json
from pathlib import Path
import re
import unicodedata

ROOT = Path(__file__).resolve().parent.parent
PARCOURSUP = "Parcoursup 2026"

def norm(value):
    letters = unicodedata.normalize("NFKD", value.casefold().replace("œ", "oe"))
    return " ".join(re.findall("[a-z0-9]+", letters.encode("ascii", "ignore").decode()))

def read_csv(path):
    with path.open(encoding="utf-8-sig", newline="") as stream:
        yield from csv.DictReader(stream, delimiter=";")

def write_csv(path, rows):
    with path.open("w", encoding="utf-8-sig", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=list(dict.fromkeys(key for row in rows for key in row)), delimiter=";", lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)

def coordinates(value):
    try:
        lat, lon = map(float, value.replace(";", ",").split(","))
        if 48 < lat < 52 and 1 < lon < 5:
            return lat, lon
    except ValueError:
        pass
    return None, None

def family(title, degree):
    text = norm(degree)
    if text.startswith(("bts", "brevet de technicien superieur")):
        return "BTS"
    if text.startswith(("but", "bachelor universitaire de technologie")):
        return "BUT"
    if text.startswith(("cpge", "prepa scientifique", "prepa litteraire", "prepa economique")):
        return "CPGE"
    if text in {"licence pro", "licence professionnelle"}:
        return "Licence professionnelle"
    if "licence" in text.split():
        return "Licence"
    if text == "master":
        return "Master"
    if "ingenieur" in text or "cycle preparatoire integre" in text:
        return "Ingénierie"
    if "ecole specialisee" in text or any(x in text for x in ("design", "art", "spectacle")):
        return "École spécialisée / arts"
    return degree.strip()

DIRECT = re.compile(
    r"\b(informatiques?|cyber\w*|numerique|telecom\w*|multimedia|web|"
    r"robotique|sio|ciel|mmi|geii|mp2i|mpi|miage|miashs|"
    r"intelligence artificielle|science[s]? des donnees|data science|big data|"
    r"systemes embarques|systemes d information|jeux? videos?|game (?:art|design|programming)|"
    r"films? d animation|animation [23]d|design 3d|ux design|programmation)\b"
)
RELATED = re.compile(r"\b(electronique|automatisme|electrotechnique|audiovisuel|design|statistiques?|mathematiques|physique)\b")

def scope(row):
    title = norm(row["title"] + " " + row["specialty"])
    if DIRECT.search(title) or re.search(r"\breseaux (?:et telecommunications|informatiques|operateurs)\b", title):
        return "direct"
    if row["family"] == "CPGE" and re.search(
        r"\b(mpsi|mp|pcsi|pc|psi|ptsi|pt|tsi|tpc|bcpst|tb|scientifique)\b", title
    ):
        return "prepa"
    if row["family"] == "Ingénierie" or RELATED.search(title):
        return "connexe"
    return "hors"

def onisep(rows):
    for row in rows:
        lat, lon = coordinates(row["ENS latitude"] + "," + row["ENS longitude"])
        yield dict(src="Onisep", id=row["Action de Formation (AF) identifiant Onisep"],
                   school=row["Lieu d'enseignement (ENS) libellé"], city=row["ENS commune"],
                   dep=row["ENS département"], title=row["Formation (FOR) libellé"].strip(),
                   degree=row["FOR type"].strip(), specialty="", uai=row["ENS code UAI"],
                   url=row["FOR URL et ID Onisep"], lat=lat, lon=lon, status=row["ENS statut"],
                   apprenticeship=None, modality=row["AF modalités scolarité"], level=row["FOR niveau de sortie"],
                   school_url=row["ENS URL et ID Onisep"])

def parcoursup(rows):
    for row in rows:
        lat, lon = coordinates(row["Localisation"])
        yield dict(src=PARCOURSUP, id=row["Code interne Parcoursup de la formation"],
                   school=row["Nom de l'établissement"], city=row["Commune"], dep=row["Département"],
                   title=row["Nom long de la formation"], degree=row["Types de formation"],
                   specialty=row["Mentions/Spécialités"], uai=row["Identifiant de l'établissement"],
                   url=row["Lien vers la fiche formation"], lat=lat, lon=lon, status=row["Types d'établissement"],
                   apprenticeship=bool(row["Formations en apprentissage"].strip()), modality=row["Aménagement"],
                   level="", school_url=row["Site internet de l'établissement"])

def qualification(row):
    """Clé stricte. Le titre d'une candidature générale ne remplace pas ses parcours Onisep."""
    text = norm(row["title"])
    text = re.sub(r"^bts (services|production) ", "bts ", text)
    text = re.sub(r"^licence mention ", "licence ", text)
    if row["family"] == "CPGE":
        match = re.search(r"\b(mp2i|mpi|mpsi|mp|pcsi|pc|psi|ptsi|pt|tsi)\b", text)
        if match:
            code = match.group()
            # Pour les prépas comportant une option, garder le libellé complet.
            if code in {"mp2i", "mpi"} and "option" not in text:
                return code
    return text

def key(row):
    if not row["uai"] or not row["city"] or not row["title"]:
        return None
    mode = norm(row["modality"])
    if row["src"] == "Onisep":
        if "temps plein" not in mode or "apprentissage" in mode or "distanc" in mode:
            return None
    elif row["apprenticeship"] or "distanc" in mode or "distanc" in norm(row["title"]):
        return None
    if row["family"] not in {"BTS", "BUT", "Licence", "CPGE"}:
        return None
    return row["uai"].upper(), norm(row["city"]), row["family"], qualification(row)

def reconcile(on_rows, ps_rows):
    on_index, ps_index = defaultdict(list), defaultdict(list)
    for rows, index in ((on_rows, on_index), (ps_rows, ps_index)):
        for row in rows:
            if entry_key := key(row):
                index[entry_key].append(row)
    pairs, report = {}, []
    for row in ps_rows:
        entry_key = key(row)
        candidates = on_index.get(entry_key, [])
        matched = len(candidates) == len(ps_index.get(entry_key, [])) == 1
        if matched:
            pairs[row["id"]] = candidates[0]
        report.append(dict(parcoursup_id=row["id"], formation=row["title"], etablissement=row["school"],
                           commune=row["city"], uai=row["uai"], perimetre=row["scope"],
                           apprentissage=row["apprenticeship"],
                           decision="double source" if matched else "fiche Parcoursup conservée",
                           onisep_candidats=" | ".join(x["id"] for x in candidates),
                           lien=row["url"]))
    return pairs, report

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("onisep", type=Path)
    parser.add_argument("parcoursup", type=Path)
    args = parser.parse_args()
    on_rows = list(onisep(r for r in read_csv(args.onisep) if r["ENS région"] == "Hauts-de-France"))
    ps_rows = list(parcoursup(r for r in read_csv(args.parcoursup)
                            if r["Région"] == "Hauts-de-France" and r["Session"] == "2026"))
    if not on_rows or not ps_rows:
        raise ValueError("L’un des exports ne contient aucune ligne régionale attendue.")
    for row in on_rows + ps_rows:
        row["family"] = family(row["title"], row["degree"])
        row["scope"] = scope(row)
        row["sources"] = [row["src"]]
    pairs, report = reconcile(on_rows, ps_rows)
    for row in ps_rows:
        if counterpart := pairs.get(row["id"]):
            row["sources"].insert(0, "Onisep")
            row["related_url"] = counterpart["url"]
            row["related_id"] = counterpart["id"]
    grouped_objects = {id(row) for row in pairs.values()}
    # Keep every source row in the register, including conflicting or missing identifiers.
    published = ps_rows + [row for row in on_rows if id(row) not in grouped_objects]
    published.sort(key=lambda x: (norm(x["city"]), norm(x["school"]), norm(x["title"]), x["id"]))
    write_csv(ROOT / "registre_unifie.csv", on_rows + ps_rows)
    write_csv(ROOT / "rapprochement_documente.csv", report)
    payload = json.dumps(published, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")
    index = ROOT / "index.html"
    page, replaced = re.subn(r'(<script id="dataset" type="application/json">).*?(</script>)',
                             lambda match: match[1] + payload + match[2], index.read_text(), count=1, flags=re.S)
    if replaced != 1:
        raise ValueError("Bloc de données HTML introuvable.")
    index.write_text(page)
    print(dict(onisep=len(on_rows), parcoursup=len(ps_rows), doubles_sources=len(pairs),
               catalogue=len(published), ciblage=dict(Counter(x["scope"] for x in published))))

if __name__ == "__main__":
    main()
