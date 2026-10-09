import { describe, expect, it } from 'vitest';
import { lessons } from '../src/content/curriculum';
import { dailyPlan, markDailyLessonVisited } from '../src/lib/daily';
import { emptyProgress, recordResult, xp } from '../src/lib/progress';

const gradeNine = lessons.filter(lesson => lesson.grade === 9 && lesson.versions.includes('2026'));
const now = new Date('2026-10-09T09:00:00+03:00');

describe('daily learning plan', () => {
  it('anchors the first unfinished lesson after it is visited', () => {
    const initial = emptyProgress();
    const visited = markDailyLessonVisited(initial, gradeNine[0].id, now);
    const plan = dailyPlan(visited, gradeNine, '2026-10-09');

    expect(plan?.lesson.id).toBe(gradeNine[0].id);
    expect(plan?.lessonVisited).toBe(true);
    expect(plan?.completed).toBe(1);
    expect(xp(visited)).toBe(0);
  });

  it('combines lesson mastery and the daily challenge into three stages', () => {
    let progress = markDailyLessonVisited(emptyProgress(), gradeNine[0].id, now);
    progress = recordResult(progress, `lesson:${gradeNine[0].id}`, 3, 4, now);
    progress = recordResult(progress, 'daily:2026-10-09-9-2026', 4, 5, now);

    const plan = dailyPlan(progress, gradeNine, '2026-10-09');
    expect(plan).toMatchObject({ lessonVisited: true, practicePassed: true, challengePassed: true, completed: 3 });
    expect(xp(progress)).toBe(175);
  });

  it('does not replace the daily lesson when another lesson is opened', () => {
    const firstVisit = markDailyLessonVisited(emptyProgress(), gradeNine[0].id, now);
    const secondVisit = markDailyLessonVisited(firstVisit, gradeNine[1].id, now);

    expect(secondVisit).toBe(firstVisit);
    expect(dailyPlan(secondVisit, gradeNine, '2026-10-09')?.lesson.id).toBe(gradeNine[0].id);
  });
});