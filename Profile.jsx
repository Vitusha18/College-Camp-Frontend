import { useState } from "react";
import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  Calendar,
  MapPin,
  Edit3,
  Camera,
  Save,
  X,
} from "lucide-react";

export default function Profile() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    college: "ABC University",
    course: "Computer Science",
    year: "3rd Year",
    location: "Bengaluru, India",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <p className="text-sm font-semibold text-blue-600 mb-1">
              ACCOUNT
            </p>

            <h1 className="text-3xl font-bold text-slate-900">
              My Profile
            </h1>

            <p className="text-slate-500 mt-1">
              Manage your personal and academic information.
            </p>
          </div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">

              <button
                onClick={() => setEditing(false)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
              >
                <X size={18} />
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                <Save size={18} />
                Save Changes
              </button>

            </div>
          )}

        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

          {/* COVER */}
          <div className="h-40 bg-gradient-to-r from-blue-600 to-blue-500 relative">

            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-10 w-72 h-72 rounded-full bg-white" />
              <div className="absolute -bottom-32 left-20 w-80 h-80 rounded-full bg-white" />
            </div>

          </div>

          {/* PROFILE INFO */}
          <div className="px-6 lg:px-10 pb-8">

            <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-12 relative">

              {/* AVATAR */}
              <div className="relative">

                <div className="w-28 h-28 rounded-3xl bg-white p-1 shadow-lg">

                  <div className="w-full h-full rounded-[20px] bg-blue-100 flex items-center justify-center">
                    <User
                      size={48}
                      className="text-blue-600"
                    />
                  </div>

                </div>

                <button
                  className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center border-4 border-white hover:bg-blue-700 transition"
                  title="Change profile photo"
                >
                  <Camera size={16} />
                </button>

              </div>

              {/* NAME */}
              <div className="pb-1">

                <h2 className="text-2xl font-bold text-slate-900">
                  {profile.name}
                </h2>

                <p className="text-slate-500">
                  {profile.course} · {profile.year}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          {/* PERSONAL INFORMATION */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8">

            <div className="flex items-center gap-3 mb-7">

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <User
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Personal Information
                </h3>

                <p className="text-sm text-slate-500">
                  Your basic account details
                </p>
              </div>

            </div>

            <div className="grid sm:grid-cols-2 gap-6">

              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                {editing ? (
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                ) : (
                  <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-slate-50 text-slate-700">
                    <User size={18} className="text-slate-400" />
                    {profile.name}
                  </div>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                ) : (
                  <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-slate-50 text-slate-700 truncate">
                    <Mail size={18} className="text-slate-400 shrink-0" />
                    {profile.email}
                  </div>
                )}
              </div>

              {/* LOCATION */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location
                </label>

                {editing ? (
                  <input
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                ) : (
                  <div className="flex items-center gap-3 h-12 px-4 rounded-xl bg-slate-50 text-slate-700">
                    <MapPin size={18} className="text-slate-400" />
                    {profile.location}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* ACCOUNT STATUS */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8">

            <h3 className="text-lg font-bold text-slate-900">
              Account
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Your Campus Connect account
            </p>

            <div className="mt-6 space-y-4">

              <div className="p-4 rounded-2xl bg-green-50 border border-green-100">

                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                  Status
                </p>

                <div className="flex items-center gap-2 mt-2">

                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />

                  <span className="font-semibold text-green-700">
                    Active
                  </span>

                </div>

              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">

                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Member since
                </p>

                <div className="flex items-center gap-2 mt-2 text-slate-700">

                  <Calendar size={17} className="text-blue-600" />

                  <span className="font-semibold">
                    January 2026
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ACADEMIC INFORMATION */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8 mt-6">

          <div className="flex items-center gap-3 mb-7">

            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <GraduationCap
                size={20}
                className="text-purple-600"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Academic Information
              </h3>

              <p className="text-sm text-slate-500">
                Your current academic details
              </p>
            </div>

          </div>

          <div className="grid sm:grid-cols-3 gap-5">

            {/* COLLEGE */}
            <div className="p-5 rounded-2xl bg-slate-50">

              <div className="flex items-center gap-2 text-slate-400 mb-3">
                <GraduationCap size={18} />
                <span className="text-xs font-semibold uppercase">
                  Institution
                </span>
              </div>

              {editing ? (
                <input
                  name="college"
                  value={profile.college}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:border-blue-500"
                />
              ) : (
                <p className="font-semibold text-slate-800">
                  {profile.college}
                </p>
              )}

            </div>

            {/* COURSE */}
            <div className="p-5 rounded-2xl bg-slate-50">

              <div className="flex items-center gap-2 text-slate-400 mb-3">
                <BookOpen size={18} />
                <span className="text-xs font-semibold uppercase">
                  Course
                </span>
              </div>

              {editing ? (
                <input
                  name="course"
                  value={profile.course}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:border-blue-500"
                />
              ) : (
                <p className="font-semibold text-slate-800">
                  {profile.course}
                </p>
              )}

            </div>

            {/* YEAR */}
            <div className="p-5 rounded-2xl bg-slate-50">

              <div className="flex items-center gap-2 text-slate-400 mb-3">
                <Calendar size={18} />
                <span className="text-xs font-semibold uppercase">
                  Year
                </span>
              </div>

              {editing ? (
                <select
                  name="year"
                  value={profile.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:border-blue-500"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>5th Year</option>
                </select>
              ) : (
                <p className="font-semibold text-slate-800">
                  {profile.year}
                </p>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
