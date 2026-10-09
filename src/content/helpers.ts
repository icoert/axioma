import type { Lesson, Grade, LabKind, CurriculumVersion } from './types';
export type Exercise = [prompt: string, correct: string, wrong1: string, wrong2: string, wrong3: string, explanation: string];
export function lesson(grade: Grade, id: string, chapter: string, title: string, summary: string, theory: string[], formula: string, example: [string, ...string[]], exercises: Exercise[], lab?: LabKind, versions: CurriculumVersion[] = ['legacy','2026']): Lesson {
  return { id, grade, subjectId: 'mathematics', chapter, title, summary, theory, formula, example: { prompt: example[0], steps: example.slice(1) }, minutes: 8 + theory.length * 2, lab, versions,
    questions: exercises.map(([prompt, correct, ...rest], i) => {
      const options = [correct, ...rest.slice(0, 3)]; const shift = (id.length + i) % 4;
      return { id: `${id}-q${i + 1}`, prompt, options: [...options.slice(shift), ...options.slice(0, shift)], answer: (4 - shift) % 4, explanation: rest[3] };
    }) };
}
