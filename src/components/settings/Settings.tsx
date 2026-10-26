import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Moon, Sun, User, Mail, Shield, Save, Settings2 } from 'lucide-react';
import { UserProfile } from '../../types';

type ProfileDetailsForm = {
    department: string;
    degree: string;
    year: string;
    college: string;
    rollNumber: string;
    cgpa: string;
    bio: string;
    githubUrl: string;
    linkedinUrl: string;
    resumeUrl: string;
    familyIncome: string;
    category: NonNullable<UserProfile['category']>;
    gender: NonNullable<UserProfile['gender']>;
};

export const Settings: React.FC = () => {
    const { userProfile, updateProfile, isDark, toggleTheme, addToast, setActiveTab } = useApp();

    const [name, setName] = useState(userProfile.name);
    const [email, setEmail] = useState(userProfile.email); // Readonly usually, but we can bind it
    const [profileDetails, setProfileDetails] = useState<ProfileDetailsForm>({
        department: userProfile.department || '',
        degree: userProfile.degree || '',
        year: userProfile.year || '',
        college: userProfile.college || '',
        rollNumber: userProfile.rollNumber || '',
        cgpa: String(userProfile.cgpa || 0),
        bio: userProfile.bio || '',
        githubUrl: userProfile.githubUrl || '',
        linkedinUrl: userProfile.linkedinUrl || '',
        resumeUrl: userProfile.resumeUrl || '',
        familyIncome: userProfile.familyIncome == null ? '' : String(userProfile.familyIncome),
        category: userProfile.category || '',
        gender: userProfile.gender || '',
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const familyIncome = profileDetails.familyIncome.trim() ? Number(profileDetails.familyIncome) : null;
        if (familyIncome !== null && (!Number.isFinite(familyIncome) || familyIncome < 0 || familyIncome > 100000)) {
            addToast({ type: 'error', title: 'Invalid family income', message: 'Enter a value between 0 and 100000 LPA.' });
            return;
        }
        await updateProfile({
            name,
            department: profileDetails.department,
            degree: profileDetails.degree,
            year: profileDetails.year,
            college: profileDetails.college,
            rollNumber: profileDetails.rollNumber,
            cgpa: Number(profileDetails.cgpa),
            bio: profileDetails.bio,
            githubUrl: profileDetails.githubUrl,
            linkedinUrl: profileDetails.linkedinUrl,
            resumeUrl: profileDetails.resumeUrl,
            familyIncome,
            category: profileDetails.category,
            gender: profileDetails.gender,
        });
    };

    return (
        <div className="mx-auto max-w-6xl space-y-6 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight dark:text-white">Settings</h1>
                    <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">Manage your account preferences and application settings.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
                <aside className="space-y-4 lg:col-span-3">
                    <nav aria-label="Settings sections" className="rounded-2xl border border-slate-100 bg-white p-2 shadow-sm shadow-slate-200/30">
                        <button
                            type="button"
                            onClick={() => setActiveTab('notifications')}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                        >
                            <Bell className="h-4 w-4" /> Notifications
                        </button>
                        <button
                            type="button"
                            onClick={() => document.getElementById('account-settings')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                            className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-left text-xs font-semibold text-indigo-700"
                        >
                            <User className="h-4 w-4" /> Account
                        </button>
                        <button
                            type="button"
                            onClick={() => document.getElementById('security-settings')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                        >
                            <Shield className="h-4 w-4" /> Security
                        </button>
                    </nav>

                    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/30">
                        <div className="mb-3 flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Settings2 className="h-4 w-4" /></span>
                            <h3 className="text-xs font-bold text-slate-800">Appearance</h3>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium text-slate-800">Dark mode</p>
                                <p className="mt-0.5 text-[10px] text-slate-400">Choose your display theme</p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={isDark}
                                aria-label="Dark mode"
                                onClick={toggleTheme}
                                className={`relative flex h-6 w-11 items-center rounded-full px-1 transition-colors ${isDark ? 'bg-indigo-600' : 'bg-slate-200'}`}
                            >
                                <span className={`flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${isDark ? 'translate-x-5' : 'translate-x-0'}`}>
                                    {isDark ? <Moon className="h-2.5 w-2.5 text-indigo-600" /> : <Sun className="h-2.5 w-2.5 text-amber-500" />}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div id="security-settings" className="scroll-mt-24 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/30">
                        <div className="flex items-start gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Shield className="h-4 w-4" /></span>
                            <div>
                                <h3 className="text-xs font-bold text-slate-800">Account security</h3>
                                <p className="mt-1 text-[10px] leading-relaxed text-slate-500">Your account is managed through secure CampusConnect sign-in.</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Right Column - Account Details */}
                <div id="account-settings" className="scroll-mt-24 lg:col-span-9">
                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6 dark:bg-slate-800 dark:border-slate-700">
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 dark:text-slate-200 dark:border-slate-700">
                            Account Details
                        </h3>

                        <form onSubmit={handleSave} className="space-y-4">
                            {/* Avatar Mock */}
                            <div className="flex items-center gap-4 pb-4">
                                <div className="w-16 h-16 rounded-full bg-indigo-100 border-2 border-indigo-50 flex items-center justify-center shrink-0 overflow-hidden dark:bg-slate-700 dark:border-slate-600">
                                    {userProfile.avatar ? (
                                        <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 text-indigo-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Your avatar is generated from your account name.</p>
                                    <p className="text-[10px] text-slate-400 mt-1">Avatar uploads will be available when profile media storage is enabled.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5 dark:text-slate-300">
                                        <User className="w-3.5 h-3.5" /> Full Legal Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5 dark:text-slate-300">
                                        <Mail className="w-3.5 h-3.5" /> Primary Email
                                    </label>
                                    <input
                                        type="email"
                                        disabled
                                        value={email}
                                        className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed dark:bg-slate-700/50 dark:border-slate-700 dark:text-slate-500"
                                    />
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-4 dark:border-slate-700">
                                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Student Profile</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Department</label>
                                        <input value={profileDetails.department} maxLength={120} onChange={e => setProfileDetails({ ...profileDetails, department: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Degree</label>
                                        <input value={profileDetails.degree} maxLength={120} onChange={e => setProfileDetails({ ...profileDetails, degree: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Year</label>
                                        <input value={profileDetails.year} maxLength={30} onChange={e => setProfileDetails({ ...profileDetails, year: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">College</label>
                                        <input value={profileDetails.college} maxLength={200} onChange={e => setProfileDetails({ ...profileDetails, college: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Roll Number</label>
                                        <input value={profileDetails.rollNumber} maxLength={80} onChange={e => setProfileDetails({ ...profileDetails, rollNumber: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">CGPA (out of 10)</label>
                                        <input type="number" min="0" max="10" step="0.01" value={profileDetails.cgpa} onChange={e => setProfileDetails({ ...profileDetails, cgpa: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Family Income (LPA)</label>
                                        <input type="number" min="0" max="100000" step="0.01" value={profileDetails.familyIncome} onChange={e => setProfileDetails({ ...profileDetails, familyIncome: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Category</label>
                                        <select value={profileDetails.category} onChange={e => setProfileDetails({ ...profileDetails, category: (['General', 'OBC', 'SC', 'ST', 'EWS'] as const).find(value => value === e.target.value) || '' })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                            <option value="">Not specified</option>
                                            {['General', 'OBC', 'SC', 'ST', 'EWS'].map(value => <option key={value}>{value}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Gender</label>
                                        <select value={profileDetails.gender} onChange={e => setProfileDetails({ ...profileDetails, gender: (['Female', 'Male', 'Other'] as const).find(value => value === e.target.value) || '' })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                            <option value="">Not specified</option>
                                            {['Female', 'Male', 'Other'].map(value => <option key={value}>{value}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">GitHub URL</label>
                                        <input type="url" value={profileDetails.githubUrl} maxLength={2048} onChange={e => setProfileDetails({ ...profileDetails, githubUrl: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">LinkedIn URL</label>
                                        <input type="url" value={profileDetails.linkedinUrl} maxLength={2048} onChange={e => setProfileDetails({ ...profileDetails, linkedinUrl: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Resume URL</label>
                                        <input type="url" value={profileDetails.resumeUrl} maxLength={2048} onChange={e => setProfileDetails({ ...profileDetails, resumeUrl: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Bio</label>
                                    <textarea value={profileDetails.bio} maxLength={2000} rows={3} onChange={e => setProfileDetails({ ...profileDetails, bio: e.target.value })} className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end dark:border-slate-700">
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
