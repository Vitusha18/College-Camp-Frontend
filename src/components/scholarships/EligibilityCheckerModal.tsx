import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, CheckCircle2, XCircle, Sparkles, X, ArrowRight } from 'lucide-react';

interface EligibilityCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EligibilityCheckerModal: React.FC<EligibilityCheckerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { scholarships, userProfile, applyToScholarship } = useApp();

  const [studentCGPA, setStudentCGPA] = useState<number>(userProfile.cgpa || 8.42);
  const [studentIncomeLPA, setStudentIncomeLPA] = useState<number>(userProfile.familyIncome || 4.5);
  const [studentGender, setStudentGender] = useState<'All' | 'Female' | 'Male'>('Female');
  const [studentCategory, setStudentCategory] = useState<string>('General');

  if (!isOpen) return null;

  // Filter scholarships by eligibility
  const eligibleScholarships = scholarships.filter((sch) => {
    const meetsCGPA = studentCGPA >= sch.minCGPA;
    const meetsIncome = studentIncomeLPA <= sch.maxIncomeLPA;
    const meetsGender = sch.gender === 'All' || sch.gender === studentGender;
    return meetsCGPA && meetsIncome && meetsGender;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Smart Eligibility Checker</h3>
              <p className="text-xs text-purple-200">Find 100% match scholarships for your profile</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Parameters */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your CGPA (out of 10)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={studentCGPA}
                onChange={(e) => setStudentCGPA(parseFloat(e.target.value) || 0)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Annual Family Income (in Lakhs)</label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={studentIncomeLPA}
                onChange={(e) => setStudentIncomeLPA(parseFloat(e.target.value) || 0)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
              <select
                value={studentGender}
                onChange={(e) => setStudentGender(e.target.value as any)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="All">Other / Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reservation Category</label>
              <select
                value={studentCategory}
                onChange={(e) => setStudentCategory(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>
          </div>

          {/* Results section */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Eligible Schemes ({eligibleScholarships.length} Found)
              </h4>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> High Match Probability
              </span>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {eligibleScholarships.map((sch) => (
                <div
                  key={sch.id}
                  className="p-3 rounded-xl border border-purple-100 bg-purple-50/40 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{sch.title}</h5>
                    <p className="text-[11px] text-purple-700 font-medium">{sch.provider} • {sch.amount}</p>
                    <p className="text-[10px] text-slate-400">Req: CGPA ≥ {sch.minCGPA}, Income ≤ {sch.maxIncomeLPA} LPA</p>
                  </div>

                  <button
                    onClick={() => {
                      applyToScholarship(sch.id);
                      onClose();
                    }}
                    className="text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-lg shrink-0 transition-colors shadow-2xs"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
