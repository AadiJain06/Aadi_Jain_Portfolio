import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIFeatures } from './AIFeatures';
import { GestureCanvas } from './GestureCanvas';
import { CollaborativeEditor } from './CollaborativeEditor';

export const InnovativeFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>('ai');
  const [aiPrediction, setAiPrediction] = useState<string>('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const features = [
    { id: 'ai', name: 'AI-Powered Analysis', icon: '🤖' },
    { id: 'gesture', name: 'Gesture Recognition', icon: '✋' },
    { id: 'collaboration', name: 'Real-time Collaboration', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Innovative Features Showcase
          </h1>
          <p className="text-gray-400">
            Experience cutting-edge web technologies in action
          </p>
        </header>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {features.map((feature) => (
            <motion.button
              key={feature.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeFeature === feature.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <span className="mr-2">{feature.icon}</span>
              {feature.name}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 shadow-2xl"
          >
            {activeFeature === 'ai' && (
              <AIFeatures onPrediction={setAiPrediction} />
            )}
            {activeFeature === 'gesture' && <GestureCanvas />}
            {activeFeature === 'collaboration' && (
              <CollaborativeEditor
                roomId="demo-room"
                initialContent="// Start collaborating here..."
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Network Status Indicator */}
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isOnline ? 'rgb(34 197 94)' : 'rgb(239 68 68)',
          }}
          className="fixed bottom-4 right-4 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg"
        >
          {isOnline ? '🟢 Online' : '🔴 Offline'}
        </motion.div>

        {/* AI Prediction Display */}
        {aiPrediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-purple-900/50 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-2">AI Analysis Result:</h3>
            <p className="text-gray-300">{aiPrediction}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}; 