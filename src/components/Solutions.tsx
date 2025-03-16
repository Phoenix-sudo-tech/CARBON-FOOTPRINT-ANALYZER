
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  Leaf, 
  Lightbulb, 
  Car, 
  Recycle, 
  Home, 
  ShoppingCart,
  ArrowRight
} from "lucide-react";

const Solutions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add('opacity-100');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  const solutions = [
    {
      icon: <Car className="h-7 w-7" />,
      title: "Transportation",
      description: "Switch to electric vehicles, use public transport, bike, or walk for short distances.",
      tips: [
        "Carpool with colleagues for commuting",
        "Consider hybrid or electric for your next vehicle",
        "Combine errands to reduce trips",
        "Maintain your vehicle for optimal efficiency"
      ]
    },
    {
      icon: <Home className="h-7 w-7" />,
      title: "Home Energy",
      description: "Improve insulation, use energy-efficient appliances, and consider renewable energy sources.",
      tips: [
        "Switch to LED lighting throughout your home",
        "Install a programmable thermostat",
        "Unplug devices when not in use",
        "Consider solar panels for clean energy"
      ]
    },
    {
      icon: <ShoppingCart className="h-7 w-7" />,
      title: "Consumption",
      description: "Choose local and seasonal products, reduce meat consumption, and minimize food waste.",
      tips: [
        "Shop locally and seasonally",
        "Try plant-based meals several times a week",
        "Buy in bulk to reduce packaging",
        "Plan meals to reduce food waste"
      ]
    },
    {
      icon: <Recycle className="h-7 w-7" />,
      title: "Waste",
      description: "Reduce, reuse, recycle, and compost to minimize waste sent to landfills.",
      tips: [
        "Start a compost bin for food scraps",
        "Use reusable items instead of disposables",
        "Repair items rather than replacing them",
        "Properly sort recyclables"
      ]
    }
  ];

  return (
    <section 
      id="solutions" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-carbon-light/30"
    >
      <div className="section-container">
        <div className="text-center mb-12 animate-on-scroll opacity-0 transition-all duration-700">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-carbon-light text-carbon-dark text-sm font-medium">
            Make A Difference
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
            Practical <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Small changes in daily habits can lead to significant reductions in your carbon footprint.
            Here are some effective ways to make a positive impact.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="animate-on-scroll opacity-0 transition-all duration-700 glassmorphism rounded-xl p-6 relative group hover:shadow-lg"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-carbon-primary to-carbon-dark rounded-t-xl transform origin-left scale-x-0 transition-transform group-hover:scale-x-100 duration-300"></div>
              
              <div className="flex flex-col h-full">
                <div className="mb-4 p-3 bg-carbon-light/50 rounded-lg inline-flex items-center justify-center w-14 h-14 text-carbon-primary">
                  {solution.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{solution.description}</p>
                
                <div className="mt-auto">
                  <h4 className="text-sm font-medium mb-2">Quick Tips:</h4>
                  <ul className="space-y-1">
                    {solution.tips.map((tip, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Leaf className="h-4 w-4 text-carbon-primary mr-2 mt-1 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center animate-on-scroll opacity-0 transition-all duration-700">
          <div className="max-w-3xl mx-auto glassmorphism rounded-xl p-6 md:p-8">
            <Lightbulb className="h-10 w-10 text-carbon-primary mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Ready to go beyond individual action?</h3>
            <p className="text-muted-foreground mb-6">
              Join community initiatives, support climate policies, and advocate for systemic changes in your workplace and community.
            </p>
            <a 
              href="#calculator" 
              className="inline-flex h-11 items-center justify-center rounded-md bg-carbon-primary px-8 py-2 text-base font-medium text-primary-foreground shadow transition-all hover:bg-carbon-dark hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Take Action Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
