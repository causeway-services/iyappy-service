# iYappy — language learning across languages

iYappy is Causeway's public, multilingual language-learning product, with the explicit goal to **meet then beat Duolingo and its language-learning peers on measured learner outcomes**. **Lakȟótiyapi / Lakota is the first available course, not the whole product.** The public domain is https://iyappy.561.group/.

The authoritative public program lives at [Public Language Education](https://github.com/causeway-services/public-education-services-section/blob/main/services/public-language-education-services-section/README.md). Read the [product contract](docs/product-contract-2026-10-20.md) and [product requirement/acceptance issue #3](https://github.com/causeway-services/iyappy-service/issues/3) before extending the app.

## The product and the current course

The product-level, published-course roster is [course/catalog.mjs](course/catalog.mjs). Its language tags use BCP 47. Today it admits exactly **one** learner-ready first course: six sourced singular Lakota forms from the *LDL 121* packet of the Standing Rock Sioux Tribal Department of Education. The catalog's public course ID is deliberately separate from the existing course world's legacy identity.

The sourced Lakota curriculum lives in course/corpus/ and course/registry.mts. The generic course world, checking, spaced review, state import/export and browser controller are provided by Red Cup's shared education-platform-service. iYappy composes that engine with VICTOR and TUFTE in victor.config.mjs; it does not own a replacement scheduler, Worker runtime, or site builder.

The listening lab merged in PR #2 lets the first course offer local audio listening and subjective timing observations, without claiming pronunciation recognition or language correctness. **This should become a reusable cross-language learning modality** through the shared platform once it has a second actual consumer, rather than a hardwired definition of Lakota or iYappy.

The older course theme/world ID remains iyappy for existing learner progress compatibility. Do not silently rename the saved-state key when adding a product-level course identity. A later real multi-course implementation must isolate state and migrate it explicitly.

## Source and release reality

The intentionally empty content/ suppresses VICTOR's normal article tree; the education projector owns the first course's public page. public/ is an ignored, disposable build artifact produced by the package's actual build command. Cloudflare's static asset configuration lives in wrangler.jsonc. This repository does **not** contain a custom src/index.mjs Worker or scripts/build-site.mjs; older descriptions of those files were stale.

In a configured Node >=24 workspace with actual peer packages:

    npm test
    npm run build
    npm run deploy

Native catalog tests cover admitted course metadata, two-language fixture validation, duplicate/malformed route refusal and HTML escaping. The fixture is **not a second published course**. The original form exercises and their source evidence remain separate.

A source merge, passing unit tests, a successful build and a browser-verified deployment are four different receipts. The October 20 product-scope correction has **not** deployed the public site or independently verified the full Node >=24 build. After a real deployment, verify the returned HTML, published course, working session progress and Cloudflare's actual static health asset at https://iyappy.561.group/health.json (not an invented custom Worker /health handler).

Retain the open issues for multi-course platform work, real learner benchmarks and audio/live-site acceptance. A current single course is an honest product starting point, not a claim of competitive parity.
