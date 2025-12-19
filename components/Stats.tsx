import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const stats = [
  { value: 125, prefix: "$", suffix: "M+", label: "Client Value Unlocked", decimals: 0 },
  { value: 18, prefix: "", suffix: "%", label: "Avg. Cost Reduction", decimals: 0 },
  { value: 20, prefix: "", suffix: "+", label: "AI Agents Deployed", decimals: 0 },
  { value: 30, prefix: "", suffix: "+", label: "# Clients", decimals: 0 }
];

const Counter = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-20%" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 55,
    mass: 1
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals);
      }
    });
  }, [springValue, decimals]);

  return (
    <div ref={inViewRef} className="inline-flex items-center">
      <span>{prefix}</span>
      <span ref={ref} className="tabular-nums tracking-tighter">0</span>
      <span>{suffix}</span>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="py-20 relative border-y border-white/10 bg-white/30 backdrop-blur-sm overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-2 flex justify-center items-center">
                 <span className="bg-clip-text text-transparent bg-gradient-to-br from-black to-gray-600 group-hover:to-black transition-all duration-500">
                    <Counter 
                      value={stat.value} 
                      prefix={stat.prefix} 
                      suffix={stat.suffix} 
                      decimals={stat.decimals}
                    />
                 </span>
              </h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;