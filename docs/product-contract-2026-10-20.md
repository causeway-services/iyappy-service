# iYappy: public product contract and comparative acceptance (2026-10-20)

**Origin:** Leader correction, 2026-10-20: "iyappy is meant to meet and beat duolingo and others not be some bespoke lakota something."

**Owning source:** [Causeway Public Language Education charter](https://github.com/causeway-services/public-education-services-section/blob/main/services/public-language-education-services-section/README.md). **Product acceptance:** [iYappy issue #3](https://github.com/causeway-services/iyappy-service/issues/3). This document specifies the existing public program's current product contract; it does not replace the charter, rename the product, or treat the earlier personal Ascent design as already deployed software.

## 1. Product identity and scientific premise

iYappy is the **general multilingual language-learning product**. Its first publicly available course is a **finite, source-qualified Lakȟótiyapi/Lakota unit**. Product scope, modality, learner progress and performance assessment are not defined by one language, one learner's study habits, or one course's exercise kinds.

The product goal is that a learner can choose an actually available language, learn something useful, practice **understanding and producing**, receive appropriate feedback, independently resume and review, and demonstrate retained or transferable communicative skill. Exercise recognition, long-term recall, speaking, listening, free production, sentence meaning and human judgment remain distinct evidence. The learner should be able to inspect and transport their history.

Existing building blocks are the public program charter, Red Cup education-platform-service, the per-language communicating fibers with explicit maturity evidence, and the personal [Ascent design](https://github.com/causeway-services/emsenn-language-learning-services-section/blob/main/content/text/documents/articles/references/a-system-design-for-language-learning.md). Ascent is relevant prior research, not an alternative public product or evidence of a shipped multilingual curriculum.

## 2. What "meet then beat" means here

Define one **comparable learner job** and test it with actual people on their preferred device. Meeting a competitor means verified parity in a declared functional job. Beating means a measured advantage on learning, autonomy, satisfaction, accessibility or another declared learner outcome while meeting critical baseline functions. Feature lists and screenshots are discovery instruments, **not proof of efficacy**. Public vendor claims are not independently verified performance.

| Competitor, primary source as of October 20, 2026 | Job to meet or beat | iYappy obligation |
| --- | --- | --- |
| [Duolingo](https://blog.duolingo.com/product-highlights/) and its [October update](https://blog.duolingo.com/october-2026-update/) | Guided short lessons, responsive correctness feedback, adaptive review, listening/speaking, persistent paths, game review, image→free production and AI roleplay/conversations | Prove first-use teaching quality, accessible short practice, clear error correction, appropriate review and delayed free production. Avoid copying another brand's rewards or optimizing guilt/streak metrics |
| [Speak](https://www.speak.com/blog/your-tutor-is-one-call-away-introducing-ai-tutor-call), October 20 | Open-ended voice tutor, native-language scaffolding, contextual feedback and cross-session continuity | A source-calibrated conversation with honest feedback limits that affects the same learner record as lessons, instead of an unrelated chatbot |
| [Busuu](https://help.busuu.com/hc/en-us/articles/15936615354641-What-is-Busuu) and [Community Corrections](https://www.busuu.com/en/how-to/corrections) | Structured lessons, writing and speaking practice, corrections by qualified other speakers | Explain target and progression; facilitate lawful, consented, attributable human correction where needed |
| [Babbel](https://support.babbel.com/hc/en-gb/articles/19211305815570-Speech-recognition) | Dialogues, pronunciation practice, lesson-level speech recognition and immediate feedback | Practice real speaking/listening with disclosed judge type, accent/dialect scope and tested calibration |
| [LingQ](https://www.lingq.com/en/) | Learn from meaningful content and imported learner-chosen audio/text; connect vocabulary to review | Source- and rights-checked content import, contextual language learning and history-linked review |
| [Anki/FSRS](https://docs.ankiweb.net/) | Portable spaced repetition and honest review histories | Inspectable, transferable, measurable scheduling. Keep current fixed FSRS-lite separate from parameter-fitted full FSRS claims |
| [Owóksape](https://owoksape.com/) | Lakota learning, review and progress for an Indigenous-language audience | Compare real course depth and community stewardship, not a one-off form count; preserve source and speaker rights |

These comparisons refer to product surfaces, not independent quality assays. The earlier September 2, 2026 public charter remains the authoritative historical observation of iYappy's 12 checks over six source-witnessed forms, portable save restoration and mobile browser review.

## 3. Real architecture, not a mock multilingual homepage

The hierarchy is product → **admitted course catalog** → separate target-language and learner-language identities → bounded source-qualified curriculum → applicable shared learning modalities and runtime.

- **Product owner, Causeway:** catalog, admission, public experience, learner choice, consent, learning jobs and market evidence.
- **Engineering owner, Red Cup Education Platform:** world compiler, Checker interface, sessions, grading, persistence, accessibility, reusable audio modality, course routes/selection and cross-course state isolation.
- **Science/Sign owners:** communicating language fibers and witnessed source/orthography/syntax/prosodic evidence, standard format/codecs, explicit capability maturity, uncertainty and provenance. A language model's plausible utterance is never by itself a witnessed correctness key.
- **Course producer:** actual instructional source, authoritative scope, permission/dialect/register, goals and supported exercises; one currently admitted Lakota unit is a real course, not a language framework.
- **Operations:** successful build, published artifact and receiver-confirmed interaction, each independently attested.

The [product course catalog](../course/catalog.mjs) distinguishes current *available* courses from scientific **candidate language fibers**. It uses BCP 47 target and learner language tags and rejects duplicate IDs/routes, invalid tags and unsourced displays. The first course continues to use a legacy theme/world ID of iyappy for **saved progress compatibility**. A new catalog ID must not silently break that state.

A conformance test with two dissimilar metadata entries demonstrates only the **catalog boundary**. Actual multilingual operation is **not accepted** until two different genuinely source-qualified real public courses are delivered with separate routes, exercises and progress states through one upstream platform.

## 4. Tunesday: language as music belongs across languages

**Research question:** how can time, rhythm, melody/intonation, timbre, stress, pause, repetition, phrase form and coordinated performance support listening and language production?

- Distinguish (1) audio signal/time events, (2) listener-made observations, (3) qualified language-specific acoustic/prosodic analysis, (4) scored musical representation, and (5) instructional outcome. No mapping is presumed equivalent or correct by analogy.
- Support **cross-language contrast**, for example tonal vs non-tonal speech and different stress/phrase organizations, with speaker- and dialect-qualified sources. Do not assume Western music notation describes every language's phonology.
- Source evidence: [Patel & Daniele, 2003](https://doi.org/10.1016/S0010-0277(02)00187-7) on speech/music rhythm; [Mirzayan, 2010](https://eric.ed.gov/?id=ED523064) on Lakota intonation/prosody; [Drakoulaki et al., 2024](https://doi.org/10.1111/lnc3.12509) on shared and distinct language/music processing.
- Existing October 20 listening lab: opt-in local recording or authorized audio and learner observations of pulse, prominence and phrase boundaries. Useful early exploratory feature, **not a pronunciation tutor**. Its source integration is still limited to the first Lakota course; common modality ownership and validation remain engineering work.
- New timed-annotation interfaces should use proper industry standards and the upstream Sign codec stack (for instance timed cue or linguistic-alignment formats only for their actual semantics); do not hide a one-language ad hoc serializer inside the course.

## 5. Testable market fitness / acceptance

1. **Onboarding:** a person without prior instructions finds an actually published course and completes their first meaningful exercise; record time-to-first-completion, abandoned steps, keyboard/touch/mobile/screen-reader results and any confusion. No fake language choices.
2. **Pedagogy:** document source-qualified objectives, produced response, feedback evidence, error recovery and repeat attempt for the same exercise. In a delayed follow-up, measure independent production/transfer, not just XP or clicks.
3. **Adaptive session:** show how a recorded error selects a useful next practice and how successful retrieval shifts review. Report known scheduler limitations; no invented cognitive model or mastery percentages.
4. **Cross-language:** two independently source-qualified real language courses, differing in more than label, use the same published platform while maintaining correct BCP 47 language identity, separate source/dialect policy, exercises, rights and progress. Old first-course exported save restores or explicitly migrates.
5. **Native audio:** real browser permission handling, playback/loop, keyboard and screen-reader use, device limits, and no unwanted recording export; human/speech-model correctness claims only after calibration and permission.
6. **Retention and comparison:** preregister a comparable learning job and examine first-session success, delayed retention, learner-reported communicative transfer and source-related mistakes against actual alternatives. Do not declare meet/beat before independent receiver evidence.
7. **Production and custody:** exact source revision, native test receipt, complete Node >=24 workspace build, Cloudflare deploy identity, fetched live page, route and user workflow checks. A GitHub merge is **not** a release.

**Current verdict:** a real but narrow first course and shared educational machinery; one opt-in listening prototype source merged; a catalog boundary added; **no verified multiple-language runtime, no public competitive parity, and no new deployment in this correction**. Product issue #3 holds the remaining consumer requirements. [Listening/live release issue #1](https://github.com/causeway-services/iyappy-service/issues/1) stays distinct.
