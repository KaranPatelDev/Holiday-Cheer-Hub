import { Star } from 'lucide-react';
import { CountdownTimer } from './components/CountdownTimer';
import { GiftSuggestions } from './components/GiftSuggestions';
import { HolidayCalendar } from './components/HolidayCalendar';
import { HolidayMusic } from './components/HolidayMusic';
import { HolidayPhotoEditor } from './components/HolidayPhotoEditor';
import { RecipeFinder } from './components/RecipeFinder';
import { SnowGlobe } from './components/SnowGlobe';
import { WishListQR } from './components/WishListQR';
import { useHolidayStore } from './store/useHolidayStore';

function App() {
  const setHoliday = useHolidayStore((state) => state.setHoliday);
  const selectedHoliday = useHolidayStore((state) => state.selectedHoliday);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-green-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Holiday Cheer Hub</h1>
            </div>
            <label htmlFor="holiday-select" className="sr-only">Select Holiday</label>
            <select
              id="holiday-select"
              value={selectedHoliday}
              onChange={(e) => setHoliday(e.target.value as string)}
              className="p-2 border rounded-lg"
            >
              <option value="christmas">Christmas</option>
              <option value="hanukkah">Hanukkah</option>
              <option value="kwanzaa">Kwanzaa</option>
              <option value="winter-solstice">Winter Solstice</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CountdownTimer />
          <GiftSuggestions />
          <SnowGlobe />
          <RecipeFinder />
          <HolidayCalendar />
          <HolidayPhotoEditor />
          <HolidayMusic />
          <WishListQR />
        </div>
      </main>

      <footer className="bg-white mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>Made with ❄️ by Holiday Cheer Hub</p>
        </div>
      </footer>
    </div>
  );
}

export default App;