# ASTRA - Crew Health

An explainable astronaut health-monitoring prototype for the 2026 Space Apps challenge. Independent project, with SI-assisted development and synthetic demonstration data.

## For the jury

- **Open the application:** https://astra-crew-health-casablanca.speckledmonad16.chatgpt.site
- **Read the seven-slide presentation:** [PDF](presentation/ASTRA-Presentation.pdf)
- **Download the editable presentation:** [PowerPoint](presentation/ASTRA-Presentation.pptx)
- **Project explanation and resource use:** [Submission text](project/SUBMISSION.md)
- **Implementation plan and limitations:** [Plan](project/PLAN.md)
- **Demo walkthrough:** [Jury guide](JURY.md)

The presentation PDF is the submitted demonstration format. No video is required in addition under the submission instructions supplied to this project.

The primary application link above is public. GitHub Pages is also configured, but it inherits an existing account custom domain whose HTTPS certificate is not yet available. Use the primary application link and the GitHub PDF link for judging.

## What works

ASTRA presents six manual health indicators, interactive historical trends, a body-system selector and explained demonstration flags. A daily checklist supports a consistent routine. The browser saves manual entries locally and can download a JSON report containing provenance, rules and NASA references.

Expandable signal explanations show the actual value, fictional reference, exact rule and suggested review. A readable HTML report includes the current observation, measurement context, notes, rule explanations and a history table. It can be printed or saved as PDF from the browser. The JSON export remains available separately.

Three synthetic scenarios make the prototype easy to inspect: routine mission, sleep disruption and multiple changes. A scenario does not overwrite saved observations.

## Run locally

Requirements: Python 3 for the server. No npm dependencies or API keys.

```powershell
cd astra-crew-health
python -m http.server 4173 --directory .
```

Open http://localhost:4173. This repository serves the application from its root. The original local workspace has the application in `astra-health/dist`, which requires a different `--directory` argument.

For focused logic checks, with Node.js installed:

```powershell
node --check app.js
node verify.cjs
```

## NASA resources and actual use

| Resource | Use |
|---|---|
| [NASA HRP: 5 Hazards of Human Spaceflight](https://www.nasa.gov/hrp/hazards/) | Five-hazard framework and educational panels |
| [NASA HRP: Risks of Human Spaceflight](https://www.nasa.gov/hrp/risks/) | Sleep, behavioral health and performance context |
| [NASA: The Human Body in Space](https://www.nasa.gov/humans-in-space/the-human-body-in-space/) | Cardiovascular, muscle and bone adaptation context |

These resources inform education and product structure. They do not validate the demonstration rules. We did not import real astronaut measurement datasets.

## Technical implementation

HTML, CSS and JavaScript, with SVG charts, localStorage and a service worker. Google Fonts supplies optional DM Sans and Space Grotesk. System fonts remain available as fallbacks. The application shell can cache after an initial successful load over HTTPS or localhost. Offline behavior on the final host still requires manual verification.

## Boundaries and privacy

All initial readings, crew identity and mission details are fictional. There are no live sensors, clinical diagnoses, medication recommendations, medical accounts or automatic transmissions to a flight surgeon. Local data has no application encryption. Use demonstration data only. A dashboard without flags does not rule out illness.

The application follows explicit illustrative comparison rules. No runtime AI model diagnoses a user. Clinical validation, personalized baselines, secure sensor integration and delayed communication are future work.

## SI disclosure and attribution

OpenAI Codex assisted planning, interface and presentation writing, implementation, documentation and synthetic data. The application and slides visibly disclose this use. No NASA logos, flags, mission identifiers or NASA design assets are included. No affiliation with or endorsement by NASA is implied.

See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for external resources. No open-source license has been selected for the original project code. Public visibility permits inspection but does not by itself grant an open-source license.
