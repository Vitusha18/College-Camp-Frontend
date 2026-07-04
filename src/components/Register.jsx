// import React, { useState } from "react";
// import {
//   User,
//   Mail,
//   Lock,
//   School,
//   Users,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// import register from "../assets/register.png";

// export default function Register() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#f8faff] flex">

//       {/* LEFT IMAGE */}

//       <div className="hidden lg:block lg:w-[45%]">

//         <img
//           src={register}
//           alt="Campus Connect"
//           className="w-full h-full object-cover"
//         />

//       </div>

//       {/* RIGHT FORM */}

//       <div className="flex-1 flex items-center justify-center px-8 py-10">

//         <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

//           <div className="text-center mb-8">

//             <h1 className="text-3xl font-bold text-slate-900">
//               Create Account
//             </h1>

//             <p className="text-slate-500 mt-2">
//               Fill in your details to get started
//             </p>

//           </div>

//           <form className="space-y-5">

//             {/* FIRST + LAST */}

//             <div className="grid grid-cols-2 gap-5">

//               <div>

//                 <label className="block mb-2 text-sm font-medium">
//                   First Name
//                 </label>

//                 <div className="flex items-center border rounded-xl h-12 px-4">

//                   <User className="w-5 h-5 text-gray-400"/>

//                   <input
//                     type="text"
//                     placeholder="First Name"
//                     className="ml-3 w-full outline-none text-sm"
//                   />

//                 </div>

//               </div>

//               <div>

//                 <label className="block mb-2 text-sm font-medium">
//                   Last Name
//                 </label>

//                 <div className="flex items-center border rounded-xl h-12 px-4">

//                   <User className="w-5 h-5 text-gray-400"/>

//                   <input
//                     type="text"
//                     placeholder="Last Name"
//                     className="ml-3 w-full outline-none text-sm"
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* COLLEGE + EMAIL */}

//             <div className="grid grid-cols-2 gap-5">

//               <div>

//                 <label className="block mb-2 text-sm font-medium">
//                   College ID
//                 </label>

//                 <div className="flex items-center border rounded-xl h-12 px-4">

//                   <School className="w-5 h-5 text-gray-400"/>

//                   <input
//                     type="text"
//                     placeholder="College ID"
//                     className="ml-3 w-full outline-none text-sm"
//                   />

//                 </div>

//               </div>

//               <div>

//                 <label className="block mb-2 text-sm font-medium">
//                   Email Address
//                 </label>

//                 <div className="flex items-center border rounded-xl h-12 px-4">

//                   <Mail className="w-5 h-5 text-gray-400"/>

//                   <input
//                     type="email"
//                     placeholder="Email Address"
//                     className="ml-3 w-full outline-none text-sm"
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* PASSWORD */}

//             <div className="grid grid-cols-2 gap-5">

//               <div>

//                 <label className="block mb-2 text-sm font-medium">
//                   Password
//                 </label>

//                 <div className="flex items-center border rounded-xl h-12 px-4">

//                   <Lock className="w-5 h-5 text-gray-400"/>

//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     className="ml-3 w-full outline-none text-sm"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5 text-gray-400"/>
//                     ) : (
//                       <Eye className="w-5 h-5 text-gray-400"/>
//                     )}
//                   </button>

//                 </div>

//               </div>

//               <div>

//                 <label className="block mb-2 text-sm font-medium">
//                   Confirm Password
//                 </label>

//                 <div className="flex items-center border rounded-xl h-12 px-4">

//                   <Lock className="w-5 h-5 text-gray-400"/>

//                   <input
//                     type={showConfirm ? "text" : "password"}
//                     placeholder="Confirm Password"
//                     className="ml-3 w-full outline-none text-sm"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowConfirm(!showConfirm)}
//                   >
//                     {showConfirm ? (
//                       <EyeOff className="w-5 h-5 text-gray-400"/>
//                     ) : (
//                       <Eye className="w-5 h-5 text-gray-400"/>
//                     )}
//                   </button>

//                 </div>

//               </div>

//             </div>
//                         {/* ROLE */}

//             <div>

//               <label className="block mb-2 text-sm font-medium">
//                 Role
//               </label>

//               <div className="flex items-center border rounded-xl h-12 px-4">

//                 <Users className="w-5 h-5 text-gray-400" />

//                 <select className="ml-3 w-full outline-none text-sm bg-transparent">

//                   <option value="">Select Role</option>
//                   <option value="student">Student</option>
//                   <option value="admin">Admin</option>

//                 </select>

//               </div>

//             </div>

//             {/* TERMS */}

//             <div className="flex items-start gap-3">

//               <input
//                 type="checkbox"
//                 className="mt-1 accent-blue-600"
//               />

//               <p className="text-sm text-slate-500 leading-6">
//                 I agree to the{" "}
//                 <span className="text-blue-600 font-medium cursor-pointer hover:underline">
//                   Terms & Conditions
//                 </span>{" "}
//                 and{" "}
//                 <span className="text-blue-600 font-medium cursor-pointer hover:underline">
//                   Privacy Policy
//                 </span>
//               </p>

//             </div>

//             {/* REGISTER BUTTON */}

//             <button
//               type="submit"
//               className="w-full h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
//             >
//               Create Account
//             </button>

//             {/* DIVIDER */}

//             <div className="flex items-center gap-4">

//               <div className="flex-1 h-px bg-gray-200"></div>

//               <span className="text-sm text-gray-400">
//                 OR
//               </span>

//               <div className="flex-1 h-px bg-gray-200"></div>

//             </div>

//             {/* GOOGLE */}

//             <button
//               type="button"
//               className="w-full h-12 rounded-xl border border-gray-300 hover:bg-gray-50 font-medium transition"
//             >
//               Continue with Google
//             </button>

//             {/* LOGIN */}

//             <p className="text-center text-sm text-slate-500">

//               Already have an account?

//               <a
//                 href="/login"
//                 className="ml-2 text-blue-600 font-semibold hover:underline"
//               >
//                 Log In
//               </a>

//             </p>

//           </form>

//         </div>

//       </div>

//     </div>
//   );
// }