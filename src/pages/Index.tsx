
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Calculator from "@/components/Calculator";
import Solutions from "@/components/Solutions";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href') || "");
        if (!target) return;
        
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80, // Offset for navbar
          behavior: 'smooth'
        });
      });
    });
    
    // Initialize with fade-in animation
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
      element.classList.add('opacity-100');
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function () {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Calculator />
        <Dashboard />
        <Solutions />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
