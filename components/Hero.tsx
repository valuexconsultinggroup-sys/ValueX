import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import AICore from './AICore';

interface HeroProps {
  onLearnMore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLearnMore }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Aligned Badge Section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Sparkles size={16} className="text-blue-400" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-blue-100/90 uppercase">
              Client Value Unlocked
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
            Transforming <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Business Logic
            </span> <br />
            into Value
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
            We bridge the gap between complex operational challenges and sustainable growth through AI-driven transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onLearnMore}
              className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
            >
              Explore Services
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-white/20 rounded-full font-bold hover:bg-white/10 transition-all">
              Our Methodology
            </button>
          </div>
        </motion.div>

        <div className="relative h-[600px] hidden lg:block">
          <AICore />
        </div>
      </div>
    </section>
  );
};

export default Hero;