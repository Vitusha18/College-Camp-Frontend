
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
// import registerImg from "../assets/register.png";

// export default function Register() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   return (
//     <div className="min-h-screen bg-slate-50">
     

//       <div className="grid lg:grid-cols-[45%_55%] min-h-[calc(100vh-80px)]">
//         <div className="hidden lg:block">
//           <img src={registerImg} alt="Campus" className="w-full h-full object-cover object-center"/>
//         </div>

//         <div className="flex items-center justify-center p-8">
//           <div className="w-full max-w-[450px] bg-white rounded-3xl shadow-xl border p-7">
//             <h2 className="text-4xl font-bold text-center">Create Account</h2>
//             <p className="text-center text-gray-500 mt-2 mb-6">Register to continue to CampusConnect</p>

//             <form className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <Field icon={<User size={18}/>} label="First Name" placeholder="First Name"/>
//                 <Field icon={<User size={18}/>} label="Last Name" placeholder="Last Name"/>
//               </div>

//               <Field icon={<Mail size={18}/>} label="Email Address" placeholder="Email Address" type="email"/>

//               <PasswordField
//                 label="Password"
//                 show={showPassword}
//                 toggle={()=>setShowPassword(!showPassword)}
//               />

//               <PasswordField
//                 label="Confirm Password"
//                 show={showConfirm}
//                 toggle={()=>setShowConfirm(!showConfirm)}
//               />

//               <label className="flex items-center gap-2 text-sm">
//                 <input type="checkbox" className="accent-blue-600"/>
//                 I agree to the
//                 <span className="text-blue-600 font-medium">Terms & Conditions</span>
//               </label>

//               <button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
//                 Create Account
//               </button>

//               <div className="flex items-center gap-3">
//                 <div className="flex-1 h-px bg-gray-200"/>
//                 <span className="text-gray-400 text-sm">OR</span>
//                 <div className="flex-1 h-px bg-gray-200"/>
//               </div>

//               <button type="button" className="w-full h-11 border rounded-xl hover:bg-gray-50">
//                 Continue with Google
//               </button>

//               <p className="text-center text-sm text-gray-500">
//                 Already have an account?
//                 <Link to="/login" className="ml-2 text-blue-600 font-semibold">
//                   Login
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Field({icon,label,placeholder,type="text"}) {
//   return (
//     <div>
//       <label className="block mb-2 font-medium text-sm">{label}</label>
//       <div className="flex items-center border rounded-xl h-11 px-4">
//         <span className="text-gray-400">{icon}</span>
//         <input type={type} placeholder={placeholder} className="ml-3 w-full outline-none"/>
//       </div>
//     </div>
//   );
// }

// function PasswordField({label,show,toggle}) {
//   return (
//     <div>
//       <label className="block mb-2 font-medium text-sm">{label}</label>
//       <div className="flex items-center border rounded-xl h-11 px-4">
//         <Lock size={18} className="text-gray-400"/>
//         <input
//           type={show ? "text":"password"}
//           placeholder={label}
//           className="ml-3 w-full outline-none"
//         />
//         <button type="button" onClick={toggle}>
//           {show ? <EyeOff size={18}/> : <Eye size={18}/>}
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    course: "",
    year: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Temporary frontend registration.
    // Backend authentication can be connected later.
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-6xl min-h-[720px] bg-white rounded-[32px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex relative bg-blue-600 p-12 text-white overflow-hidden">

          {/* Decorative circles */}
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

            {/* CONTENT */}
            <div className="max-w-md">

              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-7">
                <User size={30} />
              </div>

              <h2 className="text-5xl font-bold leading-tight">
                Start your
                <br />
                student
                <br />
                <span className="text-blue-100">
                  journey.
                </span>
              </h2>

              <p className="mt-6 text-blue-100 text-lg leading-8">
                Create your Campus Connect account and bring
                academics, opportunities and your future plans
                together in one place.
              </p>

              {/* FEATURES */}
              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                    ✓
                  </div>

                  <span>
                    Manage your academic progress
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                    ✓
                  </div>

                  <span>
                    Find internships and scholarships
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                    ✓
                  </div>

                  <span>
                    Plan your studies and career
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
            <div className="flex lg:hidden items-center justify-center gap-3 mb-8">

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
            <div className="mb-7">

              <p className="text-sm font-semibold text-blue-600 mb-3">
                GET STARTED
              </p>

              <h2 className="text-4xl font-bold text-slate-900">
                Create your account
              </h2>

              <p className="mt-3 text-slate-500">
                Join Campus Connect and start building your future.
              </p>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleRegister}
              className="space-y-4"
            >

              {/* NAME */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* COLLEGE + COURSE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    College / University
                  </label>

                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Your college"
                    required
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Course
                  </label>

                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g. BCA"
                    required
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              {/* YEAR */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Year of study
                </label>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                >

                  <option value="">
                    Select your year
                  </option>

                  <option value="1">
                    First Year
                  </option>

                  <option value="2">
                    Second Year
                  </option>

                  <option value="3">
                    Third Year
                  </option>

                  <option value="4">
                    Fourth Year
                  </option>

                  <option value="5">
                    Fifth Year
                  </option>

                </select>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    minLength={6}
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* CONFIRM PASSWORD */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-slate-200 bg-slate-50 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* TERMS */}
              <div className="flex items-start gap-2 pt-1">

                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-0.5 accent-blue-600"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-slate-500"
                >
                  I agree to the Terms of Service and Privacy Policy.
                </label>

              </div>

              {/* CREATE ACCOUNT */}
              <button
                type="submit"
                className="w-full h-13 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/20 mt-2"
              >
                Create account
                <ArrowRight size={19} />
              </button>

            </form>

            {/* LOGIN */}
            <p className="text-center text-sm text-slate-500 mt-6">

              Already have an account?

              <Link
                to="/login"
                className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign in
              </Link>

            </p>

          </div>
        </div>

      </div>
    </div>
  );
}