'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flame } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  category: string;
}

interface Answer {
  questionId: number;
  value: number; // 0-100
}

const questions: Question[] = [
  { id: 1, question: 'How important is spontaneity in your ideal date?', category: 'lifestyle' },
  { id: 2, question: 'Do you value quality time over grand gestures?', category: 'values' },
  { id: 3, question: 'How much do you love adventure?', category: 'lifestyle' },
  { id: 4, question: 'Is humor a dealbreaker for compatibility?', category: 'personality' },
  { id: 5, question: 'How important is physical attraction to you?', category: 'attraction' },
];

const getFlameCount = (percentage: number): number => {
  if (percentage >= 90) return 5;
  if (percentage >= 70) return 4;
  if (percentage >= 50) return 3;
  if (percentage >= 30) return 2;
  return 1;
};

const getCompatibilityColor = (percentage: number): string => {
  if (percentage >= 80) return 'text-red-500';
  if (percentage >= 60) return 'text-orange-500';
  if (percentage >= 40) return 'text-yellow-500';
  return 'text-pink-400';
};

export default function CompatibilityChecker() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [compatibility, setCompatibility] = useState(0);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === questions[currentQuestion].id);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex].value = value;
    } else {
      newAnswers.push({ questionId: questions[currentQuestion].id, value });
    }
    
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const avg = newAnswers.reduce((sum, a) => sum + a.value, 0) / newAnswers.length;
      setCompatibility(Math.round(avg));
      setShowResult(true);
    }
  };

  const resetChecker = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setCompatibility(0);
  };

  const flameCount = getFlameCount(compatibility);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-primary-950 to-black opacity-50" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-light rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary-500 fill-primary-500" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Check Your Vibe
            </h2>
            <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
          </div>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            Discover your compatibility score with our fun quick quiz
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
               key="quiz"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20"
             >
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-primary-400">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={questions[currentQuestion].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 sm:mb-10"
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6 sm:mb-8">
                  {questions[currentQuestion].question}
                </h3>

                {/* Answer slider */}
                  <div className="space-y-6">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      defaultValue={answers.find(a => a.questionId === questions[currentQuestion].id)?.value || 50}
                      onChange={(e) => {
                        // Visual feedback only, answer on button click
                      }}
                      className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    
                    {/* Quick answer buttons */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                      {[
                        { label: 'Not at all', shortLabel: 'Not at all', value: 0 },
                        { label: 'A little', shortLabel: 'A bit', value: 25 },
                        { label: 'Neutral', shortLabel: 'Neutral', value: 50 },
                        { label: 'Quite a bit', shortLabel: 'Quite', value: 75 },
                        { label: 'Absolutely', shortLabel: 'Yes', value: 100 },
                      ].map((option) => (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAnswer(option.value)}
                          className="py-3 sm:py-3 px-2 sm:px-3 rounded-lg bg-white/10 hover:bg-primary-500/30 text-xs sm:text-sm text-white transition-colors font-medium"
                        >
                          <span className="sm:hidden">{option.shortLabel}</span>
                          <span className="hidden sm:inline">{option.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center pt-8 border-t border-white/10">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-2 text-sm sm:text-base text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => handleAnswer(answers.find(a => a.questionId === questions[currentQuestion].id)?.value || 50)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-primary rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  {currentQuestion === questions.length - 1 ? 'See Results' : 'Next →'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                className="relative w-48 h-48 mx-auto mb-8"
              >
                {/* Animated circle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 blur-2xl"
                />
                
                {/* Result circle */}
                <div className="relative w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md">
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className={`text-6xl font-bold mb-2 ${getCompatibilityColor(compatibility)}`}
                    >
                      {compatibility}%
                    </motion.div>
                    <div className="text-sm text-gray-400">Compatibility</div>
                  </div>
                </div>
              </motion.div>

              {/* Flame indicators */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <div className="flex justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <Flame
                        className={`w-10 h-10 ${
                          i < flameCount ? 'text-orange-500 fill-orange-500' : 'text-gray-600'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-400 text-sm">
                  {compatibility >= 80
                    ? '🔥 Absolutely Hot! You\'ll have amazing chemistry!'
                    : compatibility >= 60
                    ? '💕 Great Vibes! High potential for connection!'
                    : compatibility >= 40
                    ? '✨ Good Match! Worth exploring!'
                    : '💭 Take your time! Let it grow naturally!'}
                </p>
              </motion.div>

              {/* Share & Reset buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full"
              >
                <button
                  onClick={resetChecker}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-sm sm:text-base text-white transition-colors"
                >
                  Try Again
                </button>
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-primary rounded-lg font-semibold text-sm sm:text-base text-white hover:opacity-90 transition-opacity">
                  Find Your Match
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
