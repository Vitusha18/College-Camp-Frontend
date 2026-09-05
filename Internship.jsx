import { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  ChevronDown,
  ArrowRight,
  SlidersHorizontal,
  X,
} from "lucide-react";

const internships = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineering Intern",
    location: "Bengaluru, India",
    type: "Full-time",
    duration: "6 months",
    stipend: "₹80,000 / month",
    category: "Software Development",
    logo: "G",
    logoBg: "bg-blue-50",
    logoText: "text-blue-600",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Data Science Intern",
    location: "Hyderabad, India",
    type: "Full-time",
    duration: "6 months",
    stipend: "₹60,000 / month",
    category: "Data Science",
    logo: "M",
    logoBg: "bg-sky-50",
    logoText: "text-sky-600",
  },
  {
    id: 3,
    company: "Amazon",
    role: "Frontend Developer Intern",
    location: "Bengaluru, India",
    type: "Full-time",
    duration: "5 months",
    stipend: "₹65,000 / month",
    category: "Web Development",
    logo: "A",
    logoBg: "bg-orange-50",
    logoText: "text-orange-600",
  },
  {
    id: 4,
    company: "Deloitte",
    role: "Business Analyst Intern",
    location: "Mumbai, India",
    type: "Full-time",
    duration: "4 months",
    stipend: "₹45,000 / month",
    category: "Business",
    logo: "D",
    logoBg: "bg-green-50",
    logoText: "text-green-600",
  },
  {
    id: 5,
    company: "Adobe",
    role: "UI/UX Design Intern",
    location: "Noida, India",
    type: "Full-time",
    duration: "6 months",
    stipend: "₹50,000 / month",
    category: "Design",
    logo: "A",
    logoBg: "bg-red-50",
    logoText: "text-red-600",
  },
  {
    id: 6,
    company: "Infosys",
    role: "Software Developer Intern",
    location: "Pune, India",
    type: "Full-time",
    duration: "3 months",
    stipend: "₹30,000 / month",
    category: "Software Development",
    logo: "I",
    logoBg: "bg-purple-50",
    logoText: "text-purple-600",
  },
];

const categories = [
  "All",
  "Software Development",
  "Data Science",
  "Web Development",
  "Design",
  "Business",
];

export default function Internship() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("");
  const [saved, setSaved] = useState([]);

  const toggleSaved = (id) => {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const filteredInternships = internships.filter((internship) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      internship.role.toLowerCase().includes(searchText) ||
      internship.company.toLowerCase().includes(searchText) ||
      internship.category.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || internship.category === category;

    const matchesLocation =
      !location ||
      internship.location.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <div className="bg-white border-b border-slate-100">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            <div>
              <p className="text-sm font-semibold text-blue-600 mb-2">
                CAREER OPPORTUNITIES
              </p>

              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Find your next internship
              </h1>

              <p className="text-slate-500 mt-2 max-w-2xl">
                Discover internships from top companies and start building
                experience for your future career.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Briefcase size={18} className="text-blue-600" />
              <span>
                {internships.length} opportunities available
              </span>
            </div>

          </div>

          {/* SEARCH BAR */}
          <div className="mt-8 grid lg:grid-cols-[1fr_280px_auto] gap-3">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search internships, companies or skills..."
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition"
              />

            </div>

            <div className="relative">

              <MapPin
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full h-14 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition"
              />

            </div>

            <button
              type="button"
              className="h-14 px-6 rounded-xl bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

          </div>

        </div>

      </div>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

        {/* CATEGORY FILTER */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">

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
              Recommended internships
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {filteredInternships.length} opportunities match your search
            </p>
          </div>

          <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600">
            Sort by
            <span className="font-semibold text-slate-900">
              Relevance
            </span>
            <ChevronDown size={16} />
          </button>

        </div>

        {/* INTERNSHIP GRID */}
        {filteredInternships.length > 0 ? (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

            {filteredInternships.map((internship) => (

              <div
                key={internship.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"
              >

                {/* TOP */}
                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-4">

                    <div
                      className={`w-12 h-12 rounded-xl ${internship.logoBg} flex items-center justify-center`}
                    >
                      <span
                        className={`text-xl font-bold ${internship.logoText}`}
                      >
                        {internship.logo}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {internship.company}
                      </h3>

                      <p className="text-xs text-slate-400 mt-0.5">
                        Verified company
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() => toggleSaved(internship.id)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                      saved.includes(internship.id)
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-50 text-slate-400 hover:text-blue-600"
                    }`}
                    title="Save internship"
                  >
                    <Bookmark
                      size={18}
                      fill={
                        saved.includes(internship.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>

                </div>

                {/* ROLE */}
                <div className="mt-6">

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {internship.role}
                  </h3>

                  <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                    <MapPin size={16} />
                    {internship.location}
                  </div>

                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mt-5">

                  <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold">
                    {internship.category}
                  </span>

                  <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold">
                    {internship.type}
                  </span>

                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-2 gap-3 mt-5">

                  <div className="p-3 rounded-xl bg-slate-50">

                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock size={14} />
                      <span className="text-xs">
                        Duration
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-700 mt-1">
                      {internship.duration}
                    </p>

                  </div>

                  <div className="p-3 rounded-xl bg-green-50">

                    <p className="text-xs text-green-600">
                      Stipend
                    </p>

                    <p className="text-sm font-bold text-green-700 mt-1">
                      {internship.stipend}
                    </p>

                  </div>

                </div>

                {/* BUTTON */}
                <button
                  type="button"
                  className="w-full mt-5 h-11 rounded-xl border border-slate-200 text-blue-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                >
                  View Internship
                  <ArrowRight size={17} />
                </button>

              </div>

            ))}

          </div>

        ) : (

          /* EMPTY STATE */
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">

            <div className="w-16 h-16 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center">
              <Search size={28} className="text-slate-400" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-5">
              No internships found
            </h3>

            <p className="text-slate-500 mt-2">
              Try changing your search or category filters.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setLocation("");
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