import React from 'react';
import Calendar from 'react-calendar';
import { CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { useHolidayStore } from '../store/useHolidayStore';
import { holidayEvents } from '../data/holidayEvents';

export function HolidayCalendar() {
  const selectedHoliday = useHolidayStore((state) => state.selectedHoliday);
  const [value, setValue] = React.useState(new Date());

  const events = holidayEvents[selectedHoliday] || [];

  const tileContent = ({ date }: { date: Date }) => {
    const event = events.find(e => 
      e.date.getDate() === date.getDate() && 
      e.date.getMonth() === date.getMonth()
    );

    return event ? (
      <div className="text-xs text-red-500 mt-1">{event.title}</div>
    ) : null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <CalendarDays className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Holiday Calendar</h2>
      </div>

      <Calendar
        onChange={setValue}
        value={value}
        tileContent={tileContent}
        className="rounded-lg border p-4"
      />

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Upcoming Events:</h3>
        <div className="space-y-2">
          {events
            .filter(event => event.date >= new Date())
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(0, 3)
            .map(event => (
              <div key={event.title} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span>{event.title} - {event.date.toLocaleDateString()}</span>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}