# Project name
ASTRA — Crew Health

# Summary
ASTRA is an explainable health-monitoring prototype for astronauts on long-duration missions. It turns six manually recorded indicators—heart rate, blood pressure, sleep, temperature, blood glucose, and mood—into a visual overview, contextual trends, and practical daily check-ins. A selectable body map connects observations to health education, while every illustrative alert explains its reasoning. NASA Human Research Program resources inform the five-hazard framework and educational content. Browser-local records and a downloadable report demonstrate how crews could document observations when communication with Earth is limited. All initial measurements are synthetic, and the prototype makes its limitations explicit: it does not diagnose, prescribe, connect to live sensors, or replace mission medical procedures. ASTRA helps make health observations easier to understand, discuss, and act on responsibly.

# Project details
Long-duration missions place greater responsibility on crews to notice health changes and maintain useful records. A collection of readings is only helpful if the person taking them understands the context and the next step.

ASTRA presents a local-first monitoring workflow: observe, understand, act, and document. Its overview displays six indicators with units, sparklines, and clear review states. Interactive trends compare observations with explicitly fictional baselines. The body-system selector connects sleep and mood, cardiovascular observations, and whole-body health to short explanations. A daily protocol supports consistent check-ins, recovery planning, exercise-plan review, and crew connection. Manual observations include measurement context, and a JSON export packages their provenance, demonstration rules, and scientific references for review. Export is a download, not a medical transmission.

The application is built with HTML, CSS, JavaScript, SVG charts, browser local storage, and a service worker. It requires no application API key. The application shell is designed to remain available after its first successful online load, although offline behavior must be tested on the final host. There are no live wearable integrations, medical accounts, or clinical backend.

Our creative contribution is an integrated and traceable crew experience: readings lead to visible changes, changes lead to explanations, and explanations lead to documented actions. NASA resources supply the spaceflight hazard framework and educational context; they do not supply or validate our illustrative alert thresholds. We deliberately avoid a pseudo-clinical readiness percentage and instead count the observations that trigger demonstration rules.

All starting observations and mission details are synthetic. This prototype is not a medical device or a validated flight system. Future development would require clinician-defined baselines, validation, secure storage, sensor integration, and reliable delayed communication. Intended benefits include better health literacy, clearer self-observation, and more structured conversations with medical personnel; these benefits have not yet been measured in a study.

# Use of Super Intelligence
OpenAI Codex was used to assist product planning, interface copy, software implementation, documentation, and synthetic demonstration-data creation. Generated code includes an SI-assistance acknowledgment, and the interface discloses SI use and synthetic readings. Scientific context was checked against linked NASA resources. No SI-generated photos, audio, or video were produced. No NASA logos, flags, mission identifiers, or NASA design assets were generated or modified. SI assistance also covers the English presentation and its synthetic-data chart.

# NASA Data / Resources
| Link text | Link URL | Actual use |
|---|---|---|
| NASA HRP — 5 Hazards of Human Spaceflight | https://www.nasa.gov/hrp/hazards/ | Five-hazard taxonomy and educational panels |
| NASA HRP — Risks of Human Spaceflight | https://www.nasa.gov/hrp/risks/ | Sleep, behavioral health, and performance context |
| NASA — The Human Body in Space | https://www.nasa.gov/humans-in-space/the-human-body-in-space/ | Cardiovascular, bone, and muscle adaptation context |

# Space Agency Partner & Other Data / Tools
| Resource | URL | Use |
|---|---|---|
| OpenAI Codex | https://openai.com/codex/ | SI assistance for planning, code, writing, and synthetic samples |
| Google Fonts — DM Sans | https://fonts.google.com/specimen/DM+Sans | Optional interface font |
| Google Fonts — Space Grotesk | https://fonts.google.com/specimen/Space+Grotesk | Optional heading font |
| OpenAI Sites | https://openai.com/ | Prototype hosting, if used for the final link |

No partner cloud credits, private astronaut records, NASA measurement datasets, external photographs, or third-party chart libraries were used. The body diagram and planet are code-drawn interface illustrations. List any additional resources the team adds before submitting. Verify font license information through the linked font pages if distributing copies of font files; this version only references the hosted stylesheet.

# Public project links
- Application: https://youssoufhard.github.io/astra-crew-health/
- Alternate application: https://astra-crew-health-casablanca.speckledmonad16.chatgpt.site
- Demonstration (seven-slide PDF): https://youssoufhard.github.io/astra-crew-health/presentation/ASTRA-Presentation.pdf
- PDF mirror: https://github.com/YoussoufHard/astra-crew-health/blob/main/presentation/ASTRA-Presentation.pdf
- Source: https://github.com/YoussoufHard/astra-crew-health

The PDF demonstration includes seven slides with the title slide. No video was produced.
