import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const questions = [
    "Are rising costs pressuring your margins?",
    "Is your supply chain struggling to keep up with demand?",
    "Are you navigating a merger or acquisition?",
    "Do you need leadership to execute critical transformations?"
  ];

  return (
    <section className="py-24 bg-black text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-8"
          >
            Ready to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Transform?</span>
          </motion.h2>
          
          <div className="space-y-6 mb-12">
            {questions.map((q, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 opacity-80 hover:opacity-100 transition-opacity"
              >
                 <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center shrink-0 mt-1 text-xs backdrop-blur-sm bg-white/5">?</div>
                 <p className="text-lg font-light leading-snug">{q}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Shine effect */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full" />
          
          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all" 
                placeholder="john@company.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea 
                rows={4} 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all" 
                placeholder="Tell us about your challenge..." 
              />
            </div>
            <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg">
              Send Message
              <ArrowRight size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;