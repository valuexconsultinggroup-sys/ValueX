import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const AICore = () => {
  const { scrollYProgress } = useScroll();
  
  // Different rotation speeds for different rings
  const rotateFast = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const rotateSlow = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const rotateMedium = useTransform(scrollYProgress, [0, 1], [45, 405]);
  
  // Dynamic opacity and scale based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed bottom-8 right-8 z-40 hidden lg:block pointer-events-none"
    >
      <motion.div 
        style={{ scale }}
        className="relative w-40 h-40 flex items-center justify-center"
      >
        {/* Glowing backdrop */}
        <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full" />

        {/* Outer Ring - Dashed */}
        <motion.div 
          style={{ rotate: rotateSlow }}
          className="absolute inset-0 border border-dashed border-gray-400/30 rounded-full"
        />

        {/* Middle Ring - Gradient stroke */}
        <motion.div 
          style={{ rotate: rotateMedium }}
          className="absolute inset-4 rounded-full border border-t-blue-500/50 border-r-transparent border-b-purple-500/50 border-l-transparent"
        />

        {/* Inner Ring - Tech markers */}
        <motion.div 
          style={{ rotate: rotateFast }}
          className="absolute inset-8 border border-white/20 rounded-full flex items-center justify-center"
        >
          <div className="absolute top-0 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <div className="absolute bottom-0 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
        </motion.div>

        {/* Central Core */}
        <div className="relative w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shadow-lg">
          <Sparkles size={24} className="text-white animate-pulse" />
        </div>
        
        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">AI Core Active</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AICore;