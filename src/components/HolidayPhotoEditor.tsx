import React from 'react';
import Webcam from 'react-webcam';
import { Camera, Download, Sticker } from 'lucide-react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';

const STICKERS = [
  '🎅', '🎄', '⛄', '🦌', '🎁', '❄️', '✨', '🕯️'
];

interface Sticker {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

export function HolidayPhotoEditor() {
  const webcamRef = React.useRef<Webcam>(null);
  const [photo, setPhoto] = React.useState<string | null>(null);
  const [stickers, setStickers] = React.useState<Sticker[]>([]);
  const [selectedSticker, setSelectedSticker] = React.useState<string>(STICKERS[0]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhoto(imageSrc);
    }
  }, [webcamRef]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setStickers(prev => [...prev, {
      id: Date.now(),
      emoji: selectedSticker,
      x,
      y
    }]);
  };

  const downloadImage = async () => {
    const element = document.getElementById('photo-canvas');
    if (element) {
      const dataUrl = await toPng(element);
      const link = document.createElement('a');
      link.download = 'holiday-photo.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Camera className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800">Holiday Photo Booth</h2>
        </div>
        {photo && (
          <button
            onClick={downloadImage}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            <Download className="w-4 h-4" />
            Save
          </button>
        )}
      </div>

      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {!photo ? (
          <>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
            />
            <button
              onClick={capture}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              Take Photo
            </button>
          </>
        ) : (
          <div
            id="photo-canvas"
            className="relative w-full h-full"
            onClick={handleCanvasClick}
          >
            <img src={photo} alt="Captured" className="w-full h-full object-cover" />
            {stickers.map(sticker => (
              <div
                key={sticker.id}
                className="absolute text-4xl transform -translate-x-1/2 -translate-y-1/2 cursor-move"
                style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
              >
                {sticker.emoji}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Sticker className="w-4 h-4" />
          <span className="text-sm font-medium">Stickers</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {STICKERS.map(emoji => (
            <button
              key={emoji}
              onClick={() => setSelectedSticker(emoji)}
              className={`text-2xl p-2 rounded-lg ${
                selectedSticker === emoji ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}