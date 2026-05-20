# Wanted

Tracker d'avis de recherche pour Dofus. Inspiré par [Ganymede](https://ganymede-dofus.com).

- Suivi des 82 recherches par milice
- OCR automatique via screenshot
- Always-on-top (reste par-dessus Dofus)
- Transparence réglable
- Sauvegarde locale persistante

## Installation

1. Télécharge `Wanted_Setup.exe` depuis les [Releases](../../releases/latest)
2. Lance-le et suis les instructions
3. Wanted apparaît dans le menu Démarrer et sur le bureau

### Compiler depuis les sources

Si tu préfères builder toi-même plutôt que de lancer un .exe inconnu, c'est encouragé. Il te faut [Node.js](https://nodejs.org/) (version LTS récente).

```bash
git clone https://github.com/Capiia/Wanted-Dofus.git
cd Wanted-Dofus
npm install
npm run build
```

Le setup compilé apparaît dans `dist/Wanted Setup X.Y.Z.exe`. Tu peux aussi lancer l'app directement sans installer avec `npm start`.

Le code est en JavaScript pur, deux fichiers principaux ([`main.js`](main.js), [`js/app.js`](js/app.js)). Aucune transpilation, aucun bundling : ce que tu lis = ce qui tourne. Pas de télémétrie, pas de serveur tiers en dehors de `dofuspourlesnoobs.com` (guides cliquables) et l'API GitHub (check de mise à jour).

Note : un rebuild local produit un binaire avec un SHA différent du release (timestamps NSIS), donc compare le code source plutôt que le binaire.

## Utilisation

1. Entre ton **Niveau**, **Alignement** et **Ordre**
2. L'onglet **À récupérer** montre les avis disponibles triés par milice
3. Clique sur un nom pour ouvrir le guide sur dofuspourlesnoobs.com

### Scanner ses quêtes automatiquement

Pour ajouter tes quêtes en cours ou terminées sans tout cocher à la main :

1. Dans Wanted, clique **Scan En cours** ou **Scan Faits** selon ce que tu veux scanner
2. Dans Dofus, ouvre ton **journal de quêtes**
3. Va dans l'onglet **En cours** pour les quêtes prises, ou **Terminées** pour les quêtes finies
4. Fais **Win+Shift+S** et sélectionne la zone avec les noms "On recherche..."
5. Reviens sur Wanted et fais **Ctrl+V**

L'OCR détecte automatiquement les noms des recherches et les marque dans l'app.
Tu peux faire plusieurs screenshots si ta liste ne tient pas en un seul écran.

## Crédits

Inspiré par [Ganymede](https://ganymede-dofus.com)
Données extraites de [dofuspourlesnoobs.com](https://www.dofuspourlesnoobs.com/avis-de-recherche.html)

by Capia

## License

[MIT](LICENSE)
