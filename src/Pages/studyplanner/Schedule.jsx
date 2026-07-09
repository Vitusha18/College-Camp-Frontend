import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Clock, 
  MapPin, 
  Tag, 
  Trash2 
} from 'lucide-react';

export default function Schedule() {
  const [currentView, setCurrentView] = useState('Day');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Modal State for adding events
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('7:00 PM – 8:15 PM');
  const [newEventCode, setNewEventCode] = useState('CS 305 • Tech Center 201 • Prof. Davis');
  const [newEventColorType, setNewEventColorType] = useState('emerald');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Navigation handlers
  const handlePrev = () => {
    if (currentView === 'Month') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (currentView === 'Week') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  const handleNext = () => {
    if (currentView === 'Month') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (currentView === 'Week') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  // Helper to generate mini calendar matrix
  const generateCalendarMatrix = (year, month) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevTotalDays = new Date(year, month, 0).getDate();

    const matrix = [];
    let week = [];
    let dayCount = 1;
    let nextMonthDay = 1;
    const totalCells = 42; 

    for (let i = 0; i < totalCells; i++) {
      if (i < firstDayIndex) {
        const prevDay = prevTotalDays - firstDayIndex + i + 1;
        week.push({ day: prevDay, isCurrentMonth: false, dateObj: new Date(year, month - 1, prevDay) });
      } else if (dayCount <= totalDays) {
        week.push({ day: dayCount, isCurrentMonth: true, dateObj: new Date(year, month, dayCount) });
        dayCount++;
      } else {
        week.push({ day: nextMonthDay, isCurrentMonth: false, dateObj: new Date(year, month + 1, nextMonthDay) });
        nextMonthDay++;
      }
      if (week.length === 7) {
        matrix.push(week);
        week = [];
      }
    }
    return matrix;
  };

  const calendarMatrix = generateCalendarMatrix(year, month);

  // Added unique IDs for deletion support
  const [scheduleItems, setScheduleItems] = useState([
    {
      id: 1,
      time: '8 AM – 9:15 AM',
      title: 'Data Structures & Algorithms',
      code: 'CS 201 • Science Hall 101 • Dr. Smith',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      dotColor: 'bg-emerald-500'
    },
    {
      id: 2,
      time: '10 AM – 11:15 AM',
      title: 'Computer Architecture',
      code: 'CS 250 • Tech Center 302 • Dr. Allen',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
      dotColor: 'bg-indigo-500'
    },
    {
      id: 3,
      time: '11:30 AM – 12:45 PM',
      title: 'Discrete Mathematics for CS',
      code: 'CS 215 • Science Hall 108 • Prof. Vance',
      color: 'bg-amber-50 border-amber-200 text-amber-900',
      dotColor: 'bg-amber-400'
    },
    {
      id: 4,
      time: '1 PM – 2:45 PM',
      title: 'Database Systems',
      code: 'CS 310 • Science Hall 105 • Dr. Patel',
      color: 'bg-sky-50 border-sky-200 text-sky-900',
      dotColor: 'bg-sky-500'
    },
    {
      id: 5,
      time: '3 PM – 4:15 PM',
      title: 'Operating Systems',
      code: 'CS 325 • Engineering Building 301 • Dr. Kim',
      color: 'bg-purple-50 border-purple-200 text-purple-900',
      dotColor: 'bg-purple-500'
    },
    {
      id: 6,
      time: '7:00 PM – 8:15 PM',
      title: 'Evening Coding Session',
      code: 'Innovation Lab • Room 402 • TA Team',
      color: 'bg-teal-50 border-teal-200 text-teal-900',
      dotColor: 'bg-teal-500'
    }
  ]);

  const colorThemeMap = {
    emerald: { color: 'bg-emerald-50 border-emerald-200 text-emerald-900', dotColor: 'bg-emerald-500', bgClass: 'bg-emerald-500' },
    indigo: { color: 'bg-indigo-50 border-indigo-200 text-indigo-900', dotColor: 'bg-indigo-500', bgClass: 'bg-indigo-500' },
    amber: { color: 'bg-amber-50 border-amber-200 text-amber-900', dotColor: 'bg-amber-400', bgClass: 'bg-amber-400' },
    purple: { color: 'bg-purple-50 border-purple-200 text-purple-900', dotColor: 'bg-purple-500', bgClass: 'bg-purple-500' },
    sky: { color: 'bg-sky-50 border-sky-200 text-sky-900', dotColor: 'bg-sky-500', bgClass: 'bg-sky-500' }
  };

  const timeSlots = [
    '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', 
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'
  ];

  const displayDateString = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Accurate AM/PM time parser to match correct time slot row
  const doesItemMatchSlot = (itemTime, slotLabel) => {
    const text = itemTime.toLowerCase();
    const slot = slotLabel.toLowerCase();

    const isSlotPM = slot.includes('pm');
    const isSlotAM = slot.includes('am');
    const itemHasPM = text.includes('pm');
    const itemHasAM = text.includes('am');

    if (isSlotPM && !itemHasPM && itemHasAM) return false;
    if (isSlotAM && !itemHasAM && itemHasPM) return false;

    const slotHour = slot.replace(/[^0-9]/g, '');
    const regex = new RegExp(`(^|[^0-9])${slotHour}([^0-9]|$)`, 'i');
    return regex.test(text);
  };

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const chosenTheme = colorThemeMap[newEventColorType] || colorThemeMap.indigo;

    const newEvent = {
      id: Date.now(),
      time: newEventTime,
      title: newEventTitle,
      code: newEventCode,
      color: chosenTheme.color,
      dotColor: chosenTheme.dotColor
    };

    setScheduleItems([newEvent, ...scheduleItems]);
    setNewEventTitle('');
    setIsAddEventOpen(false);
  };

  const handleDeleteEvent = (id) => {
    setScheduleItems(scheduleItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Schedule</h1>
            <p className="text-slate-500 text-sm mt-1">Plan your day, stay on track, and never miss a class.</p>
          </div>

          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 pr-8 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/25 cursor-pointer">
                <option>Spring {year}</option>
                <option>Fall {year}</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            <div className="bg-slate-200/70 p-1 rounded-xl flex space-x-1">
              {['Day', 'Week', 'Month'].map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    currentView === view 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-xl p-1">
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                Today
              </button>
              <button onClick={handlePrev} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-600 cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={handleNext} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-600 cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {currentView} View
              </span>
              <h2 className="text-xl font-bold text-slate-950">{displayDateString}</h2>
            </div>

            {/* DAY VIEW */}
            {currentView === 'Day' && (
              <div>
                <div className="flex items-center py-3 border-b border-slate-100 mb-6">
                  <span className="w-24 text-xs font-medium text-slate-400">All-day</span>
                  <div className="flex-1 bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 flex items-center space-x-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">CS Systems Workshop</h4>
                      <p className="text-xs text-slate-500">Main Lab Hall</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 relative">
                  {timeSlots.map((timeSlot, idx) => {
                    const matchedItems = scheduleItems.filter(item => doesItemMatchSlot(item.time, timeSlot));
                    return (
                      <div key={idx} className="flex items-start min-h-[55px] border-b border-slate-50 pb-2">
                        <span className="w-24 text-xs font-medium text-slate-400 pt-2">{timeSlot}</span>
                        <div className="flex-1 space-y-2">
                          {matchedItems.map((matchedItem) => (
                            <div key={matchedItem.id} className={`border rounded-xl p-3.5 transition-all shadow-xs flex items-start justify-between gap-3 ${matchedItem.color}`}>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-bold opacity-75">{matchedItem.time}</span>
                                  <span className={`w-2 h-2 rounded-full ${matchedItem.dotColor}`}></span>
                                </div>
                                <h4 className="text-sm font-bold">{matchedItem.title}</h4>
                                <p className="text-xs opacity-80 mt-0.5">{matchedItem.code}</p>
                              </div>
                              <button 
                                onClick={() => handleDeleteEvent(matchedItem.id)}
                                className="text-rose-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-white/50 transition cursor-pointer"
                                title="Delete Event"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* WEEK VIEW */}
            {currentView === 'Week' && (
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {weekdays.map((dayName, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 min-h-[350px]">
                    <div className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">
                      {dayName}
                    </div>
                    <div className="space-y-2">
                      {scheduleItems.slice(0, 4).map((item) => (
                        <div key={item.id} className={`p-2.5 rounded-lg border text-[11px] flex items-center justify-between gap-1 ${item.color}`}>
                          <div className="truncate">
                            <span className="font-bold block truncate">{item.title}</span>
                            <span className="opacity-75 text-[10px]">{item.time}</span>
                          </div>
                          <button onClick={() => handleDeleteEvent(item.id)} className="text-rose-400 hover:text-rose-600 shrink-0 cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MONTH VIEW */}
            {currentView === 'Month' && (
              <div>
                <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 mb-3">
                  <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {calendarMatrix.flat().map((cell, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => { setCurrentDate(cell.dateObj); setCurrentView('Day'); }}
                      className={`min-h-[85px] p-2 rounded-xl border border-slate-100 flex flex-col justify-between cursor-pointer transition ${
                        cell.isCurrentMonth ? 'bg-white hover:bg-slate-50 text-slate-800' : 'bg-slate-50/50 text-slate-300'
                      }`}
                    >
                      <span className="text-xs font-semibold">{cell.day}</span>
                      {cell.isCurrentMonth && (idx % 3 === 0) && (
                        <span className="bg-indigo-100 text-indigo-700 text-[9px] font-bold px-1.5 py-0.5 rounded truncate">Event</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setIsAddEventOpen(true)}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm">{months[month]} {year}</h3>
                <div className="flex space-x-1 text-slate-500">
                  <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-1 hover:bg-slate-100 rounded cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-1 hover:bg-slate-100 rounded cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 mb-2">
                <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
              </div>

              <div className="space-y-1 text-xs">
                {calendarMatrix.map((week, wIdx) => (
                  <div key={wIdx} className="grid grid-cols-7 text-center">
                    {week.map((cellObj, dIdx) => (
                      <div key={dIdx} className="flex justify-center items-center py-1">
                        <span 
                          onClick={() => { setCurrentDate(cellObj.dateObj); setCurrentView('Day'); }}
                          className={`w-7 h-7 flex items-center justify-center rounded-full font-medium cursor-pointer transition ${
                            cellObj.dateObj.getDate() === currentDate.getDate() && cellObj.dateObj.getMonth() === currentDate.getMonth() && cellObj.isCurrentMonth
                              ? 'bg-indigo-600 text-white font-bold' 
                              : !cellObj.isCurrentMonth 
                              ? 'text-slate-300' 
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {cellObj.day}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Today's Agenda</h3>
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {scheduleItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between text-xs border-b border-slate-50 pb-3 gap-2">
                    <div className="flex items-start space-x-3">
                      <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${item.dotColor}`}></span>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400">{item.time}</span>
                        <h4 className="font-bold text-slate-800 mt-0.5">{item.title}</h4>
                        <p className="text-slate-500 text-[11px] mt-0.5">{item.code.split('•')[1]?.trim() || item.code}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteEvent(item.id)} className="text-rose-400 hover:text-rose-600 p-1 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for adding events */}
        {isAddEventOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs px-4">
            <div className="bg-white w-full max-w-md rounded-3xl border border-slate-100 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-xl">📅</span> Add New Event
                </h3>
                <button onClick={() => setIsAddEventOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddEventSubmit} className="space-y-4 text-xs font-semibold">
                <div className="space-y-1.5">
                  <label className="text-slate-600 flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-indigo-600" /> Event Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Machine Learning Lecture" 
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-indigo-600" /> Time Slot (e.g. 7:00 PM – 8:15 PM)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 7:00 PM – 8:15 PM" 
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-indigo-600" /> Location / Code / Instructor</label>
                  <input 
                    type="text" 
                    placeholder="e.g. CS 402 • Room 104 • Dr. Lee" 
                    value={newEventCode}
                    onChange={(e) => setNewEventCode(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-600 block">Category Theme Color</label>
                  <div className="flex items-center gap-3 py-1">
                    {Object.keys(colorThemeMap).map((colorKey) => {
                      const theme = colorThemeMap[colorKey];
                      const isSelected = newEventColorType === colorKey;
                      return (
                        <button
                          key={colorKey}
                          type="button"
                          onClick={() => setNewEventColorType(colorKey)}
                          className={`w-8 h-8 rounded-xl ${theme.bgClass} cursor-pointer transition transform hover:scale-105 flex items-center justify-center ${
                            isSelected ? 'ring-2 ring-indigo-600 ring-offset-2 scale-110 shadow-sm' : 'opacity-70 hover:opacity-100'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsAddEventOpen(false)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Save Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}