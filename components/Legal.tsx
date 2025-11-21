import React, { useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ArrowLeft } from 'lucide-react';

interface LegalProps {
  lang: Language;
  type: 'privacy' | 'terms' | 'refund';
  onBack: () => void;
}

const Legal: React.FC<LegalProps> = ({ lang, type, onBack }) => {
  const t = TRANSLATIONS[lang].legal[type];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  return (
    <div className="pt-32 pb-24 bg-aavo-dark animate-fade-in">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-aavo-silver hover:text-aavo-green transition-colors mb-10 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-header text-sm uppercase tracking-wider">
            {lang === 'en' ? 'Back to Home' : 'ホームに戻る'}
          </span>
        </button>

        {/* Content Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className={`font-header text-3xl md:text-5xl text-white mb-4 ${lang === 'jp' ? 'font-jp' : ''}`}>
            {t.title}
          </h1>
          <p className="text-aavo-silver/60 text-sm">
            {lang === 'en' ? 'Last Updated:' : '最終更新日:'} {t.lastUpdated}
          </p>
        </div>

        {/* Legal Sections */}
        <div className="space-y-10">
          {t.sections.map((section, index) => (
            <div key={index} className="bg-[#231F20] p-8 rounded-lg border border-white/5">
              <h2 className={`text-xl font-bold text-white mb-4 ${lang === 'jp' ? 'font-jp' : 'font-header'}`}>
                {section.title}
              </h2>
              <p className={`text-aavo-silver leading-relaxed whitespace-pre-line ${lang === 'jp' ? 'font-jp' : 'font-body'}`}>
                {section.content}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Legal;