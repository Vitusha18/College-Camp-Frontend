import { useState } from "react";
import {
  Bell,
  Calendar,
  Briefcase,
  GraduationCap,
  BookOpen,
  Check,
  Trash2,
  Settings,
  Clock,
} from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "deadline",
      title: "DBMS Assignment is due today",
      message: "Your DBMS assignment deadline is today at 11:59 PM.",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "internship",
      title: "New internship opportunity",
      message: "A Software Engineering Internship matches your profile.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "event",
      title: "Tech Talk: AI in Everyday Life",
      message: "The event is scheduled for May 22 at 3:00 PM.",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: 4,
      type: "scholarship",
      title: "New scholarship available",
      message: "You may be eligible for the National Student Scholarship.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 5,
      type: "course",
      title: "Study Planner updated",
      message: "Your Study Operating Systems task has been updated.",
      time: "Yesterday",
      unread: false,
    },
  ]);

  const [filter, setFilter] = useState("All");

  const getIcon = (type) => {
    switch (type) {
      case "deadline":
        return {
          icon: <Clock size={20} />,
          bg: "bg-red-50",
          color: "text-red-500",
        };

      case "internship":
        return {
          icon: <Briefcase size={20} />,
          bg: "bg-green-50",
          color: "text-green-600",
        };

      case "event":
        return {
          icon: <Calendar size={20} />,
          bg: "bg-orange-50",
          color: "text-orange-500",
        };

      case "scholarship":
        return {
          icon: <GraduationCap size={20} />,
          bg: "bg-purple-50",
          color: "text-purple-600",
        };

      default:
        return {
          icon: <BookOpen size={20} />,
          bg: "bg-blue-50",
          color: "text-blue-600",
        };
    }
  };

  const markAsRead = (id) => {
    setNotifications((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, unread: false }
          : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((items) =>
      items.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  const filteredNotifications =
    filter === "Unread"
      ? notifications.filter((item) => item.unread)
      : notifications;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-7">

          <div className="flex items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Bell
                  size={23}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Notifications
                </h1>

                <p className="text-slate-500 mt-1">
                  Stay updated with everything happening on your campus
                </p>
              </div>

            </div>

            {/* SETTINGS BUTTON */}

            <button
              onClick={() =>
                window.location.href = "/settings"
              }
              className="
                hidden
                sm:flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                text-sm
                font-medium
                hover:bg-slate-50
                transition
              "
            >
              <Settings size={17} />
              Notification settings
            </button>

          </div>

        </div>
      </header>


      {/* MAIN */}

      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-8">

        {/* TOP SUMMARY */}

        <div className="grid sm:grid-cols-3 gap-4 mb-6">

          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Total notifications
            </p>

            <p className="text-3xl font-bold text-slate-900 mt-2">
              {notifications.length}
            </p>
          </div>


          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Unread
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {unreadCount}
            </p>
          </div>


          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Status
            </p>

            <p className="text-lg font-semibold text-green-600 mt-3">
              All caught up
            </p>
          </div>

        </div>


        {/* NOTIFICATION CARD */}

        <section className="bg-white border border-slate-100 rounded-2xl overflow-hidden">

          {/* TOOLBAR */}

          <div className="p-5 border-b border-slate-100">

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div className="flex gap-2">

                <button
                  onClick={() => setFilter("All")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === "All"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  All
                </button>

                <button
                  onClick={() => setFilter("Unread")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === "Unread"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Unread
                  {unreadCount > 0 && (
                    <span className="ml-2">
                      {unreadCount}
                    </span>
                  )}
                </button>

              </div>


              <div className="flex items-center gap-3">

                <button
                  onClick={markAllAsRead}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-blue-600
                    hover:text-blue-700
                    font-medium
                  "
                >
                  <Check size={16} />
                  Mark all as read
                </button>

                <button
                  onClick={clearAll}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-400
                    hover:text-red-500
                    font-medium
                  "
                >
                  <Trash2 size={16} />
                  Clear all
                </button>

              </div>

            </div>

          </div>


          {/* NOTIFICATIONS */}

          {filteredNotifications.length > 0 ? (

            <div className="divide-y divide-slate-100">

              {filteredNotifications.map((notification) => {

                const icon = getIcon(notification.type);

                return (
                  <div
                    key={notification.id}
                    className={`
                      group
                      relative
                      p-5
                      flex
                      items-start
                      gap-4
                      transition
                      hover:bg-slate-50
                      ${
                        notification.unread
                          ? "bg-blue-50/30"
                          : "bg-white"
                      }
                    `}
                  >

                    {/* UNREAD DOT */}

                    {notification.unread && (
                      <span className="absolute left-2 top-9 w-2 h-2 rounded-full bg-blue-600" />
                    )}


                    {/* ICON */}

                    <div
                      className={`
                        w-11
                        h-11
                        flex-shrink-0
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        ${icon.bg}
                        ${icon.color}
                      `}
                    >
                      {icon.icon}
                    </div>


                    {/* CONTENT */}

                    <div className="flex-1 min-w-0">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h3
                            className={`text-sm ${
                              notification.unread
                                ? "font-bold text-slate-900"
                                : "font-semibold text-slate-700"
                            }`}
                          >
                            {notification.title}
                          </h3>

                          <p className="text-sm text-slate-500 mt-1 leading-6">
                            {notification.message}
                          </p>

                          <p className="text-xs text-slate-400 mt-2">
                            {notification.time}
                          </p>

                        </div>


                        {/* ACTIONS */}

                        <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">

                          {notification.unread && (
                            <button
                              onClick={() =>
                                markAsRead(notification.id)
                              }
                              title="Mark as read"
                              className="
                                w-9
                                h-9
                                rounded-lg
                                flex
                                items-center
                                justify-center
                                bg-white
                                border
                                border-slate-200
                                text-slate-400
                                hover:text-blue-600
                                hover:border-blue-200
                              "
                            >
                              <Check size={17} />
                            </button>
                          )}

                          <button
                            onClick={() =>
                              deleteNotification(notification.id)
                            }
                            title="Delete"
                            className="
                              w-9
                              h-9
                              rounded-lg
                              flex
                              items-center
                              justify-center
                              bg-white
                              border
                              border-slate-200
                              text-slate-400
                              hover:text-red-500
                              hover:border-red-200
                            "
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          ) : (

            /* EMPTY STATE */

            <div className="py-20 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center">
                <Bell
                  size={28}
                  className="text-blue-500"
                />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-5">
                No notifications
              </h3>

              <p className="text-sm text-slate-400 mt-2">
                You're all caught up!
              </p>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}