import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import ServiceDetail from './components/ServiceDetail';
import Founders from './components/Founders';
import Contact from './components/Contact';
import Stats from './components/Stats';
import Process from './components/Process';
import { SERVICES } from './constants';
import { ServiceData } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'detail'>('home');
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  const handleServiceClick = (service: ServiceData) => {
    setSelectedService(service);
    setCurrentView('detail');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setTimeout(() => setSelectedService(null), 500); // Clear after animation
  };

  const handleServiceSelectFromFooter = (serviceId: string) => {
    const service = SERVICES.find(s => s.id === serviceId);
    if (service) {
      handleServiceClick(service);
    }
  };

  const scrollToSection = (id: string) => {
    if (currentView === 'detail') {
      // If we are in detail view, go back to home then scroll
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'home') {
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <Layout 
      onNavigate={scrollToSection} 
      onServiceSelect={handleServiceSelectFromFooter}
      currentPage={currentView === 'home' ? 'home' : 'services'}
    >
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <div id="home">
              <Hero onLearnMore={() => scrollToSection('services')} />
            </div>

            {/* Social Proof Stats */}
            <Stats />

            {/* Services Section */}
            <section id="services" className="py-24 relative z-20">
              <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 md:mb-24">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-6"
                  >
                    Areas of Expertise
                  </motion.h2>
                  <div className="h-1 w-20 bg-black rounded-full mb-6"></div>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-500 max-w-2xl"
                  >
                    We combine strategic insight with AI-driven execution to transform your business functions.
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SERVICES.map((service, index) => (
                    <ServiceCard 
                      key={service.id} 
                      service={service} 
                      index={index}
                      onClick={() => handleServiceClick(service)} 
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* How We Work */}
            <Process />

            <div id="founders">
              <Founders />
            </div>

            <div id="contact">
              <Contact />
            </div>
          </motion.div>
        ) : (
          selectedService && (
            <ServiceDetail 
              key="detail" 
              service={selectedService} 
              onBack={handleBackToHome} 
            />
          )
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;