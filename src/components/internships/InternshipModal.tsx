import React, { useState } from 'react';
import { Internship } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  Upload,
  FileText,
  Bookmark,
  BookmarkCheck,
  Send,
  Sparkles,
} from 'lucide-react';

interface InternshipModalProps {
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InternshipModal: React.FC<InternshipModalProps> = ({
  internship,
  isOpen,
  onClose,
}) => {
  const { applyToInternship, toggleBookmarkInternship, userProfile } = useApp();
  const [coverNote, setCoverNote] = useState('');
  const [selectedFile, setSelectedFile] = useState<string>('ananya_singh_resume_2024.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'apply'>('details');

  if (!isOpen || !internship) return null;

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await applyToInternship(internship.id, {
        resumeUrl: selectedFile,
        coverNote,
      });
      onClose();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md shrink-0 flex items-center justify-center text-indigo-600 font-extrabold text-xl overflow-hidden">
              {internship.companyLogo ? (
                <img src={internship.companyLogo} alt={internship.company} className="w-full h-full object-cover rounded-xl" />
              ) : (
                internship.company.charAt(0)
              )}
            </div>

            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/30 text-indigo-200 border border-indigo-400/20">
                {internship.category}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                {internship.title}
              </h2>
              <p className="text-sm text-indigo-200 font-medium mt-0.5">
                {internship.company} • {internship.location} ({internship.type})
              </p>
            </div>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center border-b border-slate-200 px-6 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Overview & Requirements
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'apply'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {internship.status ? 'Application Status' : 'Submit Application'}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-5">
          {activeTab === 'details' ? (
            <>
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Stipend</span>
                  <span className="text-xs font-bold text-slate-900">{internship.stipend}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
                  <span className="text-xs font-bold text-slate-900">{internship.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Deadline</span>
                  <span className="text-xs font-bold text-rose-600">{internship.deadline}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Applicants</span>
                  <span className="text-xs font-bold text-slate-900">{internship.applicantsCount} applied</span>
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {internship.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">About the Role</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{internship.description}</p>
              </div>

              {/* Requirements */}
              {internship.requirements && (
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Key Requirements</h4>
                  <ul className="space-y-1.5">
                    {internship.requirements.map((req, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Perks */}
              {internship.perks && (
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Perks & Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {internship.perks.map((perk, idx) => (
                      <span key={idx} className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                        ✨ {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              {internship.status ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-900">Application Submitted</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    Current Status: <strong className="uppercase">{internship.status}</strong>
                  </p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">
                    Applied on: {internship.appliedDate || 'May 2024'}
                  </p>
                </div>
              ) : (
                <>
                  {submitError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-medium text-rose-700">
                      {submitError}
                    </div>
                  )}
                  <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
                    <p className="text-xs text-indigo-900">
                      Your verified academic transcript & profile details will be shared directly with the recruiter.
                    </p>
                  </div>

                  {/* Student Details Auto-Filled */}
                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Applicant</span>
                      <p className="font-bold text-slate-900">{userProfile.name}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">College & Major</span>
                      <p className="font-bold text-slate-900">{userProfile.department}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">CGPA</span>
                      <p className="font-bold text-emerald-600">{userProfile.cgpa} / 10.0</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Roll Number</span>
                      <p className="font-bold text-slate-900">{userProfile.rollNumber}</p>
                    </div>
                  </div>

                  {/* Resume selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Attached Resume
                    </label>
                    <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between bg-white hover:border-indigo-300 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{selectedFile}</p>
                          <p className="text-[10px] text-slate-400">PDF • Verified Campus Resume</p>
                        </div>
                      </div>
                      <label className="cursor-pointer text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                        Replace
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setSelectedFile(e.target.files[0].name);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Why should you be hired note */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Why are you a good fit for this role? (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Mention your relevant projects, hackathon wins, or key technical strengths..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? 'Submitting...' : 'Confirm & Apply Now'}
                  </button>
                </>
              )}
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => toggleBookmarkInternship(internship.id)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
          >
            {internship.isBookmarked ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-indigo-600" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                Save for Later
              </>
            )}
          </button>

          {activeTab === 'details' && !internship.status && (
            <button
              onClick={() => setActiveTab('apply')}
              className="py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all"
            >
              Apply to {internship.company}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
