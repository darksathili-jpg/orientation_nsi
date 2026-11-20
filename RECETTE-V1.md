# Futur//Numérique — Dossier de recette V1.0

Date : 20 novembre 2026. Statut : **candidate à la publication, sous réserve de recette navigateur locale**.

## Modifications réalisées

- Le catalogue présente par défaut 12 établissements avec des références institutionnelles associées à l'offre ; les 25 fiches restent accessibles via « Tout le répertoire (avec réserves) ».
- Les fiches exploratoires sont explicitement distinguées des offres documentées. La présence d'une source n'est **pas** une certification exhaustive des options, tarifs, modalités ou admissions.
- Les distances et itinéraires non certifiés restent masqués ; la carte est décrite comme indicative.
- Une notice de transparence explique la date, le périmètre, les limites et la nécessité de vérifier Parcoursup 2027.
- Les données et le code demeurent dans un fichier HTML statique. Aucune modification GitHub.

## Contrôles réalisés

- `node --check` sur les scripts JavaScript extraits : **réussi**.
- Vérification des archives ZIP : **réussie**.
- Test Playwright Chromium : **bloqué par la politique d'accès du navigateur** (`ERR_BLOCKED_BY_ADMINISTRATOR`), tant en `file://` qu'en `http://127.0.0.1`. Ce n'est pas une réussite ni un échec fonctionnel de l'application.

## Limites documentaires

- Les 12 entrées « documentées » ont des références associées, mais toutes leurs affirmations ne sont pas certifiées individuellement. Une fiche Onisep d'établissement ne confirme pas nécessairement chaque option, modalité ou tarif.
- Les 25 localisations sont approximatives ; aucune correspondance bâtiment/adresse/coordonnées n'est certifiée.
- La carte Parcoursup 2027 n'étant pas encore disponible à la date de ce rapport, aucune admission 2027 n'est garantie.
- Les ressources Leaflet et les tuiles OpenStreetMap nécessitent Internet.

## Recette manuelle préalable à la mise en ligne

1. Servir le dossier localement (`python -m http.server 8000`), puis ouvrir `http://localhost:8000`.
2. Vérifier l'affichage sur ordinateur, smartphone et vidéoprojecteur, notamment les contrastes et débordements.
3. Vérifier l'affichage initial des 12 fiches, puis des 25 fiches avec « Tout le répertoire ».
4. Tester les filtres domaine/niveau/type, la recherche, le choix d'établissement, les sources et le retour à la région.
5. Vérifier le quiz, les fiches métiers, les liens Onisep/Parcoursup et la carte si Internet est disponible.
6. Ouvrir les outils de développement du navigateur et vérifier l'absence d'erreur JavaScript bloquante.
7. Si tous les tests passent, publier le contenu du ZIP sur GitHub Pages. La publication est effectuée par le propriétaire du dépôt.

## Décision

**Candidate pédagogique publiable après recette manuelle réussie.** Ne pas qualifier les coordonnées ou l'ensemble des formations de « certifiés ».
