import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ArrowRight } from 'lucide-react';

interface CallToActionProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const h = t.home;

  return (
    <section className="py-24 bg-[#1a1819] border-t border-white/5">
       <div className="container mx-auto px-4 text-center">
          <h2 className={`font-header text-3xl md:text-5xl text-white mb-6 ${lang === 'jp' ? 'font-jp' : ''}`}>
             {h.contactTitle}
          </h2>
          <p className={`text-aavo-silver text-lg max-w-2xl mx-auto mb-10 ${lang === 'jp' ? 'font-jp' : ''}`}>
             {h.contactDesc}
          </p>
          <Link
             to="/contact"
             className="inline-flex items-center gap-3 border border-white/30 text-white hover:border-aavo-green hover:text-aavo-green px-10 py-4 rounded-sm font-header font-bold uppercase tracking-widest transition-all group"
          >
             {h.contactBtn}
             <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
       </div>
    </section>
  );
};

export default CallToAction;
