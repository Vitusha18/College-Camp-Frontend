
import React,{useState} from "react";
import {Link} from "react-router-dom";
import {Mail,Lock,Eye,EyeOff} from "lucide-react";
import loginImg from "../assets/register.png";

export default function Login(){
 const [show,setShow]=useState(false);

 return(
 <div className="min-h-screen bg-slate-50">
  

  <div className="grid lg:grid-cols-[45%_55%] min-h-[calc(100vh-80px)]">
   <div className="hidden lg:block">
    <img src={loginImg} alt="Login" className="w-full h-full object-cover object-center"/>
   </div>

   <div className="flex items-center justify-center p-8">
    <div className="w-full max-w-[450px] bg-white rounded-3xl shadow-xl border p-7">
      <h2 className="text-4xl font-bold text-center">Welcome Back</h2>
      <p className="text-center text-gray-500 mt-2 mb-8">Login to continue to Campus Connect</p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <div className="flex items-center border rounded-xl h-11 px-4">
            <Mail size={18} className="text-gray-400"/>
            <input type="email" placeholder="Enter your email" className="ml-3 w-full outline-none"/>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="flex items-center border rounded-xl h-11 px-4">
            <Lock size={18} className="text-gray-400"/>
            <input type={show?"text":"password"} placeholder="Enter password" className="ml-3 w-full outline-none"/>
            <button type="button" onClick={()=>setShow(!show)}>
              {show?<EyeOff size={18}/>:<Eye size={18}/>}
            </button>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-600"/>
            Remember me
          </label>
          <Link to="/forgot-password" className="text-blue-600">Forgot Password?</Link>
        </div>

        <button className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          Login
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"/>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"/>
        </div>

        <button type="button" className="w-full h-11 border rounded-xl hover:bg-gray-50">
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?
          <Link to="/register" className="ml-2 text-blue-600 font-semibold">Register</Link>
        </p>
      </form>
    </div>
   </div>
  </div>
 </div>
 );
}
