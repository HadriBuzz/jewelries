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

## Google Drive + Google Apps Script

La solution la plus simple pour automatiser le site est maintenant prete dans:

- [google-apps-script/drive-to-github.gs](/home/leclerc/jewelries/google-apps-script/drive-to-github.gs:1)
- [google-apps-script/README.md](/home/leclerc/jewelries/google-apps-script/README.md:1)

Principe:

1. tu ajoutes une photo dans un dossier Google Drive
2. Google Apps Script lit ce dossier
3. le script envoie les images dans ce repo GitHub
4. le script regenere `catalog.json`
5. GitHub Pages republie le site

## Mise en place rapide

1. Cree un dossier Google Drive pour les bijoux.
2. Ouvre `script.google.com` et cree un projet Apps Script.
3. Copie le contenu de `google-apps-script/drive-to-github.gs`.
4. Remplace les valeurs `PUT_YOUR_...` dans `CONFIG`.
5. Dans Apps Script, ajoute une Script Property `GITHUB_TOKEN`.
6. Lance `testGitHubConnection()`.
7. Lance `syncJewelryCatalog()`.
8. Ajoute un trigger horaire si tu veux une sync automatique.

## Token GitHub

Le script utilise l'API GitHub pour creer ou mettre a jour les fichiers du repo.
Il faut donc un token GitHub avec droit d'ecriture sur le contenu du repository.

## Remarque

Dans cette premiere version, les images supprimees de Google Drive ne sont pas retirees automatiquement du repo GitHub. On pourra ajouter cette synchronisation complete dans une deuxieme passe.
