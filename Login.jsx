import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary frontend login
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-6xl min-h-[680px] bg-white rounded-[32px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex relative bg-blue-600 p-12 text-white overflow-hidden">

          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full" />

          <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-white/10 rounded-full" />

          <div className="relative z-10 flex flex-col justify-between w-full">

            {/* LOGO */}
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center">
                <GraduationCap
                  size={26}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h1 className="text-xl font-bold">
                  Campus Connect
                </h1>

                <p className="text-xs text-blue-100">
                  Student Success Platform
                </p>
              </div>

            </div>

            {/* LEFT CONTENT */}
            <div className="max-w-md">

              

              <h2 className="text-5xl font-bold leading-tight">
                Your campus.
                <br />
                Your future.
                <br />

                <span className="text-blue-100">
                  Connected.
                </span>
              </h2>

              <p className="mt-6 text-blue-100 text-lg leading-8">
                Manage your academics, discover internships,
                find scholarships and plan your student journey
                — all in one place.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                    ✓
                  </div>

                  <span>
                    Track your academic progress
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                    ✓
                  </div>

                  <span>
                    Discover career opportunities
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                    ✓
                  </div>

                  <span>
                    Build a smarter study plan
                  </span>
                </div>

              </div>

            </div>

            {/* SECURITY */}
            <div className="flex items-center gap-2 text-sm text-blue-100">
              <ShieldCheck size={17} />
              <span>Your information is secure</span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <div className="flex lg:hidden items-center justify-center gap-3 mb-10">

              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                <GraduationCap
                  size={26}
                  className="text-white"
                />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Campus Connect
                </h1>

                <p className="text-xs text-slate-500">
                  Student Success Platform
                </p>
              </div>

            </div>

            {/* HEADING */}
            <div className="mb-8">

              <p className="text-sm font-semibold text-blue-600 mb-3">
                WELCOME BACK
              </p>

              <h2 className="text-4xl font-bold text-slate-900">
                Sign in to your account
              </h2>

              <p className="mt-3 text-slate-500">
                Enter your details to continue to Campus Connect.
              </p>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full h-14 pl-12 pr-12 rounded-xl border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* REMEMBER ME */}
              <div className="flex items-center gap-2">

                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-600"
                >
                  Remember me
                </label>

              </div>

              {/* LOGIN */}
              <button
                type="submit"
                className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/20"
              >
                Sign in
                <ArrowRight size={19} />
              </button>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 py-2">

                <div className="flex-1 h-px bg-slate-200" />

                <span className="text-xs font-medium text-slate-400">
                  OR
                </span>

                <div className="flex-1 h-px bg-slate-200" />

              </div>

              {/* GOOGLE */}
              <button
                type="button"
                className="w-full h-14 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center gap-3 transition"
              >
                <span className="text-lg font-bold">
                  G
                </span>

                Continue with Google
              </button>

            </form>

            {/* REGISTER */}
            <p className="text-center text-sm text-slate-500 mt-8">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
              >
                Create account
              </Link>

            </p>

          </div>
        </div>

      </div>
    </div>
  );
}