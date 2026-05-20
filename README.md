# Wanted

Tracker d'avis de recherche pour Dofus. Inspire par [Ganymede](https://ganymede-dofus.com).

- Suivi des 82 recherches par milice
- OCR automatique via screenshot
- Always-on-top (reste par-dessus Dofus)
- Transparence reglable
- Sauvegarde locale persistante

## Installation

1. Telecharge `Wanted_Setup.exe` depuis les [Releases](../../releases/latest)
2. Lance-le et suis les instructions
3. Wanted apparait dans le menu Demarrer et sur le bureau

### Compiler depuis les sources

Si tu prefere builder toi-meme plutot que de lancer un .exe inconnu, c'est encourage. Il te faut [Node.js](https://nodejs.org/) (version LTS recente).

```bash
git clone https://github.com/Capiia/Wanted-Dofus.git
cd Wanted-Dofus
npm install
npm run build
```

Le setup compile apparait dans `dist/Wanted Setup X.Y.Z.exe`. Tu peux aussi lancer l'app directement sans installer avec `npm start`.

Le code est en JavaScript pur, deux fichiers principaux ([`main.js`](main.js), [`js/app.js`](js/app.js)). Aucune transpilation, aucun bundling : ce que tu lis = ce qui tourne. Pas de telemetrie, pas de serveur tiers en dehors de `dofuspourlesnoobs.com` (guides cliquables) et l'API GitHub (check de mise a jour).

Note : un rebuild local produit un binaire avec un SHA different du release (timestamps NSIS), donc compare le code source plutot que le binaire.

## Utilisation

1. Entre ton **Niveau**, **Alignement** et **Ordre**
2. L'onglet **A recuperer** montre les avis disponibles tries par milice
3. Clique sur un nom pour ouvrir le guide sur dofuspourlesnoobs.com

### Scanner ses quetes automatiquement

Pour ajouter tes quetes en cours ou terminees sans tout cocher a la main :

1. Dans Wanted, clique **Scan En cours** ou **Scan Faits** selon ce que tu veux scanner
2. Dans Dofus, ouvre ton **journal de quetes**
3. Va dans l'onglet **En cours** pour les quetes prises, ou **Terminees** pour les quetes finies
4. Fais **Win+Shift+S** et selectionne la zone avec les noms "On recherche..."
5. Reviens sur Wanted et fais **Ctrl+V**

L'OCR detecte automatiquement les noms des recherches et les marque dans l'app.
Tu peux faire plusieurs screenshots si ta liste ne tient pas en un seul ecran.

## Credits

Inspire par [Ganymede](https://ganymede-dofus.com)
Donnees extraites de [dofuspourlesnoobs.com](https://www.dofuspourlesnoobs.com/avis-de-recherche.html)

by Capia

## License

[MIT](LICENSE)
