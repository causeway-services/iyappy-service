# Language as music: research-to-practice contract (2026-10-20)

**Status:** a research-backed listener-directed local exercise, not an evaluated pronunciation tutor, musical transcription system, or complete Lakota prosody model. Incoming requirement: "Tunesday: language as music, start with research, then improve iYappy."

## Evidence

- **Rhythm and comparison.** Patel and Daniele (2003), *An empirical comparison of rhythm in language and music*, *Cognition* 87 B35–B45, DOI https://doi.org/10.1016/S0010-0277(02)00187-7, found a comparable rhythmic measure differs across English/French speech and classical music; it does not establish universal meter.
- **Shared and distinct processing.** Drakoulaki et al. (2024), *Situating language and music research in a domain-specific versus domain-general framework*, *Language and Linguistics Compass* 18 e12509, DOI https://doi.org/10.1111/lnc3.12509, review timing, structure, and entrainment without collapsing music into language.
- **Hierarchical prosody.** Oderbolz et al. (2024), *Concurrent processing of the prosodic hierarchy is supported by cortical entrainment and phase-amplitude coupling*, *Cerebral Cortex*, DOI https://doi.org/10.1093/cercor/bhae479, provide evidence from German speech; do not automatically generalize to Lakota.
- **Lakota evidence.** Mirzayan (2010), *Lakota Intonation and Prosody*, University of Colorado dissertation, https://eric.ed.gov/?id=ED523064, analyzes speaker recordings for lexical stress, pitch accents, phrase boundary tones, downstep, and pitch-range variation. Speech is not a universally fixed tune; phrasing and speaker/genre matter.
- **Teaching hypothesis, not demonstrated outcome.** Patel (2011), *The OPERA hypothesis*, DOI https://doi.org/10.3389/fpsyg.2011.00142, proposes a music-to-speech plasticity mechanism. The iYappy listening exercise has not been tested for improved Lakota proficiency.

## Custody and source scope

- The original six finite forms remain anchored in *LDL 121: Intensive Lakota/Dakota for Beginners*, Standing Rock Sioux Tribal Department of Education, https://wotakuye.weebly.com/uploads/2/3/7/4/23749479/ldl121_packet.pdf. Their text source does not imply a source of audio.
- The Densmore Repatriation Project, https://www.lakotasongs.com/, retains Standing Rock Sioux Tribe intellectual and cultural property in its teaching materials; reuse outside the project's educational purposes requires prior tribal consent. This implementation neither copies nor redistributes its recordings.
- Publishing a speaker exemplar would require witnessed speaker/source attribution, rights, community authorization, locale/dialect, recording context and stable segment references. A learner's own file or recording in this exercise is explicitly not an authorized public exemplar.

## Three layers and current functional decision

(A) an acoustic performance over time; (B) a listener's subjective timing observations; (C) possible subsequently supported linguistic or musical analysis. A→B and B→C are *not* identities or certifications. This release implements a bounded A–B exercise, leaving C as future evaluated research.

The generic education projector still owns course compilation, quiz grading, learner progress, and TUFTE. Its existing `brand.presentationHtml` and adapter `mountPresentation` are used to mount the local listening panel, without duplicating VICTOR. The lab accepts a local audio file or user-initiated microphone recording, supports A–B replay/loop and listener-marked pulse, prominence and phrase boundaries, and retains no audio or marks after navigating away. Existing form grading and IDs are not changed; offline readers retain static sourced forms and references.

## Acceptance and research obligations

- Native tests check timestamp formatting, loop interval bounds, recognized observation classes and refusal of phonological correctness labels. Run `npm test`.
- Build/interactive validation still required: course-load smoke, file playback, permission-scoped microphone capture, loop and keyboard behavior across browsers, no network transfer of recorded media/marks, and a separate authorized Cloudflare deployment receipt. A merged GitHub change alone is not verified deployment.
- Research next: record consented Lakota speaker exemplars and phrase-level contrasts, then compare comprehension and retention against the existing text-only six-form course with learner observations, negative results, and dialect/speaker scope.
- Engineering next: derive timed audio/annotation/score representations via the appropriate upstream Sign codecs, considering Praat TextGrid, WebVTT, MusicXML, and MEI based on their actual differing semantics. Do not invent a site-only interchange language or treat estimated F0 as correctness.
