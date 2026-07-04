import React from 'react';
import { Calendar, GraduationCap, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';

const QuickStats = () => {
  const stats = [
    {
      title: 'Upcoming Deadlines',
      value: '5',
      sub: 'due this week',
      linkText: 'View all',
      icon: Calendar,
      bg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'GPA Summary',
      value: '8.43',
      sub: '↑ 0.32 vs last semester',
      subColor: 'text-green-600 font-medium',
      linkText: 'View details',
      icon: GraduationCap,
      bg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Tasks Today',
      value: '4',
      sub: 'pending tasks',
      linkText: 'View tasks',
      icon: CheckCircle2,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Events This Week',
      value: '3',
      sub: 'upcoming events',
      linkText: 'View events',
      icon: Trophy,
      bg: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-2">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">{stat.value}</h3>
                <p className={`text-xs text-gray-500 ${stat.subColor || ''}`}>{stat.sub}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.iconColor}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            
            <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 mt-5 transition-all w-fit">
              {stat.linkText} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;