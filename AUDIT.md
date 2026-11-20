# Futur//Numérique — Audit reproductible (20 novembre 2026)

## Corpus réellement traité

- Onisep Hauts-de-France : **2289** enregistrements.
- Parcoursup 2026 Hauts-de-France : **2277** enregistrements.
- Total documentaire : **4566** enregistrements ; ce n'est **pas** un nombre de formations distinctes.
- Fiches Parcoursup avec rapprochement fort **à confirmer** : **805**.
- Rapprochements candidats à examiner : **534**.
- Sans correspondance suffisante : **938**.
- Fiches d'écoles spécialisées présélectionnées dans Onisep : **36** (sans validation individuelle).

## Méthode de rapprochement

Recherche par code UAI d'établissement, sinon par commune ; comparaison normalisée des intitulés par tokens et similarité textuelle. Les codes UAI d'un lycée ou d'une université peuvent couvrir plusieurs offres, et une commune peut contenir plusieurs établissements : **aucune paire n'est automatiquement certifiée identique**. Les scores ne sont pas des probabilités. Les résultats sont dans `rapprochement_documente.csv`.

## Contrôles restant non réalisés

1. **Catalogue national de l'apprentissage hors Parcoursup** : export national absent ; le recensement Parcoursup ne remplace pas cette base.
2. **Écoles spécialisées** : les 36 enregistrements repérés ne constituent pas une vérification exhaustive des catalogues, statuts et reconnaissances.
3. **Recette visuelle et fonctionnelle en navigateur** : non exécutée ici.
4. **Actualité 2027** : aucun établissement n'est réputé ouvert à la rentrée 2027 sur la seule foi des données 2026.

## Critère de publication

L'application est un atlas documentaire 2026. Elle ne doit pas porter le qualificatif « exhaustif certifié » tant que les sources complémentaires et les arbitrages manuels ne sont pas clos.
