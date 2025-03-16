
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-border py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-carbon-primary" />
              <span className="text-xl font-display font-semibold tracking-tight text-gradient">
                CarbonTrack
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Empowering individuals to understand their environmental impact and make sustainable choices.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-carbon-primary transition-colors">
                  About Carbon Footprints
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-muted-foreground hover:text-carbon-primary transition-colors">
                  Carbon Calculator
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-muted-foreground hover:text-carbon-primary transition-colors">
                  Sustainable Solutions
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-carbon-primary transition-colors">
                  Climate Science Basics
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-carbon-primary transition-colors">
                  Sustainability Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-carbon-primary transition-colors">
                  Research & Reports
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Join our newsletter for tips and updates on sustainable living.
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Your email"
                className="bg-background border border-input px-3 py-2 text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-carbon-primary w-full"
              />
              <button className="bg-carbon-primary text-white px-3 py-2 text-sm rounded-r-md hover:bg-carbon-dark transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} CarbonTrack. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-carbon-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-carbon-primary transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-carbon-primary transition-colors text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
