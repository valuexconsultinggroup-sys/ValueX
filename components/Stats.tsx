import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';

const stats = [
  { value: 125, prefix: "$", suffix: "M+", label: "Client Value Unlocked", decimals: 0 },
  { value: 18, prefix: "", suffix: "%", label: "Avg. Cost Reduction", decimals: 0 },
  { value: 20, prefix: "", suffix: "+", label: "AI Agents Deployed", decimals: 0 },
  { value: 20, prefix: "", suffix: "+", label: "# Clients", decimals: 0 }
];

const Counter = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-20%" });
  
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      // Switch from useSpring to animate() for guaranteed completion
      // duration: 2.5 seconds, ease: "circOut" (starts fast, slows down gently)
      const controls = animate(motionValue, value, {
        duration: 2.5,
        ease: "circOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = latest.toFixed(decimals);
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, motionValue, decimals]);

  return (
    <div ref={inViewRef} className="inline-flex items-center whitespace-nowrap">
      <span>{prefix}</span>
      <span ref={ref} className="tabular-nums tracking-tighter mx-0.5">0</span>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-start">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-start text-center group w-full"
            >
              {/* FIX: Enforce a FIXED height container (h-16) for the numbers.
                items-end: ensures the numbers sit on the same baseline.
              */}
              <div className="h-14 md:h-16 flex items-end justify-center mb-3 w-full">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 leading-none flex items-center justify-center">
                   <span className="bg-clip-text text-transparent bg-gradient-to-br from-black to-gray-600 group-hover:to-black transition-all duration-500">
                      <Counter 
                        value={stat.value} 
                        prefix={stat.prefix} 
                        suffix={stat.suffix} 
                        decimals={stat.decimals}
                      />
                   </span>
                </h3>
              </div>

              {/* FIX: Enforce a FIXED height container (h-12) for labels.
                This ensures that even if text wraps, it doesn't push the layout around.
              */}
              <div className="h-12 flex items-start justify-center w-full px-1">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors duration-300 leading-tight">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;