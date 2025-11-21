
import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Lock, Download, CheckCircle, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Loading Spinner Component
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

interface CatalogGateProps {
  lang: Language;
}

const CatalogGate: React.FC<CatalogGateProps> = ({ lang }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsUnlocked(true);
      setIsModalOpen(false);
      // Automatically download or open link (Mock)
      window.alert("PDF Download Started (Mock)");
    }, 1500);
  };

  return (
    <section id="catalog" className="py-24 bg-[#1a1819] relative overflow-hidden">
       {/* Decorative Elements */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-aavo-green/5 rounded-full blur-3xl"></div>
       <div className="absolute bottom-0 left-0 w-96 h-96 bg-aavo-silver/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-[#231F20] border border-aavo-silver/20 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-aavo-dark border-2 border-aavo-green rounded-full mb-6">
            {isUnlocked ? <Download size={32} className="text-aavo-green" /> : <Lock size={32} className="text-aavo-silver" />}
          </div>

          <h2 className={`font-header text-2xl md:text-4xl text-white mb-4 ${lang === 'jp' ? 'font-jp' : ''}`}>
            {t.catalog.title}
          </h2>
          
          <p className={`font-body text-aavo-silver mb-10 text-lg ${lang === 'jp' ? 'font-jp' : ''}`}>
            {t.catalog.description}
          </p>

          {!isUnlocked ? (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-aavo-silver/10 hover:bg-aavo-green hover:text-aavo-dark text-white border border-aavo-silver/30 hover:border-aavo-green px-10 py-4 rounded-sm font-header font-bold transition-all duration-300 flex items-center justify-center gap-3 mx-auto uppercase tracking-widest"
            >
              <Lock size={18} />
              {t.catalog.buttonLocked}
            </button>
          ) : (
             <button 
              className="bg-aavo-green text-aavo-dark px-10 py-4 rounded-sm font-header font-bold transition-all duration-300 flex items-center justify-center gap-3 mx-auto uppercase tracking-widest cursor-pointer animate-pulse"
              onClick={() => window.alert("PDF Download (Mock)")}
            >
              <Download size={18} />
              {t.catalog.buttonUnlocked}
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => setIsModalOpen(false)}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-aavo-dark border border-aavo-green/30 w-full max-w-md p-8 rounded-xl shadow-2xl"
            >
              <h3 className={`font-header text-xl text-white mb-6 text-center ${lang === 'jp' ? 'font-jp' : ''}`}>
                {t.catalog.modalTitle}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    required 
                    placeholder={t.catalog.namePlaceholder}
                    className="w-full bg-[#1a1819] border border-aavo-silver/20 rounded p-3 text-white focus:border-aavo-green focus:outline-none transition-colors font-body"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    required 
                    placeholder={t.catalog.emailPlaceholder}
                    className="w-full bg-[#1a1819] border border-aavo-silver/20 rounded p-3 text-white focus:border-aavo-green focus:outline-none transition-colors font-body"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    required 
                    placeholder={t.catalog.phonePlaceholder}
                    className="w-full bg-[#1a1819] border border-aavo-silver/20 rounded p-3 text-white focus:border-aavo-green focus:outline-none transition-colors font-body"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-aavo-green text-aavo-dark font-bold font-header py-4 rounded hover:bg-white transition-colors mt-2 flex items-center justify-center gap-2 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      {lang === 'en' ? 'Processing...' : '処理中...'}
                    </>
                  ) : t.catalog.submit}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CatalogGate;
