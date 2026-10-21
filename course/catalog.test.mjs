import assert from 'node:assert/strict';
import { test } from 'node:test';
import { AVAILABLE_COURSES, availableCoursesHtml, validateAvailableCourses } from './catalog.mjs';

const latin = {
  id: 'latin-beginner', targetLanguage: 'la', learnerLanguage: 'en',
  title: 'Latin', description: 'A separately admitted test course',
  sourceLabel: 'Test-only corpus', href: '/learn/latin/',
};

test('published first course has a real target language distinct from iYappy brand', () => {
  assert.equal(AVAILABLE_COURSES.length, 1);
  assert.equal(AVAILABLE_COURSES[0].targetLanguage, 'lkt');
  assert.equal(AVAILABLE_COURSES[0].href, '#course');
  assert.match(availableCoursesHtml(), /Courses available now/);
  assert.match(availableCoursesHtml(), /Lakȟótiyapi/);
  assert.doesNotMatch(availableCoursesHtml(), /Mandarin|Latin/);
});

test('catalog structure handles two distinct languages without mixing identities or routes', () => {
  const courses = [...AVAILABLE_COURSES, latin];
  assert.equal(validateAvailableCourses(courses), courses);
  const html = availableCoursesHtml(courses);
  assert.match(html, /href="\/learn\/latin\/"/);
  assert.doesNotMatch(html, /hreflang=/);
  assert.match(html, /href="\/learn\/latin\/"/);
});

test('unadmitted, malformed or duplicated courses cannot appear in the public catalog', () => {
  const base = AVAILABLE_COURSES[0];
  assert.throws(() => validateAvailableCourses([]), /at least one/);
  assert.throws(() => validateAvailableCourses([base, base]), /distinct/);
  assert.throws(() => validateAvailableCourses([base, { ...latin, href: '#course' }]), /unique/);
  assert.throws(() => validateAvailableCourses([{ ...base, targetLanguage: '@?' }]), /BCP 47/);
  assert.throws(() => validateAvailableCourses([{ ...base, sourceLabel: '' }]), /source/);
  assert.throws(() => validateAvailableCourses([{ ...base, href: 'https://untrusted.example' }]), /routes/);
  assert.throws(() => validateAvailableCourses([base, { ...base, href: '/learn/clone/' }]), /distinct/);
});

test('catalog text is escaped rather than inserted as trusted HTML', () => {
  const html = availableCoursesHtml([{ ...AVAILABLE_COURSES[0], title: '<script>alert(1)</script>' }]);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
});
