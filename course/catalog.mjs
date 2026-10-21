/** iYappy product catalog: public course admission, separate from any course world. */
export const AVAILABLE_COURSES = Object.freeze([
  Object.freeze({
    id: 'lakota-finite-forms',
    targetLanguage: 'lkt',
    learnerLanguage: 'en',
    title: 'Lakȟótiyapi / Lakota',
    description: 'Six source-backed singular forms, with recognition and typed recall.',
    href: '#course',
    sourceLabel: 'LDL 121, Standing Rock Sioux Tribal Department of Education',
  }),
]);

function escaped(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function checkedLanguage(tag) {
  if (typeof tag !== 'string' || tag === '') throw new TypeError('Language tag required');
  try {
    return Intl.getCanonicalLocales(tag)[0];
  } catch {
    throw new TypeError('Invalid BCP 47 language tag: ' + tag);
  }
}

/** Validate public, real course records. A language fiber alone is not a course. */
export function validateAvailableCourses(courses) {
  if (!Array.isArray(courses) || courses.length === 0) {
    throw new TypeError('The published catalog requires at least one admitted course');
  }
  const ids = new Set();
  const paths = new Set();
  for (const course of courses) {
    if (!course || typeof course !== 'object') throw new TypeError('Invalid course record');
    if (typeof course.id !== 'string' || !/^[a-z][a-z0-9-]*$/.test(course.id) || ids.has(course.id)) {
      throw new TypeError('Course identifiers must be distinct lowercase slugs');
    }
    ids.add(course.id);
    checkedLanguage(course.targetLanguage);
    checkedLanguage(course.learnerLanguage);
    if (!['title', 'description', 'sourceLabel'].every((field) => typeof course[field] === 'string' && course[field].trim())) {
      throw new TypeError('Public courses require a title, description, and witnessed source');
    }
    if (typeof course.href !== 'string' || !/^(?:#[a-z0-9-]+|\/(?:[a-z0-9-]+\/)*)$/.test(course.href) || paths.has(course.href)) {
      throw new TypeError('Course routes must be unique local routes or anchors');
    }
    paths.add(course.href);
  }
  return courses;
}

/** This is product-level discovery, not a Lakota-specific lesson projector. */
export function availableCoursesHtml(courses = AVAILABLE_COURSES) {
  validateAvailableCourses(courses);
  const list = courses.map((course) =>
    '<li><a href="' + escaped(course.href) + '" hreflang="' + escaped(course.targetLanguage) +
    '"><strong>' + escaped(course.title) + '</strong></a> — ' + escaped(course.description) +
    ' <small>Source: ' + escaped(course.sourceLabel) + '</small></li>'
  ).join('');
  return '<section id="available-courses" aria-label="Available language courses"><h3>Courses available now</h3><ul>' + list + '</ul></section>';
}
