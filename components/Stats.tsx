import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const stats = [
  { value: 125, prefix: "$", suffix: "M+", label: "Client Value Unlocked", decimals: 0 },
  { value: 18, prefix: "", suffix: "%", label: "Avg. Cost Reduction", decimals: 0 },
  { value: 20, prefix: "", suffix: "+", label: "AI Agents Deployed", decimals: 0 },
  { value: 30, prefix: "", suffix: "+", label: "# Clients", decimals: 0 }
];

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const Counter: React.FC<CounterProps> = ({ value, prefix = "", suffix = "", decimals = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inViewRef = useRef<HTMLSpanElement>(null);
  // Removed negative margin to ensure it triggers reliably on all screen heights
  const isInView = useInView(inViewRef, { once: true });
  
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
    <span ref={inViewRef} className="inline-flex items-baseline whitespace-nowrap">
      {prefix && <span className="mr-1">{prefix}</span>}
      <span ref={ref} className="tabular-nums tracking-tighter">0</span>
      {suffix && <span className="ml-1">{suffix}</span>}
    </span>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="py-20 relative border-y border-white/20 bg-white/40 backdrop-blur-md overflow-hidden shadow-sm">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-start text-center group"
            >
              <div className="min-h-[4rem] flex items-center justify-center mb-2">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 flex justify-center items-center leading-none">
                  <Counter 
                    value={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                    decimals={stat.decimals}
                  />
                </h3>
              </div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest group-hover:text-indigo-600 transition-colors duration-300 w-full px-2">
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