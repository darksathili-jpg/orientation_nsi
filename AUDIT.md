# Futur//Numérique — Contrôles du 20 novembre 2026

## Onisep et Parcoursup

L'export Idéo fourni contient 2 289 actions des Hauts-de-France. L'extrait Parcoursup fourni contient 2 277 candidatures régionales de la campagne 2026, dont 964 signalées en apprentissage. Le registre conserve ces 4 566 lignes d'origine. L'import a été reconstruit avec le nom long et la spécialité dans des champs distincts.

Le site affiche 4 130 fiches. Il regroupe 436 paires avec une clé unique dans les deux exports. Cette clé combine le code de l'établissement (unité administrative immatriculée, UAI), la commune, la famille de diplôme et l'intitulé normalisé. Elle compare uniquement les offres initiales sans indice de distanciel et les familles BTS, BUT, licence et classe préparatoire. Les sigles MP2I et MPI sont harmonisés quand aucune option n'est indiquée. Une candidature à un diplôme général reste distincte de ses options ou parcours détaillés. Le rapprochement atteste une convergence documentaire et conserve les deux liens. Les fiches dont les clés divergent restent visibles et peuvent encore se recouper.

Les 2 277 décisions sont dans `rapprochement_documente.csv`. Le filtre thématique repose sur les intitulés et spécialités. « Toutes les formations » rend également accessibles les autres lignes du registre. La campagne 2027 doit être vérifiée sur les sites des établissements et de Parcoursup.

- [Onisep Idéo](https://www.data.gouv.fr/datasets/ideo-actions-de-formation-initiale-univers-enseignement-superieur)
- [Cartographie Parcoursup](https://www.data.gouv.fr/datasets/cartographie-des-formations-parcoursup)

## Apprentissage

Le 20 novembre 2026, le relevé régional paginé de l'interface de programmation du Réseau des Carif-Oref a renvoyé 5 256 identifiants distincts sur 22 pages pour `region=Hauts-de-France` et `published=true`. Parmi eux, 3 631 entrées portent le millésime 2026 (`tags`) et sont publiées au catalogue (`catalogue_published`). Le filtre lexical a retenu 129 entrées numériques parmi ces 3 631.

Le contrôle relève 12 concordances candidates avec au moins l'une des deux bases, dont 5 avec une candidature Parcoursup en apprentissage et 9 avec Onisep. Le critère combine le code de l'établissement d'enseignement ou du formateur, l'intitulé normalisé et la proximité des coordonnées sources (écart de 0,005 degré maximum par axe). Les 117 autres entrées exigent un examen pour distinguer les différences de libellé ou de lieu des offres supplémentaires. Les données détaillées Carif-Oref restent auprès du producteur. Le site affiche les agrégats de l'audit, un lien vers le catalogue et un filtre pour les 964 signalements Parcoursup.

- [Documentation du catalogue national de l’apprentissage](https://catalogue-apprentissage.intercariforef.org/api/v1/docs/)
- [Catalogue à consulter](https://catalogue-apprentissage.intercariforef.org/)

## Écoles spécialisées

| Campus | Vérification documentaire ciblée |
|---|---|
| RUBIKA, Valenciennes | Le catalogue de l'école répertorie Game Art, Game Design, Game Programming et animation 2D/3D. Ces cinq spécialités sont désormais lisibles dans les intitulés Parcoursup 2026. Parcoursup indique Anzin pour ces candidatures et l'école publie son adresse à Valenciennes. Les libellés et localisations d'origine sont conservés. [Catalogue de Valenciennes](https://rubika-edu.com/formations/valenciennes/) |
| Piktura, Roubaix | L’école distingue les options jeu vidéo, animation 2D, animation 3D et illustration dans sa licence Arts, parcours création numérique. L’intitulé Parcoursup est plus général. [Diplômes et formations](https://www.piktura.fr/diplomes-et-formations.html) · [Campus](https://www.piktura.fr/faq.html) |
| e-artsup, Lille | L’école situe son bachelor Jeux vidéo et Game Art à Lille. Le titre annoncé est « Responsable de la création et de la production graphique et visuelle », niveau 6 du Répertoire national des certifications professionnelles, fiche 40867. [Cursus](https://www.e-artsup.net/formations/bachelor-jeux-video-game-art/) · [France compétences](https://www.francecompetences.fr/recherche/rncp/40867/) |
| ARTFX, métropole lilloise | Le campus EuraCreative est documenté et l’école indique que son cursus effets spéciaux est proposé à Lille. [Campus](https://artfx.school/le-campus/lille-euracreative/) · [Cursus](https://artfx.school/) |
| Epitech, Lille | Le campus et son Programme Grande École en informatique en cinq ans sont indiqués dans les pages de l'école. [Campus](https://www.epitech.eu/ecole-informatique-lille/) · [Programme](https://www.epitech.eu/programme-grande-ecole-informatique/) |

Ces vérifications couvrent cinq campus. L’inventaire des autres écoles hors référentiels et les frais ou admissions de tous les cursus restent à vérifier. Le fichier historique `ecoles_specialisees_a_verifier.csv` contient des pistes antérieures.

## Mise à jour reproductible

À la racine du dépôt, avec les exports en fichiers locaux :

```sh
python outils/consolider.py actions-onisep.csv parcoursup.csv
python outils/auditer_apprentissage.py releve-regional-carif-oref.json registre_unifie.csv
```

Le premier programme accepte l'extrait régional ou le fichier national Parcoursup. Il reconstruit les deux registres et les données intégrées à la page.
