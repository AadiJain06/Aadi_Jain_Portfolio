import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { motion } from 'framer-motion';

interface AIFeaturesProps {
  onPrediction: (prediction: string) => void;
}

export const AIFeatures: React.FC<AIFeaturesProps> = ({ onPrediction }) => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Load the pre-trained model
    const loadModel = async () => {
      try {
        // Load a simple text classification model
        const loadedModel = await tf.loadLayersModel('/models/text_classification_model.json');
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, []);

  const processText = async () => {
    if (!model || !inputText) return;

    setIsProcessing(true);
    try {
      // Convert text to tensor
      const tensor = tf.tensor([inputText]);
      
      // Make prediction
      const prediction = await model.predict(tensor);
      const result = Array.isArray(prediction) ? prediction[0].dataSync() : prediction.dataSync();
      
      onPrediction(result.toString());
      
      // Cleanup
      tensor.dispose();
    } catch (error) {
      console.error('Error processing text:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      className="p-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">AI-Powered Text Analysis</h2>
      <div className="space-y-4">
        <textarea
          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20"
          placeholder="Enter text for AI analysis..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={4}
        />
        <motion.button
          className="w-full py-2 px-4 bg-white text-purple-600 rounded-lg font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={processText}
          disabled={isProcessing || !model}
        >
          {isProcessing ? 'Processing...' : model ? 'Analyze Text' : 'Loading Model...'}
        </motion.button>
      </div>
    </motion.div>
  );
}; 