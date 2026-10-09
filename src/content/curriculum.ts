import { grade9 } from './grade9';
import { grade10 } from './grade10';
import { grade11 } from './grade11';
import { grade12 } from './grade12';
import { extensions } from './extensions';
import type { CurriculumVersion, Grade, Lesson } from './types';
export const lessons: Lesson[] = [...grade9, ...grade10, ...grade11, ...grade12, ...extensions];
export const roman: Record<Grade,string> = {9:'IX',10:'X',11:'XI',12:'XII'};
// OMEC 6930/2025, annex 27: new cohorts start in 2026; later grades roll out annually.
const newGrade: Record<string,Grade> = { inversa:9, polinoame:10, 'ecuatii-polinomiale':10, dreapta:11, asimptote:12, conice:12, radicali:9, 'trig-inverse':9 };
const oldGrade: Record<string,Grade> = { radicali:10, 'trig-inverse':10, conice:11, permutari:11 };
export function courseLessons(grade: Grade, version: CurriculumVersion): Lesson[] {
  return lessons.filter(l => l.versions.includes(version) && (version==='2026' ? newGrade[l.id] ?? l.grade : oldGrade[l.id] ?? l.grade) === grade);
}
export const findLesson = (id:string) => lessons.find(l=>l.id===id);
export const curriculumSources = [
 {title:'Ministerul Educației · intrarea în vigoare a noilor programe',url:'https://www.edu.ro/press_rel_02_2026'},
 {title:'OMEC 6930/2025 · anexa 27, paginile 1033–1077 (document publicat)',url:'https://rocnee.eu/images/rocnee/fisiere/programe_scolare/2026/programe_scolare_liceu_ordin6930/OME_6930_ORDIN_programe_scolare_liceu_anexe_MOF_4Bis.pdf'},
 {title:'Copie a Monitorului Oficial · anexa 27',url:'https://cdn.edupedu.ro/wp-content/uploads/2026/01/Ordinul-Nr.-6.930-Programe-scolare-liceu-Monitorul-Oficial-Partea-I-nr.-4Bis-2_compressed.pdf'},
 {title:'Reper pentru cohortele anterioare · programa simulării BAC 2026',url:'https://cdn.edupedu.ro/wp-content/uploads/2026/02/Anexa_17_Programa_simulare_Matematica_bac_2026.pdf'},
];
