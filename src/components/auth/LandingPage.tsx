import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Eye, EyeOff, Sparkles, ChevronRight, GraduationCap } from 'lucide-react';

export const LandingPage: React.FC<{ onAuthSuccess: () => void }> = ({ onAuthSuccess }) => {
    const [view, setView] = useState<'landing' | 'login' | 'register-student'>('landing');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [universityId, setUniversityId] = useState('');
    const [universities, setUniversities] = useState<Array<{ id: string; name: string; domain: string }>>([]);
    const [isLoadingUniversities, setIsLoadingUniversities] = useState(false);

    useEffect(() => {
        if (view !== 'register-student') return;

        let isCurrent = true;
        setIsLoadingUniversities(true);
        api.getUniversities()
            .then((data) => {
                if (isCurrent) setUniversities(data);
            })
            .catch(() => {
                if (isCurrent) setError('Unable to load universities. Please try again shortly.');
            })
            .finally(() => {
                if (isCurrent) setIsLoadingUniversities(false);
            });

        return () => { isCurrent = false; };
    }, [view]);

    const submitAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (view === 'login') {
                await api.login(email.trim(), password);
            } else {
                await api.register({ name: name.trim(), email: email.trim(), password, universityId });
            }
            onAuthSuccess();
        } catch (err: any) {
            setError(err.message || 'Authentication Error');
        } finally {
            setLoading(false);
        }
    };

    if (view === 'landing') {
        return (
            <div className="light-theme relative flex min-h-screen flex-col items-center overflow-hidden bg-[#f8f9ff] font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-950">
                <div className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-indigo-200/50 blur-[110px]" />
                <div className="pointer-events-none absolute -right-40 top-16 h-[30rem] w-[30rem] rounded-full bg-violet-200/45 blur-[110px]" />
                <div className="pointer-events-none absolute -bottom-48 left-1/3 h-[28rem] w-[28rem] rounded-full bg-sky-100/80 blur-[110px]" />

                <header className="z-10 flex w-full max-w-7xl items-center justify-between px-6 py-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-600/20">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">CampusConnect</span>
                    </div>
                    <button onClick={() => setView('login')} className="rounded-xl border border-slate-200 bg-white/80 px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-white hover:text-indigo-700">
                        Sign In
                    </button>
                </header>

                <main className="z-10 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:py-20">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
                        <Sparkles className="w-4 h-4" /> Version 2.0 Live - Secure Architecture
                    </div>

                    <h1 className="mb-7 text-5xl font-black leading-[1.08] tracking-tighter text-slate-950 sm:text-6xl md:text-7xl">
                        Your University Hub, <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">Elevated for Success.</span>
                    </h1>

                    <p className="mb-10 max-w-3xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg md:text-xl">
                        CampusConnect bridges the gap between students, administration, and real-world opportunities with a next-generation unified digital experience.
                    </p>

                    <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-5 sm:flex-row">
                        <button onClick={() => setView('register-student')} className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] sm:w-auto">
                            <GraduationCap className="w-5 h-5" /> Join as Student <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="light-theme relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#f8f9ff] px-6 py-12 font-sans text-slate-900">
            <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-indigo-200/45 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-48 -left-40 h-[32rem] w-[32rem] rounded-full bg-violet-100/70 blur-[110px]" />

            <button onClick={() => setView('landing')} aria-label="Back to home" className="absolute left-6 top-6 rounded-full border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-700 sm:left-8 sm:top-8">
                <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-600/20">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-center text-4xl font-black tracking-tight text-slate-900">
                        {view === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="mt-3 font-medium text-slate-500">
                        {view === 'login' ? 'Sign in to access your dashboard' : 'Join the most connected campus network'}
                    </p>
                </div>

                <div className="rounded-3xl border border-white bg-white/90 px-8 py-10 shadow-xl shadow-indigo-950/5 backdrop-blur-xl">
                    {error && <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{error}</div>}
                    <form className="space-y-5" onSubmit={submitAuth}>
                        {view !== 'login' && (
                            <>
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">Full Name</label>
                                    <input type="text" required maxLength={100} value={name} onChange={e => setName(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100" placeholder="E.g., Alex Johnson" />
                                </div>
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">University</label>
                                    <select
                                        required
                                        value={universityId}
                                        onChange={e => setUniversityId(e.target.value)}
                                        disabled={isLoadingUniversities || universities.length === 0}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:opacity-50"
                                    >
                                        <option value="">{isLoadingUniversities ? 'Loading universities...' : 'Select your university'}</option>
                                        {universities.map((university) => (
                                            <option key={university.id} value={university.id}>{university.name}</option>
                                        ))}
                                    </select>
                                    {!isLoadingUniversities && universities.length === 0 && (
                                        <p className="mt-1.5 text-xs text-amber-700">No universities are configured yet. Please contact your campus administrator.</p>
                                    )}
                                </div>
                            </>
                        )}
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">Email Address</label>
                            <input type="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100" placeholder="you@university.edu" />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} required minLength={view === 'login' ? undefined : 8} maxLength={72} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100" placeholder="••••••••" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition-colors hover:text-indigo-600">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button disabled={loading || (view === 'register-student' && (isLoadingUniversities || universities.length === 0))} type="submit" className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:from-indigo-500 hover:to-violet-500 active:scale-[0.99] disabled:opacity-50">
                                {loading ? 'Processing Securely...' : (view === 'login' ? 'Sign In Securely' : 'Create Account')}
                            </button>
                        </div>

                        <div className="text-center mt-6">
                            <p className="text-sm font-medium text-slate-500">
                                {view === 'login' ? "Don't have an account? " : "Already have an account? "}
                                <button type="button" onClick={() => setView(view === 'login' ? 'register-student' : 'login')} className="font-bold text-indigo-600 transition-colors hover:text-indigo-800">
                                    {view === 'login' ? 'Register Now' : 'Sign in instead'}
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
