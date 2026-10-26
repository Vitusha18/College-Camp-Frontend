import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { SemesterGPA, SubjectGrade } from '../../types';
import {
  Calculator,
  Plus,
  Trash2,
  TrendingUp,
  Award,
  BookOpen,
  Sparkles,
  RefreshCw,
  HelpCircle,
  X,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const GRADE_POINTS: Record<string, number> = {
  O: 10,
  'A+': 9.5,
  A: 9.0,
  'A-': 8.5,
  'B+': 8.0,
  B: 7.5,
  'B-': 7.0,
  C: 6.0,
  P: 5.0,
  F: 0,
};

function semesterTotals(semester: number, subjects: SubjectGrade[], history: SemesterGPA[]) {
  const semesterSubjects = subjects.filter((subject) => subject.semester === semester);
  if (semesterSubjects.length > 0) {
    return semesterSubjects.reduce(
      (totals, subject) => ({
        credits: totals.credits + subject.credits,
        points: totals.points + subject.credits * subject.gradePoint,
      }),
      { credits: 0, points: 0 }
    );
  }

  const savedSemester = history.find((entry) => entry.semester === semester);
  return savedSemester
    ? { credits: savedSemester.credits, points: savedSemester.credits * savedSemester.sgpa }
    : { credits: 0, points: 0 };
}

function calculateCumulativeGpa(subjects: SubjectGrade[], history: SemesterGPA[]): number {
  let totalCredits = 0;
  let totalPoints = 0;
  for (let semester = 1; semester <= 8; semester += 1) {
    const totals = semesterTotals(semester, subjects, history);
    totalCredits += totals.credits;
    totalPoints += totals.points;
  }

  return totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0;
}

export const GpaCalculator: React.FC = () => {
  const {
    subjectGrades,
    updateSubjectGrades,
    semesterGPAs,
    updateProfile,
    userProfile,
  } = useApp();

  const [currentSemester, setCurrentSemester] = useState<number>(1);
  const [targetCGPA, setTargetCGPA] = useState<number | null>(null);
  const [targetInput, setTargetInput] = useState<string>('');

  // Modal State
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectCode, setNewSubjectCode] = useState('');
  const [newSubjectCredits, setNewSubjectCredits] = useState(3);
  const [newSubjectGrade, setNewSubjectGrade] = useState('A');

  // Subject table list for current semester
  const semesterSubjects = useMemo(() => {
    return subjectGrades.filter((s) => s.semester === currentSemester);
  }, [subjectGrades, currentSemester]);

  // Calculate SGPA for current semester
  const { sgpa, totalCredits, totalPoints } = useMemo(() => {
    let creditsSum = 0;
    let pointsSum = 0;

    semesterSubjects.forEach((sub) => {
      creditsSum += sub.credits;
      pointsSum += sub.credits * sub.gradePoint;
    });

    const calculatedSGPA = creditsSum > 0 ? pointsSum / creditsSum : 0;
    return {
      sgpa: Number(calculatedSGPA.toFixed(2)),
      totalCredits: creditsSum,
      totalPoints: pointsSum,
    };
  }, [semesterSubjects]);

  // Calculate overall CGPA
  const cgpa = useMemo(
    () => calculateCumulativeGpa(subjectGrades, semesterGPAs),
    [subjectGrades, semesterGPAs]
  );

  // Derived Required SGPA
  const requiredSGPAPrediction = useMemo(() => {
    if (!targetCGPA) return null;

    if (targetCGPA <= cgpa) {
      return { achieved: true, message: "You have already achieved this!" };
    }

    const semsLeft = 8 - currentSemester;
    if (semsLeft <= 0) return { impossible: true, message: "You are already in your final semester." };

    let completedCredits = 0;
    let completedPoints = 0;
    for (let semester = 1; semester <= currentSemester; semester += 1) {
      const totals = semesterTotals(semester, subjectGrades, semesterGPAs);
      completedCredits += totals.credits;
      completedPoints += totals.points;
    }
    const remainingCredits = semsLeft * 20;
    const requiredAverage = (targetCGPA * (completedCredits + remainingCredits) - completedPoints) / remainingCredits;

    if (requiredAverage > 10) {
      return { impossible: true, message: "Target mathematically unachievable." };
    }

    return { value: requiredAverage.toFixed(2), semsLeft };
  }, [targetCGPA, currentSemester, cgpa, semesterGPAs, subjectGrades]);

  const persistCalculatedCGPA = (subjects: SubjectGrade[]) => {
    updateProfile({ cgpa: calculateCumulativeGpa(subjects, semesterGPAs) });
  };

  const handleGradeChange = (id: string, grade: string) => {
    const point = GRADE_POINTS[grade] ?? 8.0;
    const updated = subjectGrades.map((sub) =>
      sub.id === id ? { ...sub, grade, gradePoint: point } : sub
    );
    updateSubjectGrades(updated);
    persistCalculatedCGPA(updated);
  };

  const handleCreditsChange = (id: string, credits: number) => {
    const updated = subjectGrades.map((sub) =>
      sub.id === id ? { ...sub, credits: Math.max(1, credits) } : sub
    );
    updateSubjectGrades(updated);
    persistCalculatedCGPA(updated);
  };

  const handleNameChange = (id: string, name: string) => {
    const updated = subjectGrades.map((sub) =>
      sub.id === id ? { ...sub, name } : sub
    );
    updateSubjectGrades(updated);
  };

  const handleAddSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;

    const point = GRADE_POINTS[newSubjectGrade] ?? 8.0;
    const newSubject: SubjectGrade = {
      id: `sub_${Date.now()}`,
      name: newSubjectName,
      code: newSubjectCode || `CS${Math.floor(100 + Math.random() * 900)}`,
      credits: newSubjectCredits,
      grade: newSubjectGrade,
      gradePoint: point,
      semester: currentSemester,
    };
    updateSubjectGrades([...subjectGrades, newSubject]);
    persistCalculatedCGPA([...subjectGrades, newSubject]);

    // Reset and Close Modal
    setNewSubjectName('');
    setNewSubjectCode('');
    setNewSubjectCredits(3);
    setNewSubjectGrade('A');
    setIsAddSubjectModalOpen(false);
  };

  const handleDeleteSubject = (id: string) => {
    const updated = subjectGrades.filter((s) => s.id !== id);
    updateSubjectGrades(updated);
    persistCalculatedCGPA(updated);
  };

  // Trend data for chart
  const trendData = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => index + 1)
      .map((semester) => {
        const record = semesterGPAs.find((entry) => entry.semester === semester);
        const subjects = subjectGrades.filter((entry) => entry.semester === semester);
        if (!record && subjects.length === 0) return null;
        const points = subjects.reduce((sum, subject) => sum + subject.credits * subject.gradePoint, 0);
        const credits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
        return {
          semester: record?.semesterName ?? `Semester ${semester}`,
          gpa: semester === currentSemester && credits > 0
            ? Number((points / credits).toFixed(2))
            : record?.sgpa ?? Number((points / credits).toFixed(2)),
        };
      })
      .filter((entry): entry is { semester: string; gpa: number } => entry !== null);
  }, [semesterGPAs, subjectGrades, currentSemester]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">GPA Calculator & Performance</h2>
          <p className="text-xs text-slate-500">
            Calculate your SGPA, projected CGPA, and analyze academic grade trends.
          </p>
        </div>

        {/* Semester Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Semester:</span>
          <select
            value={currentSemester}
            onChange={(e) => setCurrentSemester(Number(e.target.value))}
            className="bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-1.5 text-xs font-bold shadow-2xs focus:outline-none focus:border-indigo-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (Table) + Right 4 Cols (Score Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Subject Grade Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Enrolled Subjects (Semester {currentSemester})
              </h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 px-2">Subject</th>
                    <th className="pb-3 px-2 w-24 text-center">Credits</th>
                    <th className="pb-3 px-2 w-28 text-center">Grade</th>
                    <th className="pb-3 px-2 w-24 text-center">Grade Point</th>
                    <th className="pb-3 px-2 w-16 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {semesterSubjects.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Subject Name */}
                      <td className="py-3 px-2 font-medium text-slate-900">
                        <input
                          type="text"
                          value={sub.name}
                          onChange={(e) => handleNameChange(sub.id, e.target.value)}
                          className="w-full bg-transparent border-0 font-semibold text-slate-900 focus:ring-1 focus:ring-indigo-500 rounded p-1"
                        />
                      </td>

                      {/* Credits */}
                      <td className="py-3 px-2 text-center">
                        <select
                          value={sub.credits}
                          onChange={(e) => handleCreditsChange(sub.id, Number(e.target.value))}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500"
                        >
                          {[1, 2, 3, 4, 5, 6].map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Letter Grade */}
                      <td className="py-3 px-2 text-center">
                        <select
                          value={sub.grade}
                          onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-indigo-700 focus:outline-none focus:border-indigo-500"
                        >
                          {Object.keys(GRADE_POINTS).map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Grade Point */}
                      <td className="py-3 px-2 text-center font-bold text-slate-900">
                        {sub.gradePoint}
                      </td>

                      {/* Action Delete */}
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => handleDeleteSubject(sub.id)}
                          className="p-1 text-slate-300 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                          title="Remove subject"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Subject Button underneath table matching screenshot */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setIsAddSubjectModalOpen(true)}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Subject
              </button>

              <span className="text-xs text-slate-400 font-medium">
                Standard 10-Point UGC Grading Scale
              </span>
            </div>
          </div>

          {/* Performance Trend Chart Card matching screenshot */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Performance Trend</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Semester 1 to Semester 8</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="semester"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    domain={[6.0, 10.0]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e1b4b',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="gpa"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ fill: '#4f46e5', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Calculated SGPA & CGPA Cards */}
        <div className="lg:col-span-4 space-y-5">
          {/* Summary Cards */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4 text-center">
            {/* SGPA Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                SGPA (Semester {currentSemester})
              </span>
              <span className="text-4xl font-extrabold text-slate-900 mt-1 block tracking-tight">
                {sgpa.toFixed(2)}
              </span>
            </div>

            {/* CGPA Box */}
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500 block">
                CGPA (Cumulative)
              </span>
              <span className="text-4xl font-extrabold text-indigo-950 mt-1 block tracking-tight">
                {cgpa.toFixed(2)}
              </span>
            </div>

            {/* Total Credits */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
              <span>Total Semester Credits</span>
              <span className="font-bold text-slate-800">{totalCredits} Credits</span>
            </div>
          </div>

          {/* Goal Simulator Box */}
          <div className="bg-gradient-to-br from-indigo-900 to-violet-900 text-white rounded-2xl p-5 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-300" /> Target GPA Predictor</div>
              {targetCGPA && (
                <button onClick={() => { setTargetCGPA(null); setTargetInput(''); }} className="text-[10px] text-indigo-300 hover:text-white underline">Reset</button>
              )}
            </h4>

            {!targetCGPA ? (
              <div className="mt-4">
                <p className="text-xs text-indigo-200 mb-3 leading-relaxed">
                  Set a target graduation CGPA to see what grades you need in your remaining semesters.
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    placeholder="e.g. 9.00"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder:text-indigo-300 focus:outline-none focus:border-indigo-400"
                  />
                  <button
                    onClick={() => {
                      const val = parseFloat(targetInput);
                      if (val > 0 && val <= 10) setTargetCGPA(val);
                    }}
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    Set
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-2 animate-in fade-in">
                <p className="text-xs text-indigo-100 mt-2 leading-relaxed">
                  To raise your cumulative CGPA to <strong className="text-white">{targetCGPA.toFixed(2)}</strong> across final semesters, you need an average SGPA of:
                </p>
                <div className="mt-3 bg-white/10 rounded-xl p-3 text-center border border-white/10">
                  {requiredSGPAPrediction?.impossible ? (
                    <span className="text-sm font-black text-rose-300">{requiredSGPAPrediction.message}</span>
                  ) : requiredSGPAPrediction?.achieved ? (
                    <span className="text-sm font-black text-emerald-300">{requiredSGPAPrediction.message}</span>
                  ) : (
                    <>
                      <span className="text-2xl font-black text-amber-300">{requiredSGPAPrediction?.value} SGPA</span>
                      <span className="text-[10px] text-indigo-200 block mt-0.5">
                        Required in remaining {requiredSGPAPrediction?.semsLeft} semesters
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Subject Modal */}
      {isAddSubjectModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsAddSubjectModalOpen(false)} />

          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95">
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white p-5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Add Subject to Semester {currentSemester}
              </h3>
              <button onClick={() => setIsAddSubjectModalOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubjectSubmit} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Name *</label>
                <input
                  type="text"
                  required
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  placeholder="e.g. Database Management Systems"
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Code (Optional)</label>
                <input
                  type="text"
                  value={newSubjectCode}
                  onChange={(e) => setNewSubjectCode(e.target.value)}
                  placeholder="e.g. CS201"
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Credits</label>
                  <select
                    value={newSubjectCredits}
                    onChange={(e) => setNewSubjectCredits(Number(e.target.value))}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Grade Expected/Received</label>
                  <select
                    value={newSubjectGrade}
                    onChange={(e) => setNewSubjectGrade(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    {['O', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C', 'P', 'F'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all mt-2"
              >
                Add Subject
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
