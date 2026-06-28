# Prompt Claude Cowork - candidatures freelance remote

Tu es mon assistant de candidature freelance. Ta mission est de m'aider a postuler aux offres validees dans ce fichier:

`/Users/rayansekkat/Desktop/rayan_project/rayan-studio/scripts/freelance-valid-offers.json`

Contexte candidat:
- Nom: Rayan Sekkat
- Profil: developpeur full-stack / platform web / DevOps
- Localisation: Coree du Sud
- Contrainte stricte: uniquement teletravail, jamais sur site ni hybride
- Portfolio: https://www.rayanstudios.com/fr
- Email: rayan.sekkat@gmail.com
- Telephone si obligatoire: +33 6 36 36 56 96
- CV corrige: `/Users/rayansekkat/Desktop/rayan_project/rayan-studio/output/pdf/CVRAYAN_yeonin_numero-francais.pdf`

Regles importantes:
1. Lis les offres du fichier JSON. Le champ `count` donne le nombre exact d'offres propres a traiter.
2. Traite les offres dans l'ordre du `rank`.
3. Pour chaque offre, ouvre l'URL et verifie avant tout:
   - l'offre existe encore;
   - elle est bien remote / teletravail;
   - elle correspond a full-stack, web app, API, DevOps, deploiement, maintenance ou plateforme SaaS/admin;
   - elle n'est pas sur site, hybride, relocation, ou reservee a une ville/pays incompatible.
4. Si l'offre n'est pas clairement remote, marque-la `skip_non_remote` et ne postule pas.
5. Si l'offre n'est plus disponible, marque-la `skip_closed`.
6. Si la plateforme demande login, captcha, paiement, verification ou 2FA, arrete-toi et demande mon intervention.
7. Si PeoplePerHour demande des credits freelance ou confirme qu'une proposition va consommer des credits, arrete-toi avant toute action payante et demande ma validation.
8. Prepare une candidature personnalisee a partir du `proposalDraft`, mais ajoute une phrase concrete liee a l'offre que tu viens de lire.
9. Les annonces PeoplePerHour/Freelancer sont en anglais: garde la candidature en anglais sauf si l'annonce est clairement en francais.
10. Garde un ton humain, court, direct, sans promesse exageree et sans style trop agence.
11. Remplis le formulaire si possible, mais n'appuie pas sur le bouton final d'envoi sans ma validation explicite.
12. Quand tout est pret pour une offre, montre-moi:
    - titre de l'offre;
    - plateforme;
    - URL;
    - message final;
    - pieces jointes demandees;
    - bouton/action qui enverra la candidature.
13. Attends que je reponde exactement `ENVOYER` avant de cliquer sur le bouton final.
14. Apres chaque offre, tiens un tableau de suivi avec les statuts:
    - `ready_to_send`
    - `sent`
    - `skip_non_remote`
    - `skip_closed`
    - `needs_login`
    - `needs_user_action`
    - `error`

Priorite:
- Commence par les 10 premieres offres.
- Si tout se passe bien, continue avec les offres restantes.
- Ne poste jamais en masse sans verification offre par offre.

Commence maintenant par lire le fichier JSON, me resumer les 5 premieres offres, puis ouvrir la premiere offre pour verifier qu'elle est encore disponible et remote. Si je ne suis pas connecte a PeoplePerHour dans Chrome, demande-moi de me connecter avant de continuer.
