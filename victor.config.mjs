import { createEducationProjector } from '@red-cup-engineering/education-platform-service/projector';
import { iyappyCourse } from './course/course.mjs';
import { FORMS, SOURCE } from './course/registry.mts';
import { availableCoursesHtml } from './course/catalog.mjs';

const sourceHtml = `<p>These six singular forms follow the charts in <a href="${SOURCE.url}">${SOURCE.label}</a>, prepared by the Standing Rock Sioux Tribal Department of Education's Lakota/Dakota Language Revitalization Program.</p>
<p>See <a href="${SOURCE.url}#page=20">yuhá, PDF page 20</a> and <a href="${SOURCE.url}#page=46">čhíŋ, PDF page 46</a>. This practice covers these forms; it does not assess pronunciation or teach a general conjugation rule.</p>
<h3>Listening research</h3>
<p>Speech and music both involve timing, grouping, and expectation, without interchangeable structures. Lakota has studied lexical stress, pitch accents and phrase boundaries. The listening lab helps you explore <em>your own observations</em> of legally obtained or personally recorded audio, without judging pronunciation.</p>
<p>Research: <a href="https://eric.ed.gov/?id=ED523064">Mirzayan, <em>Lakota Intonation and Prosody</em> (2010)</a>; <a href="https://doi.org/10.1016/S0010-0277(02)00187-7">Patel and Daniele, speech–music rhythm (2003)</a>; <a href="https://doi.org/10.1111/lnc3.12509">Drakoulaki et al., language–music review (2024)</a>.</p>
<h3>Read and practice here</h3><p>You can use this section with JavaScript disabled, or save the page. Open the answers before printing. First recall the form for each person, then open its answer. Next cover the person labels and identify the person from each form.</p>
${FORMS.map(({ lemma, gloss, person, form }) => `<details><summary>${lemma} (${gloss}): ${person}</summary><p lang="lkt">${form}</p></details>`).join('\n')}`;

const listeningLabHtml = "<section id=\"iyappy-listening-lab\" style=\"grid-column:1/-1\" aria-label=\"Listening lab\">\n<details><summary><strong>Listening lab: hear rhythm, prominence, and phrasing</strong></summary>\n<p>Hear a recording you have permission to study, or record yourself. Mark the pulse you feel, prominent moments, and phrase boundaries. These are your observations, not scored Lakota pronunciation or judgments about a recording's meaning. Speech need not follow a fixed beat.</p>\n<p>Recordings and marks stay on this device for this session; this lab sends neither to the site and saves neither to learner progress.</p>\n<p><label for=\"iyappy-audio-file\">Choose local audio (maximum 25 MB)</label> <input id=\"iyappy-audio-file\" type=\"file\" accept=\"audio/*\"></p>\n<p><button type=\"button\" id=\"iyappy-record\">Record my voice (up to 30 seconds)</button> <button type=\"button\" id=\"iyappy-stop-record\" disabled>Stop recording</button></p>\n<p><audio id=\"iyappy-audio\" controls preload=\"metadata\" style=\"width:min(100%,38rem)\" aria-label=\"Your local audio recording\"></audio></p>\n<p id=\"iyappy-audio-status\" role=\"status\">Choose a recording, or allow the microphone when you explicitly choose to record.</p>\n<p><button type=\"button\" id=\"iyappy-set-a\" disabled>Set A at playhead</button> <button type=\"button\" id=\"iyappy-set-b\" disabled>Set B at playhead</button> <button type=\"button\" id=\"iyappy-play-ab\" disabled>Play A–B</button> <label><input type=\"checkbox\" id=\"iyappy-loop-ab\" disabled> Loop A–B</label></p>\n<p id=\"iyappy-audio-range\">A — · B —</p>\n<p><button type=\"button\" id=\"iyappy-mark-pulse\" disabled>Tap a felt pulse</button> <button type=\"button\" id=\"iyappy-mark-prominence\" disabled>Mark prominence</button> <button type=\"button\" id=\"iyappy-mark-boundary\" disabled>Mark phrase boundary</button> <button type=\"button\" id=\"iyappy-clear-marks\" disabled>Clear marks</button></p>\n<ol id=\"iyappy-listening-marks\" aria-label=\"Your listening observations\"></ol>\n<p><small>Listen first. Mark only what you hear; no control automatically identifies pitch, syllables, stress, or correct speech. Consult a knowledgeable speaker for pronunciation and interpretation.</small></p>\n</details></section>";

const productOrientationHtml = [
  '<p>iYappy is building a multilingual way to learn by actually using languages. Every publicly offered course must earn its place through source-qualified material and usable practice.</p>',
  availableCoursesHtml(),
  '<p><strong>Available today:</strong> one Lakota unit on six written verb forms, with recognition and typed recall. It does not certify speaking, pronunciation, or fluency. The separate listening lab lets you replay audio you have permission to study and mark what you perceive.</p>',
].join('');
export default {
  configVersion: 1, home: false, archives: false, search: false, publicDir: './assets',
  site: { name: 'iYappy', baseIri: 'https://iyappy.561.group/', language: 'en',
    menu: [{ label: 'Courses', href: '/#available-courses' }, { label: 'Practice', href: '/#course' }, { label: 'Listening lab', href: '/#iyappy-listening-lab' }], license: 'All rights reserved' },
  projectors: [createEducationProjector({
    course: iyappyCourse,
    brand: {
      title: 'iYappy', subtitle: 'Languages are meant to be used.',
      documentTitle: 'iYappy — Language learning', language: 'en', tufteTheme: 'early-mac',
      orientationTitle: 'Learn languages with iYappy',
      orientationHtml: productOrientationHtml,
      courseTitle: 'Lakota: six sourced forms', sourceTitle: 'Lesson sources and listening research', sourceHtml,
      presentationHtml: listeningLabHtml,
    },
  })],
};
