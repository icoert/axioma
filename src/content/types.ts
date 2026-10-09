export type Grade = 9 | 10 | 11 | 12;
export type CurriculumVersion = '2026' | 'legacy';
export type LabKind = 'quadratic' | 'trigonometry' | 'derivative' | 'integral' | 'vectors' | 'complex' | 'exponential' | 'sequences' | 'probability';
export interface Question { id: string; prompt: string; options: string[]; answer: number; explanation: string; }
export interface Lesson {
  id: string; subjectId: string; grade: Grade; chapter: string; title: string; summary: string;
  theory: string[]; formula: string; example: { prompt: string; steps: string[] };
  questions: Question[]; practiceQuestions: Question[]; minutes: number; lab?: LabKind; versions: CurriculumVersion[];
}
export interface Subject { id: string; title: string; grades: number[]; status: 'live' | 'planned'; }
export const subjects: Subject[] = [
  { id: 'mathematics', title: 'Matematică', grades: [9, 10, 11, 12], status: 'live' },
  { id: 'physics', title: 'Fizică', grades: [9, 10, 11, 12], status: 'planned' },
  { id: 'informatics', title: 'Informatică', grades: [9, 10, 11, 12], status: 'planned' },
  { id: 'romanian', title: 'Limba română', grades: [9, 10, 11, 12], status: 'planned' },
  { id: 'mathematics-middle', title: 'Matematică · gimnaziu', grades: [5, 6, 7, 8], status: 'planned' },
];
