"""Contrôle régional 2026 du Réseau des Carif-Oref. Seuls les agrégats sortent de l'audit."""
import argparse
from collections import Counter, defaultdict
import json
from pathlib import Path
import re
from consolider import coordinates, norm, read_csv, scope

def clean_title(title):
    text = norm(title)
    text = re.sub(r"^bts (services|production) ", "bts ", text)
    return re.sub(r"\s+en apprentissage$", "", text)

def main(snapshot, register):
    offers = json.loads(snapshot.read_text())
    if len({r["_id"] for r in offers}) != len(offers):
        raise ValueError("Identifiants Carif-Oref répétés dans le relevé.")
    if any(r["region"] != "Hauts-de-France" or not r["published"] for r in offers):
        raise ValueError("Le relevé sort du périmètre attendu.")
    index = defaultdict(list)
    for row in read_csv(register):
        if row["uai"]:
            index[row["uai"]].append(row)
    counts = Counter(total=len(offers))
    for row in offers:
        if not row["catalogue_published"] or "2026" not in (row.get("tags") or []):
            continue
        counts["campagne"] += 1
        titles = {row.get(k) for k in ("intitule_rco", "intitule_long", "onisep_intitule")} - {"", None}
        combined = " ".join(sorted(titles))
        if scope(dict(title=combined, specialty="", family="")) != "direct":
            continue
        counts["numerique"] += 1
        location = coordinates(row.get("lieu_formation_geo_coordonnees") or "")
        campus = row.get("etablissement_lieu_formation_uai") or row.get("etablissement_formateur_uai")
        exact = {clean_title(t) for t in titles}
        by_source = set()
        for candidate in index[campus]:
            if clean_title(candidate["title"]) not in exact:
                continue
            other = coordinates(candidate["lat"] + "," + candidate["lon"])
            if None in location + other or any(abs(a-b) > .005 for a,b in zip(location, other)):
                continue
            if candidate["src"] == "Parcoursup 2026" and candidate["apprenticeship"] == "True":
                by_source.add("parcoursup")
            elif candidate["src"] == "Onisep":
                by_source.add("onisep")
        if by_source:
            counts["au_moins_une_source"] += 1
            counts.update(by_source)
        else:
            counts["a_examiner"] += 1
    return counts

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("snapshot", type=Path)
    parser.add_argument("registre", type=Path)
    args = parser.parse_args()
    print(json.dumps(main(args.snapshot, args.registre), ensure_ascii=False, indent=2))
