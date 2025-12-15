import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- STEP 6: PASTE YOUR CODESPACE URL HERE ---
// It should look like: 'https://solid-space-adventure-wr755...-3001.app.github.dev/api/send-email'
// Make sure to include the '/api/send-email' endpoint at the end.
const BACKEND_URL = 'https://super-duper-lamp-pj49vqxww9w5cxv7-3001.app.github.dev/api/send-email'; 

const Contact: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // UI State
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const questions = [
    "Are rising costs pressuring your margins?",
    "Is your supply chain struggling to keep up with demand?",
    "Are you navigating a merger or acquisition?",
    "Do you need leadership to execute critical transformations?"
  ];

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Sending data to the backend
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Server error');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Failed to send message. Ensure the backend server is running and the URL is correct.');
    }
  };

  return (
    <section className="py-24 bg-black text-white overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Text & Questions */}
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
                className="flex items-start gap-4 opacity-80 hover:opacity-100 transition-opacity group"
              >
                 <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center shrink-0 mt-1 text-xs backdrop-blur-sm bg-white/5 group-hover:border-blue-400 group-hover:text-blue-400 transition-colors">?</div>
                 <p className="text-lg font-light leading-snug">{q}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Form Shine effect */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 blur-[80px] rounded-full" />
          
          <AnimatePresence mode='wait'>
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center text-center h-[400px] space-y-4"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-gray-400 max-w-xs">
                  Thank you, {formData.name || 'Visitor'}. We have received your inquiry and will be in touch shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm text-gray-400 hover:text-white underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 relative z-10" 
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all focus:ring-1 focus:ring-white/20" 
                    placeholder="Amol Amodkar" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all focus:ring-1 focus:ring-white/20" 
                    placeholder="amol@valuexconsulting.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all focus:ring-1 focus:ring-white/20 resize-none" 
                    placeholder="Tell us about your challenge..." 
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                    <AlertCircle size={16} />
                    {errorMessage}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;