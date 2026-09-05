import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Bell,
  Lock,
  Globe,
  Mail,
  ShieldCheck,
  ChevronRight,
  Check,
  RotateCcw,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [deadlineNotifications, setDeadlineNotifications] = useState(true);
  const [eventNotifications, setEventNotifications] = useState(true);

  const [language, setLanguage] = useState("English");

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const resetNotifications = () => {
    setEmailNotifications(true);
    setDeadlineNotifications(true);
    setEventNotifications(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-7">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Bell
                size={23}
                className="text-blue-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Settings
              </h1>

              <p className="text-slate-500 mt-1">
                Manage your account and preferences
              </p>
            </div>

          </div>

        </div>
      </header>


      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-8">

        <div className="grid lg:grid-cols-[230px_1fr] gap-8">

          {/* SIDEBAR */}
          <aside className="hidden lg:block">

            <div className="bg-white border border-slate-100 rounded-2xl p-2 sticky top-6">

              <button
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                  font-semibold
                  text-sm
                "
              >
                <Bell size={18} />
                Notifications
              </button>


              <button
                onClick={() => navigate("/profile")}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-slate-500
                  hover:bg-slate-50
                  hover:text-slate-900
                  text-sm
                  transition
                "
              >
                <User size={18} />
                Account
              </button>


              <button
                onClick={() => {
                  document
                    .getElementById("security")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-slate-500
                  hover:bg-slate-50
                  hover:text-slate-900
                  text-sm
                  transition
                "
              >
                <Lock size={18} />
                Security
              </button>

            </div>

          </aside>


          {/* SETTINGS CONTENT */}
          <div className="space-y-6">


            {/* NOTIFICATIONS */}
            <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden">

              <div className="p-6 border-b border-slate-100">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Bell
                      size={19}
                      className="text-blue-600"
                    />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Notifications
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Choose which notifications you want to receive
                    </p>

                  </div>

                </div>

              </div>


              <div className="divide-y divide-slate-100">

                {/* EMAIL */}
                <SettingToggle
                  icon={<Mail size={18} />}
                  iconBg="bg-green-50"
                  iconColor="text-green-600"
                  title="Email notifications"
                  description="Receive important updates and announcements"
                  enabled={emailNotifications}
                  setEnabled={setEmailNotifications}
                />


                {/* DEADLINES */}
                <SettingToggle
                  icon={<Bell size={18} />}
                  iconBg="bg-red-50"
                  iconColor="text-red-500"
                  title="Deadline reminders"
                  description="Get reminders before assignments are due"
                  enabled={deadlineNotifications}
                  setEnabled={setDeadlineNotifications}
                />


                {/* EVENTS */}
                <SettingToggle
                  icon={<Globe size={18} />}
                  iconBg="bg-orange-50"
                  iconColor="text-orange-500"
                  title="Campus events"
                  description="Get notified about upcoming campus events"
                  enabled={eventNotifications}
                  setEnabled={setEventNotifications}
                />

              </div>


              {/* RESET */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">

                <button
                  onClick={resetNotifications}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-500
                    hover:text-blue-600
                    transition
                  "
                >
                  <RotateCcw size={15} />
                  Reset notification settings
                </button>

              </div>

            </section>



            {/* LANGUAGE */}
            <section className="bg-white rounded-2xl border border-slate-100">

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                      <Globe
                        size={19}
                        className="text-purple-600"
                      />
                    </div>

                    <div>

                      <h2 className="font-semibold text-slate-900">
                        Language
                      </h2>

                      <p className="text-sm text-slate-400 mt-1">
                        Choose your preferred language
                      </p>

                    </div>

                  </div>


                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value)
                    }
                    className="
                      border
                      border-slate-200
                      rounded-xl
                      px-4
                      py-2.5
                      bg-white
                      text-sm
                      text-slate-700
                      outline-none
                      focus:ring-2
                      focus:ring-blue-100
                      focus:border-blue-400
                    "
                  >
                    <option>English</option>
                    <option>Hindi</option>
                  </select>

                </div>

              </div>

            </section>



            {/* ACCOUNT */}
            <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden">

              <div className="p-6 border-b border-slate-100">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <User
                      size={19}
                      className="text-indigo-600"
                    />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Account
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Manage your personal information
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-2">

                {/* PROFILE */}
                <button
                  onClick={() => navigate("/profile")}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-xl
                    hover:bg-slate-50
                    transition
                  "
                >

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <User
                        size={18}
                        className="text-slate-500"
                      />
                    </div>

                    <div className="text-left">

                      <p className="font-semibold text-slate-900">
                        Personal information
                      </p>

                      <p className="text-sm text-slate-400 mt-1">
                        View and update your profile
                      </p>

                    </div>

                  </div>

                  <ChevronRight
                    size={19}
                    className="text-slate-400"
                  />

                </button>


                {/* SECURITY */}
                <button
                  onClick={() => {
                    document
                      .getElementById("security")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-xl
                    hover:bg-slate-50
                    transition
                  "
                >

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <ShieldCheck
                        size={18}
                        className="text-green-600"
                      />
                    </div>

                    <div className="text-left">

                      <p className="font-semibold text-slate-900">
                        Privacy & Security
                      </p>

                      <p className="text-sm text-slate-400 mt-1">
                        Manage password and account security
                      </p>

                    </div>

                  </div>

                  <ChevronRight
                    size={19}
                    className="text-slate-400"
                  />

                </button>

              </div>

            </section>



            {/* SECURITY */}
            <section
              id="security"
              className="bg-white rounded-2xl border border-slate-100"
            >

              <div className="p-6">

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                    <Lock
                      size={19}
                      className="text-green-600"
                    />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Security
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Keep your Campus Connect account secure
                    </p>

                  </div>

                </div>


                <div className="mt-6 grid sm:grid-cols-2 gap-4">

                  <button
                    onClick={() =>
                      alert(
                        "Password change page will be connected here."
                      )
                    }
                    className="
                      p-4
                      text-left
                      rounded-xl
                      border
                      border-slate-200
                      hover:border-blue-300
                      hover:bg-blue-50/40
                      transition
                    "
                  >

                    <p className="font-semibold text-slate-900">
                      Change password
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      Update your account password
                    </p>

                  </button>


                  <button
                    onClick={() =>
                      alert(
                        "Active sessions management will be connected here."
                      )
                    }
                    className="
                      p-4
                      text-left
                      rounded-xl
                      border
                      border-slate-200
                      hover:border-blue-300
                      hover:bg-blue-50/40
                      transition
                    "
                  >

                    <p className="font-semibold text-slate-900">
                      Active sessions
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      Manage devices logged into your account
                    </p>

                  </button>

                </div>

              </div>

            </section>



            {/* SAVE */}
            <div className="flex justify-end">

              <button
                onClick={handleSave}
                className="
                  px-6
                  h-11
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-semibold
                  flex
                  items-center
                  gap-2
                  shadow-lg
                  shadow-blue-600/20
                  transition
                "
              >

                {saved ? (
                  <>
                    <Check size={18} />
                    Changes Saved
                  </>
                ) : (
                  "Save Changes"
                )}

              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}



/* =====================================================
   TOGGLE COMPONENT
===================================================== */

function SettingToggle({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  enabled,
  setEnabled,
}) {
  return (
    <div className="p-6 flex items-center justify-between gap-5">

      <div className="flex items-center gap-4">

        <div
          className={`w-11 h-11 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center`}
        >
          {icon}
        </div>

        <div>

          <p className="font-semibold text-slate-900">
            {title}
          </p>

          <p className="text-sm text-slate-400 mt-1">
            {description}
          </p>

        </div>

      </div>


      {/* TOGGLE */}
      <button
        onClick={() => setEnabled(!enabled)}
        aria-label={`Toggle ${title}`}
        className={`relative flex-shrink-0 w-12 h-7 rounded-full transition ${
          enabled
            ? "bg-blue-600"
            : "bg-slate-200"
        }`}
      >

        <span
          className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}