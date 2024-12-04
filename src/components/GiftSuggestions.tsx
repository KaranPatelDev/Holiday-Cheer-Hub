import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Search, Heart } from 'lucide-react';
import Confetti from 'react-confetti';
import type { GiftSuggestion } from '../types';

const GIFT_SUGGESTIONS: GiftSuggestion[] = [
  {
    name: "Cozy Winter Blanket",
    description: "Ultra-soft throw blanket perfect for winter nights",
    price: "$29.99",
    link: "https://example.com/blanket"
  },
  {
    name: "Holiday Cookbook",
    description: "Collection of festive recipes from around the world",
    price: "$24.99",
    link: "https://example.com/cookbook"
  },
  {
    name: "Smart Holiday Lights",
    description: "Voice-controlled LED lights with multiple patterns",
    price: "$39.99",
    link: "https://example.com/lights"
  },
  {
    name: "Artisan Hot Chocolate Set",
    description: "Gourmet cocoa with handmade marshmallows",
    price: "$34.99",
    link: "https://example.com/cocoa"
  }
];

export function GiftSuggestions() {
  const [interests, setInterests] = React.useState('');
  const [age, setAge] = React.useState('');
  const [relationship, setRelationship] = React.useState('');
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [showConfetti, setShowConfetti] = React.useState(false);

  const handleFavorite = (name: string) => {
    setFavorites(prev => {
      if (prev.includes(name)) {
        return prev.filter(n => n !== name);
      }
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      return [...prev, name];
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {showConfetti && <Confetti numberOfPieces={100} recycle={false} />}
      
      <div className="flex items-center gap-2 mb-6">
        <Gift className="w-6 h-6 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-800">Gift Finder</h2>
      </div>

      <div className="space-y-4 mb-6">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder="Recipient's interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <motion.select
          whileFocus={{ scale: 1.02 }}
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select relationship</option>
          <option value="family">Family</option>
          <option value="friend">Friend</option>
          <option value="colleague">Colleague</option>
        </motion.select>
      </div>

      <div className="grid gap-4">
        {GIFT_SUGGESTIONS.map((suggestion) => (
          <motion.div
            key={suggestion.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="border p-4 rounded-lg relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{suggestion.name}</h3>
                <p className="text-gray-600">{suggestion.description}</p>
                <p className="text-red-500 font-bold mt-2">{suggestion.price}</p>
              </div>
              <button
                onClick={() => handleFavorite(suggestion.name)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.includes(suggestion.name)
                      ? 'text-red-500 fill-current'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={suggestion.link}
              className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Item
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}