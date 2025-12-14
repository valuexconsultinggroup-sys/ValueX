import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShoppingBag, Truck, Settings, Cpu, Handshake, Users, LucideIcon } from 'lucide-react';
import { ServiceData } from '../types';

interface ServiceCardProps {
  service: ServiceData;
  onClick: () => void;
  index: number;
}

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag,
  Truck,
  Settings,
  Cpu,
  Handshake,
  Users
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, index }) => {
  const Icon = iconMap[service.iconName] || Settings;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group relative bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
        <div className="bg-black/90 text-white p-2 rounded-full transform rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-lg">
          <ArrowUpRight size={20} />
        </div>
      </div>

      {/* Icon Container: Added group-hover:scale-110 for subtle scaling, preserved black bg/white text on hover */}
      <div className="mb-8 p-4 bg-white/80 rounded-2xl w-fit group-hover:bg-black group-hover:text-white group-hover:border-black group-hover:scale-110 transition-all duration-300 shadow-sm border border-white/50">
        <Icon size={32} strokeWidth={1.5} />
      </div>

      <h3 className="relative z-10 text-2xl font-bold text-gray-900 mb-4 tracking-tight">
        {service.title}
      </h3>
      
      <p className="relative z-10 text-gray-600 leading-relaxed font-light">
        {service.shortDescription}
      </p>

      <div className="relative z-10 mt-8 pt-8 border-t border-gray-200/50 flex items-center text-sm font-semibold text-gray-400 group-hover:text-black transition-colors">
        Learn more
      </div>
    </motion.div>
  );
};

export default ServiceCard;