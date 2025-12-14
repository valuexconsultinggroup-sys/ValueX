import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, TrendingUp } from 'lucide-react';

interface HeroProps {
  onLearnMore: () => void;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;
      oscillationSpeed: number;
      angle: number;
      color: string;
    }[] = [];
    
    let animationFrameId: number;
    let w = 0;
    let h = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.1), 120);
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 0.5;
        // Randomly assign a cool tech color palette
        const colors = [
          'rgba(59, 130, 246, ', // Blue
          'rgba(139, 92, 246, ', // Violet
          'rgba(14, 165, 233, ', // Sky
          'rgba(99, 102, 241, '  // Indigo
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3, // Gentle drift
          vy: (Math.random() - 0.5) * 0.3,
          size: size,
          baseSize: size,
          oscillationSpeed: Math.random() * 0.02 + 0.005,
          angle: Math.random() * Math.PI * 2,
          color: color
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      
      // Interaction radius
      const interactionRadius = 180;
      const connectionDist = 120;

      particles.forEach((p, i) => {
        // 1. Move Particle
        p.x += p.vx;
        p.y += p.vy;

        // 2. Mouse Interaction (Repulsion)
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < interactionRadius) {
            const force = (interactionRadius - dist) / interactionRadius;
            const angle = Math.atan2(dy, dx);
            const push = force * 1.2; // Gentle push
            
            p.x += Math.cos(angle) * push;
            p.y += Math.sin(angle) * push;
        }

        // 3. Screen Wrap
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        // 4. Size Oscillation (Breathing effect)
        p.angle += p.oscillationSpeed;
        p.size = p.baseSize + Math.sin(p.angle) * 0.5;
        // Ensure size doesn't go negative
        const drawSize = Math.max(0.1, p.size);

        // 5. Draw Particle
        // Opacity fluctuates with size
        const opacity = 0.3 + Math.sin(p.angle) * 0.2;
        ctx.fillStyle = `${p.color}${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
        ctx.fill();

        // 6. Draw Connections between particles
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const pdx = p.x - p2.x;
            const pdy = p.y - p2.y;
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

            if (pdist < connectionDist) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                const linkOpacity = (1 - pdist / connectionDist) * 0.15;
                ctx.strokeStyle = `rgba(148, 163, 184, ${linkOpacity})`; // Slate-400
                ctx.stroke();
            }
        }
        
        // 7. Draw Connection to Mouse (if close)
        if (dist < interactionRadius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            const mouseLinkOpacity = (1 - dist / interactionRadius) * 0.1;
            ctx.strokeStyle = `rgba(59, 130, 246, ${mouseLinkOpacity})`; // Blue connection
            ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial center
    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const Hero: React.FC<HeroProps> = ({ onLearnMore }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-white to-transparent">
      
      {/* Dynamic Animated Blobs for Depth */}
      <motion.div 
         animate={{ 
           rotate: [0, 360],
           scale: [0.8, 1.2, 0.8],
           x: [0, 50, 0]
         }}
         transition={{ 
           duration: 35, 
           repeat: Infinity, 
           ease: "linear" 
         }}
         className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-[100px] pointer-events-none opacity-60"
      />
      
      <motion.div 
         animate={{ 
           rotate: [360, 0],
           scale: [1, 1.3, 1],
           y: [0, -50, 0]
         }}
         transition={{ 
           duration: 40, 
           repeat: Infinity, 
           ease: "linear" 
         }}
         className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] bg-gradient-to-tl from-purple-200/20 to-transparent rounded-full blur-[120px] pointer-events-none opacity-60"
      />

      <ParticleBackground />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/60 shadow-sm text-xs font-semibold text-gray-700 mb-8 cursor-default ring-1 ring-black/5"
          >
            <Cpu size={14} className="text-blue-600 animate-pulse" />
            <span>AI-First Consulting Architecture</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 mb-8 drop-shadow-sm">
            Precision in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500">
              Automation & Strategy
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
        >
          We help organizations achieve radical cost reduction and operational excellence by deploying intelligent AI agents and assessing processes to find gaps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={onLearnMore}
            className="group bg-black text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:bg-gray-800 hover:scale-105 hover:shadow-xl shadow-lg flex items-center gap-2 backdrop-blur-sm"
          >
            Explore Expertise
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 rounded-full text-lg font-medium text-gray-700 transition-all hover:bg-white/80 hover:shadow-lg flex items-center gap-2 border border-gray-200 backdrop-blur-md bg-white/40">
            <TrendingUp size={20} />
            View Results
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;