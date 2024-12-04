import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Snowflake } from 'lucide-react';
import { useSnowfall } from '../hooks/useSnowfall';
import { ShareButton } from './ShareButton';

export function SnowGlobe() {
  const [scene, setScene] = React.useState('winter-village');
  const [isSnowing, setIsSnowing] = React.useState(false);
  const snowflakes = useSnowfall(isSnowing, 30);

  const handleShake = () => {
    setIsSnowing(true);
    setTimeout(() => setIsSnowing(false), 5000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Cloud className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">Virtual Snow Globe</h2>
        </div>
        <ShareButton 
          title="Check out my Snow Globe!" 
          description="I created a beautiful winter scene in the Holiday Cheer Hub"
        />
      </div>

      <motion.div 
        className="relative w-64 h-64 mx-auto rounded-full bg-blue-50 border-8 border-gray-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShake}
      >
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <AnimatePresence>
            {snowflakes.map((flake) => (
              <motion.div
                key={flake.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  left: `${flake.x}%`,
                  top: `${flake.y}%`,
                  fontSize: `${flake.size}px`,
                }}
                className="text-white pointer-events-none"
              >
                ❄
              </motion.div>
            ))}
          </AnimatePresence>
          
          <motion.div 
            className={`scene ${scene}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      <div className="mt-6 space-y-4">
        <select
          value={scene}
          onChange={(e) => setScene(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="winter-village">Winter Village</option>
          <option value="santa-workshop">Santa's Workshop</option>
          <option value="ice-castle">Ice Castle</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShake}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Shake Globe
        </motion.button>
      </div>
    </div>
  );
}