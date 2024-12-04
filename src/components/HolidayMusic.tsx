import React from 'react';
import { Music, Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { Howl } from 'howler';
import { motion } from 'framer-motion';

const HOLIDAY_SONGS = [
  {
    title: "Jingle Bells",
    url: "https://example.com/jingle-bells.mp3"
  },
  {
    title: "Silent Night",
    url: "https://example.com/silent-night.mp3"
  }
];

export function HolidayMusic() {
  const [currentSong, setCurrentSong] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);
  const soundRef = React.useRef<Howl | null>(null);

  React.useEffect(() => {
    soundRef.current = new Howl({
      src: [HOLIDAY_SONGS[currentSong].url],
      volume: volume,
      onend: () => {
        handleNext();
      }
    });

    return () => {
      soundRef.current?.unload();
    };
  }, [currentSong]);

  const togglePlay = () => {
    if (isPlaying) {
      soundRef.current?.pause();
    } else {
      soundRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    soundRef.current?.unload();
    setCurrentSong((prev) => (prev + 1) % HOLIDAY_SONGS.length);
    setIsPlaying(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundRef.current?.volume(newVolume);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Music className="w-6 h-6 text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-800">Holiday Music</h2>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <h3 className="font-semibold">{HOLIDAY_SONGS[currentSong].title}</h3>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-gray-600" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full"
          />
        </div>
      </div>
    </motion.div>
  );
}