import { BookOpen, Check, CheckCircle2, ChevronRight, LockKeyhole, Sparkles, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { courseLessons } from '../content/curriculum';
import { useLearning } from '../hooks/useLearning';
import { dailyPlan, markDailyLessonVisited } from '../lib/daily';

export function DailyMission() {
  const { progress, update } = useLearning();
  const plan = dailyPlan(progress, courseLessons(progress.grade, progress.curriculum));
  if (!plan) return null;

  const stages = [
    {
      title: 'Înțelege',
      detail: plan.lesson.title,
      to: `/lectie/${plan.lesson.id}`,
      done: plan.lessonVisited,
      available: true,
      Icon: BookOpen,
      onStart: () => update(current => markDailyLessonVisited(current, plan.lesson.id)),
    },
    {
      title: 'Exersează',
      detail: `${plan.lesson.questions.length} întrebări cu explicații`,
      to: `/quiz/lesson/${plan.lesson.id}`,
      done: plan.practicePassed,
      available: plan.lessonVisited || plan.practicePassed,
      Icon: Target,
      onStart: undefined,
    },
    {
      title: 'Provocarea zilei',
      detail: '5 întrebări din materia clasei tale',
      to: `/quiz/daily/${progress.grade}`,
      done: plan.challengePassed,
      available: plan.practicePassed,
      Icon: Zap,
      onStart: undefined,
    },
  ];

  return <section className={`daily-card daily-mission ${plan.completed === 3 ? 'mission-complete' : ''}`}>
    <div className="card-topline">
      <span className="pill amber-pill"><Sparkles size={13}/> MISIUNEA DE AZI</span>
      <strong>{plan.completed} din 3</strong>
    </div>
    <h2>{plan.completed === 3 ? 'Ai închis cercul.' : 'Trei pași. Un progres real.'}</h2>
    <p>{plan.completed === 3 ? 'Misiune completă. Revino mâine pentru o idee nouă.' : 'O sesiune scurtă care leagă ideea de practică.'}</p>
    <div className="mission-progress" role="progressbar" aria-label="Progresul misiunii de azi" aria-valuemin={0} aria-valuemax={3} aria-valuenow={plan.completed}>
      <span style={{ width: `${plan.completed / 3 * 100}%` }}/>
    </div>
    <ol className="mission-stages">
      {stages.map(({ title, detail, to, done, available, Icon, onStart }, index) => <li className={done ? 'done' : available ? 'current' : 'locked'} key={title}>
        <span className="mission-step">{done ? <Check size={16}/> : available ? <Icon size={17}/> : <LockKeyhole size={15}/>}</span>
        <div><small>ETAPA {index + 1}</small><strong>{title}</strong><span>{detail}</span></div>
        {available ? <Link to={to} onClick={onStart} aria-label={`${title}: ${detail}`}>{done ? <CheckCircle2 size={19}/> : <ChevronRight size={19}/>}</Link> : <span className="mission-locked-label">Blocat</span>}
      </li>)}
    </ol>
  </section>;
}