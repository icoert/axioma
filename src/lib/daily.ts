import type { Lesson } from '../content/types';
import type { Progress } from './progress';
import { dayKey, passed, recordResult } from './progress';

const markerPrefix = (progress: Progress, date: string) =>
  `daily:stage-${date}-${progress.grade}-${progress.curriculum}-lesson-`;

export interface DailyPlan {
  lesson: Lesson;
  lessonVisited: boolean;
  practicePassed: boolean;
  challengePassed: boolean;
  completed: number;
}

export function dailyPlan(progress: Progress, lessons: Lesson[], date = dayKey()): DailyPlan | null {
  if (!lessons.length) return null;
  const prefix = markerPrefix(progress, date);
  const marker = Object.keys(progress.results).find(id => id.startsWith(prefix));
  const markedLesson = marker ? lessons.find(lesson => lesson.id === marker.slice(prefix.length)) : undefined;
  const lesson = markedLesson ?? lessons.find(item => !passed(progress.results[`lesson:${item.id}`])) ?? lessons[0];
  const lessonVisited = Boolean(markedLesson);
  const practicePassed = passed(progress.results[`lesson:${lesson.id}`]);
  const challengePassed = passed(progress.results[`daily:${date}-${progress.grade}-${progress.curriculum}`]);
  return {
    lesson,
    lessonVisited,
    practicePassed,
    challengePassed,
    completed: Number(lessonVisited) + Number(practicePassed) + Number(challengePassed),
  };
}

export function markDailyLessonVisited(progress: Progress, lessonId: string, now = new Date()): Progress {
  const prefix = markerPrefix(progress, dayKey(now));
  if (Object.keys(progress.results).some(id => id.startsWith(prefix))) return progress;
  return recordResult(progress, `${prefix}${lessonId}`, 1, 1, now);
}