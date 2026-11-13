# Site de Vivre Son Deuil Poitou-Charentes

Site statique (Eleventy), hébergé gratuitement sur Netlify, modifiable via le back-office gratuit **Pages CMS**.

## Mise en ligne (une seule fois)

1. **GitHub** : créer un compte gratuit sur github.com, puis un dépôt (bouton « New repository », nom : `vsd-poitou-charentes`). Cliquer sur « uploading an existing file » et glisser **tout le contenu** de ce dossier (y compris `.pages.yml` — sur Mac, Cmd+Maj+. affiche les fichiers cachés). Valider avec « Commit changes ».
2. **Netlify** : créer un compte gratuit sur netlify.com en se connectant avec GitHub → « Add new project » → « Import an existing project » → GitHub → choisir le dépôt. Les réglages sont lus automatiquement (`netlify.toml`). Cliquer sur « Deploy ». Le site est en ligne en 1 à 2 minutes à une adresse du type `xxx.netlify.app` (renommable dans « Project configuration »).
3. **Formulaire de contact** : dans Netlify → Forms → activer la détection des formulaires (« Enable form detection »), puis relancer un déploiement. Dans Forms → Form notifications → ajouter une notification par e-mail vers l'adresse de l'association. (Les messages du formulaire sont gratuits et illimités.)
4. **Back-office** : aller sur https://app.pagescms.org, se connecter avec GitHub, installer l'application sur le dépôt, puis ouvrir le dépôt. Tout le contenu apparaît dans le menu de gauche.
5. **Nom de domaine** (facultatif, environ 10 à 15 € par an) : Netlify → Domain management → Add a domain.

## Modifier le site au quotidien

Sur https://app.pagescms.org (ou `votre-site/admin`) :

- **Actualités** : bouton « Add an entry » pour publier une actualité (titre, date, image, résumé, texte). Cocher « Brouillon » pour la préparer sans la publier.
- **Pages du site** : textes des pages L'association, Se faire accompagner, RAPPEO 17, Nos projets, Nous soutenir, Mentions légales.
- **Page d'accueil**, **Nos actions**, **Groupes d'entraide**, **Nos projets**, **Partenaires**, **L'équipe**, **Valeurs**, **Coordonnées et liens** : listes et textes structurés.

Chaque enregistrement met le site à jour automatiquement en une ou deux minutes.

**Attention au quota gratuit de Netlify** : 300 crédits par mois, et chaque mise à jour du site en coûte 15 (soit une vingtaine de mises à jour par mois). Regroupez vos modifications : préparez l'actualité en brouillon, puis publiez-la en une fois.

Pour inviter d'autres membres à modifier le site : Pages CMS → Settings → Collaborators (invitation par e-mail, sans compte GitHub nécessaire).

## Pour un développeur

```
npm install
npm start      # aperçu local sur http://localhost:8080
npm run build  # génère _site/
```
