import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CampusEvent } from '../../types';
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Users,
  CheckCircle2,
  Ticket,
  Search,
  SlidersHorizontal,
  Sparkles,
  QrCode,
  X,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Workshops',
  'Hackathons',
  'Seminars',
  'Competitions',
] as const;

const eventDateParts = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return {
    day: String(date.getDate()),
    month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
  };
};

export const EventsHub: React.FC = () => {
  const { events, toggleEventRegistration, userProfile, searchQuery } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedPassEvent, setSelectedPassEvent] = useState<CampusEvent | null>(null);

  const registeredEvents = useMemo(() => {
    return events.filter((e) => e.isRegistered);
  }, [events]);

  const filteredEvents = useMemo(() => {
    const query = (search || searchQuery).trim().toLowerCase();
    return events.filter((evt) => {
      const matchesCategory =
        selectedCategory === 'All' || evt.category === selectedCategory;
      const matchesSearch =
        query === '' ||
        evt.title.toLowerCase().includes(query) ||
        evt.venue.toLowerCase().includes(query) ||
        evt.organizer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, search, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Campus Events & Hackathons</h2>
          <p className="text-xs text-slate-500">
            Register for technical workshops, annual hackathons, seminars, and club competitions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
            🎟️ <strong className="text-teal-600 font-bold">{registeredEvents.length}</strong> Registered Passes
          </span>
        </div>
      </div>

      {/* Category Filter Pills matching UI screenshot */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Left 8 Cols (Events List) + Right 4 Cols (My Registrations) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
              <Calendar className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-600">No events found</p>
              <p className="text-xs text-slate-400 mt-1">Try switching categories or clearing search filters.</p>
            </div>
          ) : (
            filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-teal-200 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4 min-w-0">
                  {/* Date Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex flex-col items-center justify-center text-teal-700 shrink-0 group-hover:scale-105 transition-transform">
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      {eventDateParts(evt.date)?.month || evt.date.split(' ')[1] || 'MAY'}
                    </span>
                    <span className="text-lg font-black leading-tight">
                      {eventDateParts(evt.date)?.day || evt.date.split(' ')[0] || '18'}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                        {evt.title}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 shrink-0">
                        {evt.category}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      {evt.organizer}
                    </p>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {evt.date} • {evt.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {evt.venue}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {evt.registeredCount}/{evt.maxAttendees} seats
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {evt.isRegistered ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedPassEvent(evt)}
                        className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 transition-colors text-xs font-bold flex items-center gap-1.5"
                        title="View QR Entry Pass"
                      >
                        <QrCode className="w-4 h-4" />
                        View Pass
                      </button>
                      <button
                        onClick={() => toggleEventRegistration(evt.id)}
                        className="text-xs text-rose-500 hover:underline p-1"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleEventRegistration(evt.id)}
                      className="text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-600/20 px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Register
                    </button>
                  )}

                  <span className="text-[10px] text-slate-400">
                    Reg Closes: {evt.registrationDeadline}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: My Registrations */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-teal-600" /> My Registrations
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                {registeredEvents.length} Active
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {registeredEvents.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">
                  You haven't registered for any campus events yet.
                </p>
              ) : (
                registeredEvents.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-3.5 rounded-xl border border-teal-100 bg-teal-50/40 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {reg.title}
                      </h4>
                      <p className="text-[11px] text-teal-800 font-medium mt-0.5">
                        {reg.date} • {reg.venue.split(',')[0]}
                      </p>
                      <span className="text-[10px] font-bold text-teal-700 bg-white border border-teal-200 px-2 py-0.5 rounded-md inline-block mt-2">
                        Confirmed Entry
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedPassEvent(reg)}
                      className="p-2 rounded-xl bg-white border border-teal-200 text-teal-700 hover:bg-teal-50 shadow-2xs shrink-0"
                      title="View Digital QR Pass"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* QR Digital Pass Modal */}
      {selectedPassEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setSelectedPassEvent(null)} />

          <div className="relative bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 text-center">
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white p-5 relative">
              <button
                onClick={() => setSelectedPassEvent(null)}
                className="absolute top-3 right-3 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-300">
                Official Campus Entry Pass
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                {selectedPassEvent.title}
              </h3>
            </div>

            {/* QR Section */}
            <div className="p-6 space-y-4">
              <div className="w-44 h-44 mx-auto bg-slate-50 border-2 border-dashed border-teal-200 rounded-2xl flex flex-col items-center justify-center p-4">
                {/* Visual stylized QR code placeholder */}
                <div className="grid grid-cols-5 gap-1.5 w-32 h-32 p-2 bg-white rounded-xl shadow-xs">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        i % 2 === 0 || i % 5 === 0 ? 'bg-slate-900' : 'bg-teal-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-900">{userProfile.name} ({userProfile.rollNumber})</p>
                <p>{selectedPassEvent.date} • {selectedPassEvent.time}</p>
                <p className="font-medium text-teal-700">{selectedPassEvent.venue}</p>
              </div>

              <p className="text-[10px] text-slate-400">
                Show this barcode at the registration desk for instant entry.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
