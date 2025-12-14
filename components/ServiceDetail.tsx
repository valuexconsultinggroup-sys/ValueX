import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, BarChart3, ShieldCheck } from 'lucide-react';
import { ServiceData } from '../types';

interface ServiceDetailProps {
  service: ServiceData;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-transparent" // Layout provides background
    >
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors mb-12 backdrop-blur-sm bg-white/30 px-4 py-2 rounded-full w-fit"
        >
          <div className="p-1.5 rounded-full bg-white group-hover:bg-black group-hover:text-white transition-all shadow-sm">
            <ArrowLeft size={16} />
          </div>
          Back to Expertise
        </button>

        <motion.article 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="pb-20"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-8 drop-shadow-sm">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light backdrop-blur-sm">
              {service.intro}
            </p>
          </motion.div>

          {/* Philosophy */}
          <motion.section variants={itemVariants} className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200/50 pb-2">Our Philosophy</h2>
            <p className="text-gray-600 mb-8 text-lg">{service.philosophy.text}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.philosophy.pillars.map((pillar, idx) => (
                <div key={idx} className="bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-900 mb-3">{pillar.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Methodology */}
          <motion.section variants={itemVariants} className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 border-b border-gray-200/50 pb-2">{service.methodology.title}</h2>
            <div className="space-y-12">
              {service.methodology.sections.map((section, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                     <h3 className="text-xl font-bold text-gray-900">{section.subtitle}</h3>
                  </div>
                  <div className="md:w-2/3 space-y-6">
                    {section.points.map((point, pIdx) => (
                      <div key={pIdx} className="group p-4 rounded-xl hover:bg-white/40 transition-colors">
                         <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-black rounded-full" />
                           {point.title}
                         </h4>
                         <p className="text-gray-500 pl-4 border-l border-gray-300 group-hover:border-black transition-colors">
                           {point.description}
                         </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Case Study */}
          <motion.section variants={itemVariants} className="mb-20 bg-black/90 text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-lg">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm font-semibold uppercase tracking-wider relative z-10">
              <BarChart3 size={16} />
              Case Study
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 relative z-10">Reinventing Performance</h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-12 relative z-10">
              <div>
                <h3 className="text-gray-400 font-semibold mb-3">The Challenge</h3>
                <p className="text-gray-300 leading-relaxed">{service.caseStudy.challenge}</p>
              </div>
              <div>
                <h3 className="text-gray-400 font-semibold mb-3">The Solution</h3>
                <ul className="space-y-2">
                  {service.caseStudy.solution.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-300 text-sm">
                      <span className="text-white mt-1">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 relative z-10">
              <h3 className="text-white font-bold mb-6">Key Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.caseStudy.results.map((result, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-400 shrink-0 mt-1" size={20} />
                    <span className="text-gray-200 text-sm">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Why Us */}
          <motion.section variants={itemVariants} className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200/50 pb-2">Why ValueX?</h2>
            <div className="grid md:grid-cols-3 gap-8">
               {service.whyUs.map((reason, idx) => (
                 <div key={idx} className="flex flex-col gap-4 p-4 rounded-2xl hover:bg-white/40 transition-colors">
                   <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-white/50 flex items-center justify-center">
                      <ShieldCheck size={20} className="text-black"/>
                   </div>
                   <h3 className="font-bold text-gray-900">{reason.title}</h3>
                   <p className="text-gray-500 text-sm">{reason.description}</p>
                 </div>
               ))}
            </div>
          </motion.section>

          {/* Conclusion / CTA */}
          <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-8 text-center shadow-lg">
             <p className="text-xl text-gray-700 font-medium mb-6 italic">"{service.conclusion}"</p>
             <button 
               onClick={onBack}
               className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-transform shadow-xl"
             >
               Start Your Transformation
             </button>
          </motion.div>

        </motion.article>
      </div>
    </motion.div>
  );
};

export default ServiceDetail;