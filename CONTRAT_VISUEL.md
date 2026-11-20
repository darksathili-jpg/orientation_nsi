# CONTRAT VISUEL — ORIENTATION NSI (G0)

Statut : **RÉFÉRENCE PROPOSÉE, EN ATTENTE DE VALIDATION HUMAINE FORMELLE**.
Date : 2026-11-20. Cible : `index.html` et `atelier-original.html` sur `main`.

## Référence
La dernière maquette à deux volets présentée dans la conversation (accueil à gauche, atelier à droite) est la **cible de direction artistique**. Elle doit être conservée comme image de référence versionnée dans le dépôt avant une recette par comparaison d'images. Une image générée n'est pas automatiquement un design exécutable pixel pour pixel ; chaque composant doit être spécifié, implémenté puis confronté aux captures du navigateur.

## Invariants
- Personnage : Darksathi Li, même identité et palette turquoise/cyan/bleu pétrole, accents orange mesurés, sur les deux pages ; aucune substitution emoji, cube ou sphère.
- Sprite : douze poses cohérentes ; toutes recolorées avec la même palette ; cadrage stable et absence de sauts visuels ; respecter `prefers-reduced-motion`.
- Titres : Jokerman sans graisse forcée, sans collisions ni espacement négatif ; lisibilité des accents.
- Charte : bleu pétrole lumineux, cyan/turquoise, contraste texte/fond lisible, composants BD cohérents.
- Accueil : hiérarchie texte, CTA et grand compagnon ; atelier : compagnon, parcours en quatre étapes et trois missions.
- Métier et orientation : conserver les fonctions de filtre, carte, catalogue, missions et liens sources.

## Garde-fous de production
1. **G0** : figer la référence graphique, ses variantes desktop/tablette/mobile, et les ressources source ; relever la palette et les mesures dans un fichier de tokens.
2. **G1** : préparer la sprite sheet recolorée en 3 × 4 et vérifier chacune des 12 cellules, la transparence, la taille et les ancrages.
3. **G2** : implémenter sur les deux pages avec une feuille de styles partagée ; éviter les correctifs CSS empilés et contradictoires.
4. **G3** : vérifier en navigateur (au minimum Chromium) les filtres, les liens, la carte, les missions, la console, l'accessibilité clavier et le mode mouvement réduit.
5. **G4** : captures aux mêmes dimensions et au même contenu que les références ; comparer les zones (hero, typographie, mascotte, navigation, cartes, footer) et produire un rapport d'écarts avec captures côte à côte.
6. **G5** : toute divergence visible non explicitement acceptée bloque le statut « conforme ». Ne pas confondre « commit réussi », « Pages déployé » et « validation visuelle ».

## Critères bloquants
- Mascotte manquante, emoji de substitution, couleurs incohérentes ou mauvaise planche.
- Déformation, découpe, clignotement, saut de pose ou animation inconfortable.
- Jokerman absente, trop grasse, glyphes qui se chevauchent.
- Changement de structure majeur non accepté ; contraste insuffisant ; contenu masqué.
- Filtre, carte, navigation ou mission cassés.
- Absence de capture réelle pour l'une des deux pages.

## Journal de recette (à renseigner après exécution réelle)
| Porte | Statut | Preuve | Écarts |
|---|---|---|---|
| G0 | EN ATTENTE | Référence non encore versionnée | — |
| G1 | NON VALIDÉ | Sprite recolorée non livrée | — |
| G2 | NON VALIDÉ | Implémentation non confrontée à la maquette | — |
| G3 | NON EXÉCUTÉ | Tests navigateur à produire | — |
| G4 | NON EXÉCUTÉ | Captures comparatives à produire | — |
| G5 | EN ATTENTE HUMAINE | Approbation explicite nécessaire | — |

**Règle de publication :** la branche `main` peut contenir du travail en cours, mais une mise en ligne automatique sur GitHub Pages ne vaut pas acceptation. Toute annonce « conforme à la maquette » exige G0–G5 validés.
