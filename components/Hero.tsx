import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop", // Spices / Grains
    alt: "Premium Asian Spices and Grains"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=2000&auto=format&fit=crop", // Rice Fields / Agriculture
    alt: "Authentic Basmati Rice Fields"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2000&auto=format&fit=crop", // Meat
    alt: "High Quality Halal Meats"
  }
];

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-aavo-dark">

      {/* Image Slider */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient at the bottom ONLY for text readability, strictly no full overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 border border-aavo-green/50 rounded-full bg-black/60 backdrop-blur-md">
            <span className="text-aavo-green text-xs md:text-sm font-header tracking-[0.2em] uppercase">
               {lang === 'en' ? 'Asian Grocery Import Specialist' : 'アジア食品・輸入卸専門店'}
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`font-header font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-lg ${lang === 'jp' ? 'font-jp' : ''}`}
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className={`font-body text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 drop-shadow-md ${lang === 'jp' ? 'font-jp' : ''}`}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-aavo-green text-aavo-dark font-bold px-8 py-4 rounded-sm hover:bg-white transition-colors duration-300 font-header tracking-wide group shadow-lg shadow-aavo-green/20"
          >
            {t.hero.cta}
            <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-aavo-green' : 'w-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
