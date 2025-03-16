import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 dark-transition
        ${isScrolled ? 'py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'}
      `}
    >
      <nav className="section-container flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className="text-lg md:text-xl font-bold text-carbon-primary dark:text-carbon-accent">
            CARBON FOOTPRINT <span className="text-carbon-dark dark:text-carbon-light">ANALYZER</span>
          </span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-sm transition-colors hover:text-carbon-primary dark:hover:text-carbon-accent">About</a>
          <a href="#calculator" className="text-sm transition-colors hover:text-carbon-primary dark:hover:text-carbon-accent">Calculator</a>
          <a href="#dashboard" className="text-sm transition-colors hover:text-carbon-primary dark:hover:text-carbon-accent">Dashboard</a>
          <a href="#solutions" className="text-sm transition-colors hover:text-carbon-primary dark:hover:text-carbon-accent">Solutions</a>
          <ThemeToggle />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle className="mr-4" />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background dark:bg-gray-900 shadow-md md:hidden animate-slide-down">
          <div className="section-container py-4 flex flex-col space-y-4">
            <a 
              href="#about" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#calculator" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Calculator
            </a>
            <a 
              href="#dashboard" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </a>
            <a 
              href="#solutions" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Solutions
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
