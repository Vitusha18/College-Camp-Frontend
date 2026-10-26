import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Award,
  BookOpen,
  Code2,
  ExternalLink,
  Plus,
  CheckCircle2,
  Upload,
  FileText,
  Star,
  Sparkles,
  Github,
  Globe,
  X,
  Medal,
  ShieldCheck,
  Trash2,
} from 'lucide-react';

export const AchievementsPortfolio: React.FC = () => {
  const {
    userProfile,
    updateProfile,
    certificates,
    addCertificate,
    deleteCertificate,
    projects,
    addProject,
    deleteProject,
    achievements,
    addAchievement,
    deleteAchievement,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Overview' | 'Certificates' | 'Projects' | 'Achievements'>('Overview');
  const [isAddCertModalOpen, setIsAddCertModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddAchievementModalOpen, setIsAddAchievementModalOpen] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Certificate form state
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certId, setCertId] = useState('');
  const [certImage, setCertImage] = useState('');

  // Project form state
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projTech, setProjTech] = useState('');
  const [projGithub, setProjGithub] = useState('');

  // Achievement form state
  const [achTitle, setAchTitle] = useState('');
  const [achOrg, setAchOrg] = useState('');
  const [achRank, setAchRank] = useState('');
  const [achType, setAchType] = useState<'Hackathon' | 'Competitive Programming' | 'Academic'>('Hackathon');

  const showPortfolioError = (action: string, error: unknown) => {
    addToast({
      type: 'error',
      title: `Unable to ${action}`,
      message: error instanceof Error ? error.message : 'Please try again.',
    });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    const currentSkills = userProfile.skills || [];
    if (!currentSkills.includes(newSkillInput.trim())) {
      updateProfile({
        skills: [...currentSkills, newSkillInput.trim()],
      });
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const currentSkills = userProfile.skills || [];
    updateProfile({
      skills: currentSkills.filter((s) => s !== skillToRemove),
    });
  };

  const handleSaveCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim() || !certIssuer.trim()) return;
    try {
      await addCertificate({
        title: certTitle,
        issuer: certIssuer,
        issueDate: certDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        credentialId: certId || `CRED-${Math.floor(100000 + Math.random() * 900000)}`,
        category: 'Certification',
        imageUrl: certImage,
      });
      setCertTitle('');
      setCertIssuer('');
      setCertImage('');
      setIsAddCertModalOpen(false);
    } catch (error) {
      showPortfolioError('save certificate', error);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) return;
    try {
      await addProject({
        title: projTitle,
        description: projDesc,
        techStack: projTech.split(',').map((s) => s.trim()),
        githubUrl: projGithub,
        featured: true,
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      });
      setProjTitle('');
      setProjDesc('');
      setProjTech('');
      setProjGithub('');
      setIsAddProjectModalOpen(false);
    } catch (error) {
      showPortfolioError('save project', error);
    }
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!achTitle.trim()) return;
    try {
      await addAchievement({
        title: achTitle,
        organization: achOrg,
        date: new Date().getFullYear().toString(),
        type: achType,
        rankOrPosition: achRank,
        badgeIcon: achType === 'Hackathon' ? 'Trophy' : 'Star',
      });
      setAchTitle('');
      setAchOrg('');
      setAchRank('');
      setIsAddAchievementModalOpen(false);
    } catch (error) {
      showPortfolioError('save achievement', error);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. TOP PROFILE HEADER BANNER matching UI screenshot */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-18 h-18 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-extrabold text-slate-900">{userProfile.name}</h2>
              <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                Student Profile
              </span>
            </div>
            <p className="text-xs font-semibold text-indigo-600 mt-0.5">
              {userProfile.department}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {userProfile.college} • Roll: {userProfile.rollNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right pr-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Current CGPA</span>
            <span className="text-xl font-extrabold text-indigo-600">{userProfile.cgpa} / 10</span>
          </div>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS matching UI screenshot */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-1">
        {(['Overview', 'Certificates', 'Projects', 'Achievements'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-xs font-bold rounded-xl transition-all ${activeTab === tab
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. OVERVIEW & SKILLS / CERTIFICATES */}
      {(activeTab === 'Overview' || activeTab === 'Certificates') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 5 Cols: Skills (Only visible on Overview) */}
          {activeTab === 'Overview' && (
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-600" /> Technical Skills
                  </h3>
                  <span className="text-[11px] text-slate-400">{(userProfile.skills || []).length} Listed</span>
                </div>

                {/* Skills Tags matching screenshot */}
                <div className="flex flex-wrap gap-2">
                  {(userProfile.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="group text-xs font-bold bg-slate-50 text-slate-700 hover:text-indigo-600 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add Skill Input */}
                <form onSubmit={handleAddSkill} className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    placeholder="Add skill (e.g. Next.js, Kubernetes)..."
                    className="flex-1 text-xs p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-xs font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Right 7 Cols (or Full Width on Certificates tab): Verified Certificates */}
          <div className={`${activeTab === 'Overview' ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Certificates & Badges
                </h3>
                <button
                  onClick={() => setIsAddCertModalOpen(true)}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  + Add New
                </button>
              </div>

              <div className="space-y-3">
                {(activeTab === 'Overview' ? certificates.slice(0, 3) : certificates).map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{cert.title}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">{cert.issuer}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span>Issued: {cert.issueDate}</span>
                          <span>•</span>
                          <span className="font-mono">{cert.credentialId}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {cert.imageUrl && (
                        <a
                          href={cert.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="View Certificate"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${cert.verified
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        : 'text-amber-700 bg-amber-50 border border-amber-200'
                        }`}>
                        {cert.verified ? <CheckCircle2 className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                        {cert.verified ? 'Verified' : 'Unverified'}
                      </span>
                      <button
                        onClick={() => {
                          void deleteCertificate(cert.id).catch((error: unknown) => showPortfolioError('delete certificate', error));
                        }}
                        className="p-1 rounded-md text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Certificate"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {activeTab === 'Overview' && certificates.length > 3 && (
                  <button onClick={() => setActiveTab('Certificates')} className="w-full py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                    View All {certificates.length} Certificates &rarr;
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ACHIEVEMENTS SECTION */}
      {(activeTab === 'Overview' || activeTab === 'Achievements') && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" /> Honors & Competition Wins
            </h3>
            <button
              onClick={() => setIsAddAchievementModalOpen(true)}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              + Add Achievement
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 space-y-2 hover:border-amber-200 transition-colors group relative"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-md">
                      {ach.date}
                    </span>
                    <button
                      onClick={() => {
                        void deleteAchievement(ach.id).catch((error: unknown) => showPortfolioError('delete achievement', error));
                      }}
                      className="p-1 rounded-md text-amber-300 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900">{ach.title}</h4>
                <p className="text-[11px] text-slate-600 font-medium">{ach.organization}</p>
                <p className="text-[10px] font-bold text-amber-700">{ach.rankOrPosition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PROJECTS SECTION */}
      {(activeTab === 'Overview' || activeTab === 'Projects') && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" /> Featured Projects
            </h3>
            <button
              onClick={() => setIsAddProjectModalOpen(true)}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              + Add Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl border border-slate-200/80 hover:border-indigo-200 transition-all flex flex-col justify-between space-y-3 bg-slate-50/30 group relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 pr-4">{proj.title}</h4>
                    <button
                      onClick={() => {
                        void deleteProject(proj.id).catch((error: unknown) => showPortfolioError('delete project', error));
                      }}
                      className="p-1 -mt-1 -mr-1 rounded-md text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">{proj.date}</span>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline font-semibold flex items-center gap-1 text-[11px]"
                    >
                      <Github className="w-3.5 h-3.5" /> Repository
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Certificate Modal */}
      {isAddCertModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsAddCertModalOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden z-10 p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Upload Certificate</h3>
              <button onClick={() => setIsAddCertModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSaveCertificate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Certificate Name *</label>
                <input
                  type="text"
                  required
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issuing Authority / Platform *</label>
                <input
                  type="text"
                  required
                  value={certIssuer}
                  onChange={(e) => setCertIssuer(e.target.value)}
                  placeholder="e.g. Amazon Web Services / Coursera"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issue Date</label>
                <input
                  type="text"
                  value={certDate}
                  onChange={(e) => setCertDate(e.target.value)}
                  placeholder="e.g. Apr 2024"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  value={certImage}
                  onChange={(e) => setCertImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Save Certificate
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsAddProjectModalOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden z-10 p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Add Portfolio Project</h3>
              <button onClick={() => setIsAddProjectModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSaveProject} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="e.g. Distributed Task Queue"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="What problem does it solve? Key architectural highlights..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={projTech}
                  onChange={(e) => setProjTech(e.target.value)}
                  placeholder="React, TypeScript, Go, Redis"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">GitHub / Live URL</label>
                <input
                  type="url"
                  value={projGithub}
                  onChange={(e) => setProjGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Add to Portfolio
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Achievement Modal */}
      {isAddAchievementModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsAddAchievementModalOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden z-10 p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Add Achievement / Honor</h3>
              <button onClick={() => setIsAddAchievementModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSaveAchievement} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={achTitle}
                  onChange={(e) => setAchTitle(e.target.value)}
                  placeholder="e.g. Smart India Hackathon Winner"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Organization / Host</label>
                <input
                  type="text"
                  value={achOrg}
                  onChange={(e) => setAchOrg(e.target.value)}
                  placeholder="e.g. Ministry of Education"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rank / Award Details</label>
                <input
                  type="text"
                  value={achRank}
                  onChange={(e) => setAchRank(e.target.value)}
                  placeholder="1st Prize / Gold Medal"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Record Achievement
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
