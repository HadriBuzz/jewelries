# Jewelries

Le site lit maintenant un petit catalogue depuis `catalog.json`.

## Format des images

Chaque image doit suivre ce format:

`bijou_type_prix_nom.jpg`

Exemples:

- `bijou_bague_128_aura.jpg`
- `bijou_collier_142_lune.jpg`
- `bijou_bracelet_89_soleil-dore.jpg`

## Ajouter un bijou

1. Ajouter l'image dans `images/`
2. Ajouter le nom du fichier dans `catalog.json`
3. Publier sur GitHub

Le site extrait automatiquement:

- le type
- le prix
- le nom

## Etape suivante pour Google Drive

Le plus simple ensuite sera:

1. un dossier Google Drive contenant les photos
2. une automatisation qui copie les nouvelles images vers ce repo
3. une mise a jour automatique de `catalog.json`
4. GitHub Pages republie le site

Cette deuxieme etape peut se faire avec Google Apps Script + GitHub API, ou avec GitHub Actions si on veut un sync periodique.
