import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { TRANSLATIONS, COMPANY_PHONE, INQUIRY_PHONE, CONTACT_EMAIL, FACEBOOK_URL, TIKTOK_URL, WHATSAPP_URL, VIBER_URL } from '../constants';
import { useData } from '../contexts/DataContext';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const { logoUrl } = useData();

  return (
    <footer id="contact" className="bg-black border-t border-aavo-silver/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              {logoUrl ? (
                <img src={logoUrl} alt="AAVO Wholesale Foods" className="h-16 w-auto object-contain" />
              ) : (
                <div className="flex items-center gap-3">
                  {/* Logo Icon SVG */}
                  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-aavo-green">
                    <rect x="5" y="5" width="90" height="90" rx="26" stroke="currentColor" strokeWidth="8" />
                    <path d="M20 44 L33 20 L46 44" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M54 44 L67 20 L80 44" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 56 L33 80 L46 56" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="67" cy="68" r="12" stroke="currentColor" strokeWidth="7" />
                  </svg>
                  <span className="font-header text-2xl text-white tracking-wide">AAVO</span>
                </div>
              )}
            </Link>
            <p className={`text-aavo-silver font-body leading-relaxed mb-6 ${lang === 'jp' ? 'font-jp' : ''}`}>
              {t.footer.address}
            </p>
            <div className="flex gap-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-aavo-silver hover:text-aavo-green transition-colors" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f text-2xl"></i>
              </a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-aavo-silver hover:text-aavo-green transition-colors" aria-label="TikTok">
                <i className="fa-brands fa-tiktok text-2xl"></i>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-aavo-silver hover:text-aavo-green transition-colors" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp text-2xl"></i>
              </a>
              <a href={VIBER_URL} target="_blank" rel="noopener noreferrer" className="text-aavo-silver hover:text-aavo-green transition-colors" aria-label="Viber">
                <i className="fa-brands fa-viber text-2xl"></i>
              </a>
            </div>
          </div>

          {/* Direct Contact */}
          <div>
            <h3 className={`font-header text-lg text-aavo-green mb-6 ${lang === 'jp' ? 'font-jp' : ''}`}>
              {lang === 'en' ? 'Direct Contact' : 'お問い合わせ'}
            </h3>
            <ul className="space-y-4 font-body text-white">
              <li className="flex items-center gap-2">
                <span className="text-aavo-silver w-24">WhatsApp:</span>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-aavo-green transition-colors">+{COMPANY_PHONE}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-aavo-silver w-24">Viber:</span>
                <a href={VIBER_URL} className="hover:text-aavo-green transition-colors">+{COMPANY_PHONE}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-aavo-silver w-24">Inquiry:</span>
                <a href={`tel:${INQUIRY_PHONE.replace(/-/g, '')}`} className="hover:text-aavo-green transition-colors">{INQUIRY_PHONE}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-aavo-silver w-24">Email:</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-aavo-green transition-colors break-all">{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>

          {/* Legal & Keywords */}
          <div>
             <h3 className={`font-header text-lg text-aavo-green mb-6 ${lang === 'jp' ? 'font-jp' : ''}`}>
              {lang === 'en' ? 'Information & Legal' : '情報・規約'}
            </h3>
            <ul className="space-y-3 font-body text-white mb-6">
              <li>
                <Link to="/privacy" className="text-aavo-silver hover:text-aavo-green transition-colors text-sm">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-aavo-silver hover:text-aavo-green transition-colors text-sm">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-aavo-silver hover:text-aavo-green transition-colors text-sm">
                  {t.footer.refund}
                </Link>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2">
              {['Asian Spices', 'Basmati Rice', 'Imported Meats', 'Halal Foods', 'Wholesale Japan'].map((keyword, i) => (
                <span key={i} className="text-xs text-aavo-silver/50 border border-aavo-silver/10 px-2 py-1 rounded">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-aavo-silver/10 pt-8 text-center flex flex-col items-center">
          <p className="text-aavo-silver/50 text-sm font-body">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
