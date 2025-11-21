import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import CallToAction from './CallToAction';
import { Truck, Globe, Award, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

const About: React.FC<AboutProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const icons = [Truck, Globe, Award];

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
    <section id="about" className="pt-32 pb-24 bg-[#231F20] border-b border-aavo-silver/10 relative overflow-hidden animate-fade-in">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-aavo-silver/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Page Header Style */}
        <div className="mb-16 text-center md:text-left border-b border-white/10 pb-8">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`font-header text-4xl md:text-6xl text-white mb-4 ${lang === 'jp' ? 'font-jp' : ''}`}
            >
                {t.nav.about}
            </motion.h1>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1 bg-aavo-green mx-auto md:mx-0"
            ></motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Left Column: Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
          >
            <span className="text-aavo-green font-header text-sm uppercase tracking-widest mb-2 block">
               {lang === 'en' ? 'Our Story' : '私たちの物語'}
            </span>
            <h2 className={`font-header text-2xl md:text-4xl text-white mb-8 leading-tight ${lang === 'jp' ? 'font-jp' : ''}`}>
              {t.about.title}
            </h2>
            <h3 className={`font-body text-xl text-white/90 mb-6 ${lang === 'jp' ? 'font-jp' : ''}`}>
              {t.about.subtitle}
            </h3>
            <p className={`text-aavo-silver text-lg leading-relaxed mb-10 font-body ${lang === 'jp' ? 'font-jp' : ''}`}>
              {t.about.description}
            </p>

            {/* Stats / Features */}
            <div className="grid grid-cols-1 gap-6">
              {t.about.features.map((feature, index) => {
                const Icon = icons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 bg-white/5 p-6 rounded-lg border border-white/10 hover:border-aavo-green/30 transition-colors shadow-lg"
                  >
                    <div className="bg-aavo-green/20 p-3 rounded-full text-aavo-green shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className={`text-white font-bold mb-2 font-header text-lg ${lang === 'jp' ? 'font-jp' : ''}`}>
                        {feature.title}
                      </h4>
                      <p className={`text-gray-400 text-sm leading-relaxed ${lang === 'jp' ? 'font-jp' : ''}`}>
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Image & Vision */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="relative mt-8 lg:mt-0 flex flex-col gap-8"
          >
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden border border-aavo-silver/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=1000&auto=format&fit=crop"
                alt="AAVO Wholesale Spices and Ingredients"
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-aavo-green/20 to-transparent mix-blend-overlay pointer-events-none"></div>
            </div>

            {/* Mission & Vision Container */}
            <div className="grid grid-cols-1 gap-6 relative">
                 {/* Decorative BG for cards */}
                <div className="absolute -inset-4 bg-white/5 rounded-2xl -z-10 blur-xl opacity-50"></div>

                {/* Mission Card */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-[#2A2A2A] p-8 rounded-lg border border-white/5 relative overflow-hidden hover:border-aavo-green/30 transition-colors group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Award size={80} className="text-white"/>
                    </div>
                    <div className="flex items-center gap-3 mb-4 border-b border-aavo-green/30 pb-2">
                         <Award className="text-aavo-green" size={24}/>
                         <h4 className={`text-white font-bold font-header text-xl ${lang === 'jp' ? 'font-jp' : ''}`}>
                            {lang === 'en' ? 'Our Mission' : 'ミッション'}
                        </h4>
                    </div>
                    <p className="text-aavo-silver italic text-sm leading-relaxed relative z-10">
                        "{lang === 'en'
                            ? 'To provide the most authentic Asian ingredients to kitchens around the world, ensuring quality, transparency, and reliability in every shipment.'
                            : '世界中のキッチンに最も本格的なアジアの食材を提供し、すべての出荷において品質、透明性、信頼性を保証すること。'}"
                    </p>
                </motion.div>

                 {/* Vision Card */}
                 <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-[#2A2A2A] p-8 rounded-lg border border-white/5 relative overflow-hidden hover:border-aavo-green/30 transition-colors group"
                 >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Eye size={80} className="text-white"/>
                    </div>
                    <div className="flex items-center gap-3 mb-4 border-b border-aavo-green/30 pb-2">
                         <Eye className="text-aavo-green" size={24}/>
                         <h4 className={`text-white font-bold font-header text-xl ${lang === 'jp' ? 'font-jp' : ''}`}>
                            {lang === 'en' ? 'Our Vision' : 'ビジョン'}
                        </h4>
                    </div>
                    <p className="text-aavo-silver italic text-sm leading-relaxed relative z-10">
                        "{lang === 'en'
                            ? 'To become the most trusted bridge between Asian producers and global markets, fostering cultural connection through the universal language of food.'
                            : 'アジアの生産者と世界市場を結ぶ最も信頼される架け橋となり、食という共通言語を通じて文化的なつながりを育むこと。'}"
                    </p>
                </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Company Profile Section */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
        >
          <h2 className={`font-header text-2xl md:text-3xl text-white mb-8 text-center ${lang === 'jp' ? 'font-jp' : ''}`}>
            {t.about.companyProfile.title}
          </h2>
          <div className="bg-[#2A2A2A] border border-aavo-silver/10 rounded-lg overflow-hidden">
            {t.about.companyProfile.items.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row md:items-center p-6 ${
                  index !== t.about.companyProfile.items.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <span className={`text-aavo-silver md:w-1/3 mb-2 md:mb-0 font-medium text-sm uppercase tracking-wider ${lang === 'jp' ? 'font-jp' : 'font-header'}`}>
                  {item.label}
                </span>
                <span className={`text-white md:w-2/3 text-lg ${lang === 'jp' ? 'font-jp' : ''}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
    <CallToAction lang={lang} onNavigate={onNavigate} />
    </>
  );
};

export default About;
