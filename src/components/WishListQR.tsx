import React from 'react';
import QRCode from 'react-qr-code';
import { QrCode, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function WishListQR() {
  const [copied, setCopied] = React.useState(false);
  const wishListUrl = window.location.href + '?list=123';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(wishListUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <QrCode className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-bold text-gray-800">Share Your Wish List</h2>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <QRCode value={wishListUrl} size={200} />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wish List URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={wishListUrl}
              readOnly
              className="flex-1 p-2 border rounded-lg bg-gray-50"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 text-center">
          Share this QR code or link with friends and family to let them know what's on your wish list!
        </p>
      </div>
    </motion.div>
  );
}