import React from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { Timer, CloudSnow } from 'lucide-react';
import { useHolidayStore } from '../store/useHolidayStore';

const holidayDates = {
  christmas: new Date('2024-12-25'),
  hanukkah: new Date('2024-12-25'), // Update with correct date
  kwanzaa: new Date('2024-12-26'),
  'winter-solstice': new Date('2024-12-21'),
};

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const selectedHoliday = useHolidayStore((state) => state.selectedHoliday);
  const targetDate = holidayDates[selectedHoliday];

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeLeft({
        days: differenceInDays(targetDate, now),
        hours: differenceInHours(targetDate, now) % 24,
        minutes: differenceInMinutes(targetDate, now) % 60,
        seconds: differenceInSeconds(targetDate, now) % 60,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="relative p-8 bg-white rounded-xl shadow-lg">
      <div className="absolute inset-0 overflow-hidden">
        <div className="snowflakes" aria-hidden="true">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="snowflake">❅</div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Timer className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800">
            Countdown to {selectedHoliday.charAt(0).toUpperCase() + selectedHoliday.slice(1)}
          </h2>
          <CloudSnow className="w-6 h-6 text-blue-500" />
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <div className="text-4xl font-bold text-red-500">{value}</div>
              <div className="text-sm text-gray-600">{unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}