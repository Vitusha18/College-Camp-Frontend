import { useState } from "react";

import {
  Search,
  MapPin,
  GraduationCap,
  Calendar,
  Bookmark,
  ArrowRight,
  CheckCircle2,
  X,
  Trophy,
  Sparkles,
  BookOpen,
  IndianRupee,
  Award,
} from "lucide-react";

const scholarships = [
  {
    id: 1,
    name: "Reliance Foundation Scholarship",
    organization: "Reliance Foundation",
    amount: "₹2,00,000",
    deadline: "October 15, 2026",
    eligibility: "Undergraduate Students",
    location: "India",
    category: "Undergraduate",
    logo: "R",
    logoBg: "bg-blue-50",
    logoText: "text-blue-600",
  },
  {
    id: 2,
    name: "Tata Scholarship",
    organization: "Tata Education Trust",
    amount: "₹1,50,000",
    deadline: "November 10, 2026",
    eligibility: "UG & PG Students",
    location: "India",
    category: "All Students",
    logo: "T",
    logoBg: "bg-orange-50",
    logoText: "text-orange-600",
  },
  {
    id: 3,
    name: "Google Generation Scholarship",
    organization: "Google",
    amount: "₹1,00,000",
    deadline: "September 30, 2026",
    eligibility: "Technology Students",
    location: "India",
    category: "Technology",
    logo: "G",
    logoBg: "bg-green-50",
    logoText: "text-green-600",
  },
  {
    id: 4,
    name: "HDFC Educational Scholarship",
    organization: "HDFC Bank",
    amount: "₹75,000",
    deadline: "December 5, 2026",
    eligibility: "Undergraduate Students",
    location: "India",
    category: "Undergraduate",
    logo: "H",
    logoBg: "bg-purple-50",
    logoText: "text-purple-600",
  },
  {
    id: 5,
    name: "Aditya Birla Scholarship",
    organization: "Aditya Birla Group",
    amount: "₹1,80,000",
    deadline: "October 28, 2026",
    eligibility: "Management Students",
    location: "India",
    category: "Management",
    logo: "A",
    logoBg: "bg-red-50",
    logoText: "text-red-600",
  },
  {
    id: 6,
    name: "Women in STEM Scholarship",
    organization: "STEM Foundation",
    amount: "₹1,20,000",
    deadline: "November 25, 2026",
    eligibility: "Women in STEM",
    location: "India",
    category: "STEM",
    logo: "S",
    logoBg: "bg-pink-50",
    logoText: "text-pink-600",
  },
];

const categories = [
  "All",
  "Undergraduate",
  "Technology",
  "Management",
  "STEM",
];

export default function Scholarship() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState([]);

  const toggleSaved = (id) => {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const filteredScholarships = scholarships.filter((scholarship) => {
    const text = search.toLowerCase();

    const matchesSearch =
      scholarship.name.toLowerCase().includes(text) ||
      scholarship.organization.toLowerCase().includes(text) ||
      scholarship.eligibility.toLowerCase().includes(text);

    const matchesCategory =
      category === "All" ||
      scholarship.category === category ||
      (category === "All Students" &&
        scholarship.category === "All Students");

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO / GRAPHICS SECTION
      ===================================================== */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100">

        {/* Background decorative shapes */}
        <div className="absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-blue-100 opacity-60 blur-3xl" />

        <div className="absolute -bottom-40 left-[35%] w-[350px] h-[350px] rounded-full bg-purple-100 opacity-50 blur-3xl" />

        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-50" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12">

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">

            {/* ================= LEFT CONTENT ================= */}

            <div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">

                <Sparkles size={16} />

                FUND YOUR EDUCATION

              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-slate-900 leading-[1.05] tracking-tight">

                Scholarships that

                <span className="block text-blue-600 mt-2">
                  move you forward.
                </span>

              </h1>

              {/* Description */}
              <p className="text-lg text-slate-500 mt-6 max-w-xl leading-relaxed">

                Discover financial opportunities from leading
                organizations and turn your academic goals into reality.

              </p>

              {/* Search */}
              <div className="relative mt-8 max-w-2xl">

                <Search
                  size={21}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search scholarships, organizations or eligibility..."
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                />

              </div>

              {/* ================= STATS ================= */}

              <div className="grid grid-cols-3 gap-3 mt-8 max-w-2xl">

                {/* Stat 1 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">

                  <div className="flex items-center gap-2 text-blue-600">

                    <IndianRupee size={18} />

                    <span className="text-[10px] sm:text-xs font-bold">
                      AVAILABLE
                    </span>

                  </div>

                  <p className="text-xl font-bold text-slate-900 mt-2">
                    ₹10L+
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Funding
                  </p>

                </div>

                {/* Stat 2 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">

                  <div className="flex items-center gap-2 text-purple-600">

                    <Award size={18} />

                    <span className="text-[10px] sm:text-xs font-bold">
                      SCHOLARSHIPS
                    </span>

                  </div>

                  <p className="text-xl font-bold text-slate-900 mt-2">
                    120+
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Verified
                  </p>

                </div>

                {/* Stat 3 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">

                  <div className="flex items-center gap-2 text-green-600">

                    <Trophy size={18} />

                    <span className="text-[10px] sm:text-xs font-bold">
                      STUDENTS
                    </span>

                  </div>

                  <p className="text-xl font-bold text-slate-900 mt-2">
                    5K+
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Supported
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT GRAPHIC
            ================================================= */}

            <div className="relative hidden lg:block h-[410px]">

              {/* Main graphic container */}
              <div className="absolute inset-4 rounded-[42px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 border border-white shadow-2xl overflow-hidden">

                {/* Decorative circle */}
                <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-blue-200 opacity-40" />

                <div className="absolute -bottom-28 -left-20 w-72 h-72 rounded-full bg-purple-200 opacity-40" />

                {/* Small decorative dots */}
                <div className="absolute top-10 left-12 grid grid-cols-3 gap-2">

                  <span className="w-2 h-2 rounded-full bg-blue-300" />
                  <span className="w-2 h-2 rounded-full bg-blue-200" />
                  <span className="w-2 h-2 rounded-full bg-blue-300" />

                  <span className="w-2 h-2 rounded-full bg-blue-200" />
                  <span className="w-2 h-2 rounded-full bg-blue-300" />
                  <span className="w-2 h-2 rounded-full bg-blue-200" />

                </div>

                {/* Main graduation icon */}

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                  <div className="relative">

                    {/* Glow */}
                    <div className="absolute inset-0 rounded-[40px] bg-blue-300 blur-2xl opacity-30" />

                    {/* Icon card */}
                    <div className="relative w-36 h-36 rounded-[38px] bg-white shadow-2xl flex items-center justify-center rotate-3">

                      <GraduationCap
                        size={76}
                        strokeWidth={1.5}
                        className="text-blue-600"
                      />

                    </div>

                  </div>

                </div>

                {/* ================= FLOATING CARD 1 ================= */}

                <div className="absolute top-8 left-6 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">

                    <IndianRupee
                      size={20}
                      className="text-green-600"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Award amount
                    </p>

                    <p className="font-bold text-slate-900">
                      ₹2,00,000
                    </p>

                  </div>

                </div>

                {/* ================= FLOATING CARD 2 ================= */}

                <div className="absolute bottom-8 right-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">

                    <Trophy
                      size={20}
                      className="text-purple-600"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Students selected
                    </p>

                    <p className="font-bold text-slate-900">
                      500+ this year
                    </p>

                  </div>

                </div>

                {/* ================= FLOATING BOOK ================= */}

                <div className="absolute top-16 right-8 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center rotate-6">

                  <BookOpen
                    size={25}
                    className="text-blue-600"
                  />

                </div>

                {/* ================= FLOATING AWARD ================= */}

                <div className="absolute bottom-20 left-8 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center -rotate-6">

                  <Award
                    size={22}
                    className="text-orange-500"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

        {/* CATEGORY FILTER */}

        <div className="flex gap-2 overflow-x-auto pb-2">

          {categories.map((item) => (

            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                category === item
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-blue-600"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

        {/* RESULT HEADER */}

        <div className="flex items-center justify-between mt-8 mb-5">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Recommended scholarships
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {filteredScholarships.length} opportunities match your search
            </p>

          </div>

        </div>

        {/* SCHOLARSHIP GRID */}

        {filteredScholarships.length > 0 ? (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

            {filteredScholarships.map((scholarship) => (

              <div
                key={scholarship.id}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"
              >

                {/* CARD TOP */}

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-4">

                    <div
                      className={`w-12 h-12 rounded-xl ${scholarship.logoBg} flex items-center justify-center`}
                    >

                      <span
                        className={`text-xl font-bold ${scholarship.logoText}`}
                      >
                        {scholarship.logo}
                      </span>

                    </div>

                    <div>

                      <h3 className="font-bold text-slate-900">
                        {scholarship.organization}
                      </h3>

                      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">

                        <CheckCircle2 size={13} />

                        Verified

                      </div>

                    </div>

                  </div>

                  {/* BOOKMARK */}

                  <button
                    onClick={() => toggleSaved(scholarship.id)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                      saved.includes(scholarship.id)
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-50 text-slate-400 hover:text-blue-600"
                    }`}
                    title="Save scholarship"
                  >

                    <Bookmark
                      size={18}
                      fill={
                        saved.includes(scholarship.id)
                          ? "currentColor"
                          : "none"
                      }
                    />

                  </button>

                </div>

                {/* TITLE */}

                <div className="mt-6">

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {scholarship.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-3">

                    <MapPin size={16} />

                    {scholarship.location}

                  </div>

                </div>

                {/* AMOUNT */}

                <div className="mt-5 p-4 rounded-xl bg-green-50">

                  <p className="text-xs text-green-600 font-medium">
                    Scholarship Amount
                  </p>

                  <p className="text-2xl font-bold text-green-700 mt-1">
                    {scholarship.amount}
                  </p>

                </div>

                {/* DETAILS */}

                <div className="space-y-3 mt-5">

                  <div className="flex items-center justify-between gap-3 text-sm">

                    <span className="text-slate-400">
                      Eligibility
                    </span>

                    <span className="font-medium text-slate-700 text-right">
                      {scholarship.eligibility}
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm">

                    <span className="text-slate-400 flex items-center gap-1.5">

                      <Calendar size={15} />

                      Deadline

                    </span>

                    <span className="font-semibold text-red-500 text-right">
                      {scholarship.deadline}
                    </span>

                  </div>

                </div>

                {/* VIEW BUTTON */}

                <button
                  type="button"
                  className="w-full mt-6 h-11 rounded-xl border border-slate-200 text-blue-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                >

                  View Scholarship

                  <ArrowRight
                    size={17}
                    className="group-hover:translate-x-1 transition"
                  />

                </button>

              </div>

            ))}

          </div>

        ) : (

          /* EMPTY STATE */

          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">

            <div className="w-16 h-16 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center">

              <Search
                size={28}
                className="text-slate-400"
              />

            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-5">
              No scholarships found
            </h3>

            <p className="text-slate-500 mt-2">
              Try changing your search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold"
            >

              <X size={17} />

              Clear filters

            </button>

          </div>

        )}

      </main>

    </div>
  );
}