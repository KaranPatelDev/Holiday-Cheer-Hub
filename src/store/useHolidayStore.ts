import { create } from 'zustand';
import type { Holiday } from '../types';

interface HolidayStore {
  selectedHoliday: Holiday;
  setHoliday: (holiday: Holiday) => void;
}

export const useHolidayStore = create<HolidayStore>((set) => ({
  selectedHoliday: 'christmas',
  setHoliday: (holiday) => set({ selectedHoliday: holiday }),
}));