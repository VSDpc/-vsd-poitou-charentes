# Site de Vivre Son Deuil Poitou-Charentes

Site statique (Eleventy), hébergé gratuitement sur Netlify, modifiable via le back-office gratuit **Pages CMS**.

## Mise en ligne (hébergement Cloudflare Pages, gratuit)

1. **GitHub** : le code est dans le dépôt `VSDpc/-vsd-poitou-charentes`. Les fichiers dont le nom commence par un point (`.pages.yml`) doivent être créés via « Add file › Create new file », car le glisser-déposer les ignore.
2. **Cloudflare Pages** : compte gratuit sur dash.cloudflare.com → Workers & Pages → Create → Pages → « Connect to Git » → choisir le dépôt. Réglages : Framework preset « Eleventy » (ou aucun), commande de build `npm run build`, dossier de sortie `_site`. Variable d'environnement conseillée : `NODE_VERSION` = `22`.
3. **Formulaire de contact** : service Web3Forms (250 messages gratuits par mois). Créer une clé sur web3forms.com avec l'adresse de l'association, puis la coller dans `src/_data/formulaire.json` à la place de `A_REMPLACER`.
4. **Back-office** : https://app.pagescms.org (connexion GitHub). Raccourci : `/admin` sur le site.
5. **Nom de domaine** : Cloudflare Pages → projet → Custom domains → « Set up a custom domain ».

## Modifier le site au quotidien

Sur https://app.pagescms.org (ou `votre-site/admin`) :

- **Actualités** : bouton « Add an entry » pour publier une actualité (titre, date, image, résumé, texte). Cocher « Brouillon » pour la préparer sans la publier.
- **Pages du site** : textes des pages L'association, Se faire accompagner, RAPPEO 17, Nos projets, Nous soutenir, Mentions légales.
- **Page d'accueil**, **Nos actions**, **Groupes d'entraide**, **Nos projets**, **Partenaires**, **L'équipe**, **Valeurs**, **Coordonnées et liens** : listes et textes structurés.

Chaque enregistrement met le site à jour automatiquement en une ou deux minutes.

Quota gratuit Cloudflare Pages : 500 mises à jour par mois, visites illimitées. Si le quota est atteint, le site reste en ligne ; seules les nouvelles mises à jour attendent le mois suivant.

Pour inviter d'autres membres à modifier le site : Pages CMS → Settings → Collaborators (invitation par e-mail, sans compte GitHub nécessaire).

## Pour un développeur

```
npm install
npm start      # aperçu local sur http://localhost:8080
npm run build  # génère _site/
```
