# ASTRA — Plan complet de réalisation

## 1. Proposition

**ASTRA — Crew Health. Far from Earth. Closer to your health.**

Un compagnon de suivi qui aide un astronaute à observer ses indicateurs, comprendre leurs changements et préparer une discussion médicale, même lorsque la communication avec la Terre est difficile. Le point fort de la démo est la boucle **observer → comprendre → agir → documenter**, avec une explication et une source pour chaque recommandation éducative.

Public primaire : astronaute sans formation médicale spécialisée. Public secondaire : crew medical officer, puis équipe médicale au sol. Langue du produit et de la soumission : anglais. Projet indépendant, sans identité graphique NASA.

## 2. Périmètre réalisable pour le hackathon

| Priorité | Fonction | État |
|---|---|---|
| P0 | Dashboard de six indicateurs avec unités et statuts | Implémenté |
| P0 | Scénarios routine, sommeil perturbé, changements multiples | Implémenté |
| P0 | Saisie manuelle validée et contexte de mesure | Implémenté |
| P0 | Historique, courbes, comparaison à une référence fictive | Implémenté |
| P0 | Explication des alertes et limites visibles | Implémenté |
| P0 | Sources NASA et cartographie des cinq dangers | Implémenté |
| P1 | Checklist, progression et sauvegarde navigateur | Implémenté |
| P1 | Export JSON comprenant observations, règles et sources | Implémenté |
| P1 | Cache du cœur de l’application après une visite en ligne | Implémenté, à vérifier dans un navigateur |
| P2 | Capteurs, comptes, transmission médicale | Hors prototype |
| P2 | Seuils personnalisés validés par médecin | Travail futur |
| P2 | Dosimétrie, environnement, analyses biologiques | Travail futur |

Ne pas promettre de diagnostic, d’estimation de densité osseuse, de suivi du rayonnement à partir des constantes, de détection d’infection, de connexion à des appareils ou de véritable jumeau numérique. La figure corporelle est une navigation pédagogique.

## 3. Architecture livrée

- HTML/CSS/JavaScript sans dépendance applicative : démarrage rapide et hébergement statique.
- `dist/index.html` : interface accessible et quatre vues.
- `dist/app.js` : données synthétiques, règles explicites, courbes SVG, formulaire, export et stockage.
- `dist/style.css` : tableau de bord sombre, menthe pour les observations, ambre pour les changements, adaptation mobile.
- `dist/sw.js` : cache des fichiers essentiels ; polices distantes facultatives avec repli système.
- LocalStorage : persistance sur un seul navigateur. Pas de chiffrement applicatif, compte, synchronisation ou serveur médical. Utiliser seulement des données de démo.

## 4. Modèle d’observation

Une observation contient date ISO, fréquence cardiaque (bpm), pression systolique/diastolique (mmHg), sommeil (h), température (°C), glucose (mg/dL), humeur (1–5), contexte, notes et origine. L’export distingue mesures synthétiques, saisies manuelles et scénario actif.

Les sept premiers points sont synthétiques. Sol 142 et le personnage Alex Chen sont fictifs. Les scénarios modifient la vue sans écraser les données sauvegardées. Le dernier bilan manuel remplace le point synthétique courant pour la vue routine.

## 5. Règles transparentes

Ces règles sont des choix de démonstration, **pas des seuils NASA ou des normes médicales** :

| Indicateur | Référence fictive | Déclencheur de démonstration |
|---|---|---|
| Fréquence cardiaque | 64 bpm | Écart absolu ≥ 15 bpm |
| Pression | 118/76 mmHg | Écart systolique ≥ 20 ou diastolique ≥ 15 mmHg |
| Sommeil | 7,5 h | Moins de 6,5 h |
| Température | 36,7 °C | Écart absolu ≥ 0,8 °C |
| Glucose | 94 mg/dL | Écart absolu ≥ 25 mg/dL |
| Humeur | 4/5 | Note ≤ 2 |

Un signal signifie « vérifier et contextualiser ». L’absence de signal ne signifie pas absence de maladie. Aucun médicament ni traitement personnalisé n’est conseillé. Les symptômes sérieux doivent suivre les procédures d’urgence de la mission indépendamment du tableau de bord.

## 6. Usage concret des ressources NASA

1. [5 Hazards of Human Spaceflight](https://www.nasa.gov/hrp/hazards/) : structure des cinq dangers dans Science & sources.
2. [Risks of Human Spaceflight](https://www.nasa.gov/hrp/risks/) : contexte pédagogique sur sommeil, isolement, comportement et performance ; lien depuis les prochaines actions.
3. [The Human Body in Space](https://www.nasa.gov/humans-in-space/the-human-body-in-space/) : contexte sur adaptation cardiovasculaire, os et muscles ; justification du rappel d’exercice.

Il s’agit de ressources scientifiques NASA utilisées pour la conception et les explications, pas d’un jeu de mesures astronautes importé. Les données synthétiques ne doivent jamais être déclarées comme données NASA. La page Resources du challenge n’a pas été accessible pendant la préparation ; ne pas prétendre avoir utilisé des ressources partenaires non consultées.

## 7. Démonstration mémorable

1. Ouvrir Overview : expliquer les six observations et le statut synthétique.
2. Choisir Sleep disruption : le sommeil et l’humeur changent, le briefing explique pourquoi.
3. Cliquer Sleep duration : montrer la courbe, la référence fictive et la règle écrite.
4. Ouvrir le corps, sélectionner Cardiovascular : expliquer le contexte de gravité.
5. Log health check : saisir un bilan de récupération et sauvegarder.
6. Daily protocol : cocher une action et montrer la progression.
7. Export report : télécharger le rapport JSON, sans prétendre l’avoir transmis.
8. Science & sources : montrer la provenance NASA et les limites.

Le scénario Multiple changes démontre un changement de priorité, sans le présenter comme un diagnostic ou une simulation médicalement validée.

## 8. Déroulé de travail jusqu’à la soumission

**Bloc A — 20 min :** lancer en local, vérifier bureau et mobile, saisir un bilan, recharger, contrôler la persistance, tester le téléchargement et ouvrir le JSON. Vérifier le mode hors ligne après chargement initial depuis HTTPS ou localhost.

**Bloc B — 20 min :** relire `SUBMISSION.md`, ajouter le nom réel de l’équipe et les liens finaux. Copier les trois liens NASA dans NASA Data. Déclarer les outils dans Other Data et SI.

**Bloc C — 20 min :** enregistrer une vidéo ≤ 30 s OU préparer les 7 diapositives à partir de la présentation de sept diapositives fournie dans `presentation/`. Chronométrer réellement la vidéo. Héberger le résultat et tester sans connexion.

**Bloc D — 15 min :** rendre le projet accessible au jury sans compte ni permission. Le site Sites a été rendu public. Une seconde publication GitHub Pages et une copie publique de la présentation sont préparées dans le dépôt. Tester le lien dans une fenêtre privée.

**Bloc E — 10 min :** vérifier les champs et la déclaration d’originalité, sauvegarder puis soumettre explicitement pour jugement. Le texte fourni annonce le 15 novembre 2026 à 23:59, heure de Casablanca ; vérifier l’échéance dans le compte de l’événement. Ne pas confondre Save Progress et Submit for Judging.

## 9. Critères de validation

- Les quatre vues et les liens internes fonctionnent au clavier.
- Les unités sont visibles et le formulaire refuse des valeurs hors plage de saisie ainsi qu’une systolique ≤ diastolique. Ces plages sont des bornes techniques de saisie, pas des limites cliniques.
- Le scénario ne modifie pas les observations sauvegardées.
- Le dernier bilan met à jour les cartes et la courbe ; les notes restent du texte.
- Le JSON contient l’origine des observations, les sources et les limites.
- Aucun tableau de bord sans signal n’est décrit comme une preuve de bonne santé.
- Le jury accède au projet et à la démonstration sans authentification.

## 10. Après le hackathon

1. Co-concevoir avec un médecin de vol et des utilisateurs d’analogues de mission.
2. Définir les besoins cliniques, la qualité des données et les valeurs personnalisées ; valider les règles sur un protocole approuvé.
3. Ajouter des interfaces de capteurs avec provenance, calibration et données manquantes explicites.
4. Mettre en place chiffrement, contrôle d’accès, journalisation, consentement et politique de conservation.
5. Concevoir une file d’envoi tolérant les délais avec accusés de réception ; ne jamais afficher « transmis » sans preuve.
6. Évaluer charge cognitive, accessibilité, fausses alertes, dérive, utilisation hors ligne et procédures de secours.
