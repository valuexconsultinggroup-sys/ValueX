import React from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, BrainCircuit, Rocket, Activity } from 'lucide-react';

const steps = [
  {
    icon: ScanSearch,
    title: "Discovery & Audit",
    description: "We deploy AI diagnostic tools to map your current processes, spend, and supply chain inefficiencies with granular precision."
  },
  {
    icon: BrainCircuit,
    title: "Strategy & Design",
    description: "Our experts design a custom AI-first architecture, identifying specific opportunities for automation and cost arbitrage."
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "We implement autonomous agents and re-engineer workflows, ensuring seamless integration with legacy systems."
  },
  {
    icon: Activity,
    title: "Optimization",
    description: "Continuous monitoring and self-improving algorithms ensure your operations get more efficient over time."
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-3xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-6"
          >
            The ValueX Blueprint
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg"
          >
            A rigorous, data-driven methodology designed to transition your organization from traditional operations to an AI-first enterprise.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center mb-8 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-900">
                  <step.icon size={32} strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;