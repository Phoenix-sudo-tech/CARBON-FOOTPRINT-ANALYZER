
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Leaf, TreeDeciduous, Wind } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const icons = heroRef.current.querySelectorAll('.floating-icon');
      icons.forEach((icon) => {
        const speedX = parseFloat((icon as HTMLElement).dataset.speedX || "1");
        const speedY = parseFloat((icon as HTMLElement).dataset.speedY || "1");
        const moveX = (x - 0.5) * 30 * speedX;
        const moveY = (y - 0.5) * 30 * speedY;
        
        (icon as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-carbon-light rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-carbon-light rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse-slow animation-delay-1000"></div>
      </div>
      
      {/* Floating Icons */}
      <Wind 
        className="floating-icon absolute top-1/4 left-1/6 text-carbon-accent opacity-20 w-12 h-12 animate-float" 
        data-speed-x="1" 
        data-speed-y="1.5" 
      />
      <Leaf 
        className="floating-icon absolute bottom-1/4 right-1/4 text-carbon-primary opacity-20 w-10 h-10 animate-float" 
        style={{ animationDelay: '1s' }}
        data-speed-x="2" 
        data-speed-y="1"
      />
      <TreeDeciduous 
        className="floating-icon absolute top-1/3 right-1/6 text-carbon-dark opacity-20 w-14 h-14 animate-float" 
        style={{ animationDelay: '2s' }}
        data-speed-x="1.5" 
        data-speed-y="2"  
      />
      
      {/* Content */}
      <div className="relative z-10 section-container">
        <div className="max-w-3xl mx-auto text-center sequential-fade">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-carbon-light text-carbon-dark text-sm font-medium animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            Track • Reduce • Save
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            Understand Your <span className="text-gradient">Carbon Footprint</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            Discover how your everyday choices impact the environment, and find personalized solutions to live more sustainably while saving money.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <a 
              href="#calculator" 
              className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-md bg-carbon-primary px-8 py-2 text-base font-medium text-primary-foreground shadow transition-all hover:bg-carbon-dark hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Calculate My Footprint
            </a>
            <a 
              href="#about" 
              className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-base font-medium text-foreground shadow-sm hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
