import React, { useState } from 'react';
import { FOUNDERS } from '../constants';
import { motion } from 'framer-motion';

const Founders: React.FC = () => {
  // Track which images failed to load
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className="py-24 relative z-10 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-6"
          >
            Our Leadership
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto"
          >
            Guided by industry veterans committed to innovation and excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {FOUNDERS.map((founder, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-inner border-4 border-gray-50 relative bg-gray-100">
                 {/* 
                    Logic: Try to show image. 
                    If error (or no image path), show the Gradient Fallback.
                 */}
                 {founder.image ? (
                   <img 
                      key={founder.image} // Force re-render if url changes
                      src={founder.image} 
                      alt={founder.name} 
                      onError={() => handleImageError(index)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                   />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors">
                     <span className="text-3xl font-bold text-gray-400 group-hover:text-gray-600 tracking-wider">
                       {getInitials(founder.name)}
                     </span>
                   </div>
                 )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{founder.name}</h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{founder.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;