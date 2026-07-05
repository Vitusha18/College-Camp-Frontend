
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


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import registerImg from "../assets/register.png";
import { registerUser } from "../services/user";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return alert("Please fill all fields.");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      setLoading(true);

      await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  
  console.log(handleSubmit,"DATA SUCCESS");
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid lg:grid-cols-[45%_55%] min-h-[calc(100vh-80px)]">
        <div className="hidden lg:block">
          <img
            src={registerImg}
            alt="Campus"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-[450px] bg-white rounded-3xl shadow-xl border p-7">
            <h2 className="text-4xl font-bold text-center">
              Create Account
            </h2>

            <p className="text-center text-gray-500 mt-2 mb-6">
              Register to continue to CampusConnect
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  icon={<User size={18} />}
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />

                <Field
                  icon={<User size={18} />}
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <Field
                icon={<Mail size={18} />}
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <PasswordField
                label="Password"
                name="password"
                value={formData.password}
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                onChange={handleChange}
              />

              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                show={showConfirm}
                toggle={() => setShowConfirm(!showConfirm)}
                onChange={handleChange}
              />

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" required className="accent-blue-600" />
                I agree to the
                <span className="text-blue-600 font-medium">
                  Terms & Conditions
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-gray-400 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <button
                type="button"
                className="w-full h-11 border rounded-xl hover:bg-gray-50"
              >
                Continue with Google
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?
                <Link
                  to="/login"
                  className="ml-2 text-blue-600 font-semibold"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="block mb-2 font-medium text-sm">{label}</label>

      <div className="flex items-center border rounded-xl h-11 px-4">
        <span className="text-gray-400">{icon}</span>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          className="ml-3 w-full outline-none"
        />
      </div>
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  show,
  toggle,
  onChange,
}) {
  return (
    <div>
      <label className="block mb-2 font-medium text-sm">{label}</label>

      <div className="flex items-center border rounded-xl h-11 px-4">
        <Lock size={18} className="text-gray-400" />

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          className="ml-3 w-full outline-none"
        />

        <button type="button" onClick={toggle}>
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}