import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, COMPANY_PHONE, INQUIRY_PHONE, CONTACT_EMAIL, FACEBOOK_URL, TIKTOK_URL, WHATSAPP_URL, VIBER_URL } from '../constants';
import { MapPin, Phone, Mail, Clock, Share2, CheckCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

// Loading Spinner Component
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const c = t.contact;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only require reCAPTCHA if the site key is configured
    const recaptchaEnabled = import.meta.env.VITE_RECAPTCHA_SITE_KEY && import.meta.env.VITE_RECAPTCHA_SITE_KEY !== 'your_recaptcha_site_key';

    if (recaptchaEnabled && !captchaToken) {
      alert(lang === 'en' ? 'Please complete the reCAPTCHA verification.' : 'reCAPTCHA認証を完了してください。');
      return;
    }

    setIsSubmitting(true);

    if (!form.current) return;

    // Create template params object
    const formData = new FormData(form.current);
    const templateParams = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      message: formData.get('message'),
      time: new Date().toLocaleString(lang === 'en' ? 'en-US' : 'ja-JP', { timeZone: 'Asia/Tokyo' }),
      'g-recaptcha-response': captchaToken, // Add reCAPTCHA token
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setIsSent(true);
    } catch (error) {
      console.error('FAILED...', error);
      alert(lang === 'en' ? 'Failed to send message. Please try again.' : 'メッセージの送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
      setCaptchaToken(null); // Reset captcha token after submission attempt
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="pt-32 pb-24 bg-[#231F20] relative overflow-hidden animate-fade-in">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aavo-green/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aavo-silver/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="mb-16 text-center md:text-left border-b border-white/10 pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font - header text - 4xl md: text - 6xl text - white mb - 4 ${lang === 'jp' ? 'font-jp' : ''} `}
          >
            {c.title}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-aavo-green mx-auto md:mx-0"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`mt - 6 text - aavo - silver max - w - 2xl text - lg ${lang === 'jp' ? 'font-jp' : ''} `}
          >
            {c.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Column: Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="space-y-8"
          >
            <div className="bg-[#2A2A2A] p-8 rounded-lg border border-white/5 shadow-xl hover:border-aavo-green/30 transition-all">
              <h3 className={`text - white font - header text - xl mb - 6 border - b border - white / 10 pb - 2 ${lang === 'jp' ? 'font-jp' : ''} `}>
                {lang === 'en' ? 'Information' : '基本情報'}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-aavo-green/10 p-3 rounded text-aavo-green shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className="block text-aavo-silver text-xs uppercase tracking-wider mb-1">{c.info.office}</span>
                    <p className={`text - white text - lg ${lang === 'jp' ? 'font-jp' : ''} `}>
                      {t.footer.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-aavo-green/10 p-3 rounded text-aavo-green shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <span className="block text-aavo-silver text-xs uppercase tracking-wider mb-1">{c.info.phone}</span>
                    <div className="space-y-1">
                      <a href={WHATSAPP_URL} className="text-white text-lg hover:text-aavo-green transition-colors block">
                        +81 80 7975 5742 (WhatsApp/Viber)
                      </a>
                      <a href={`tel:${INQUIRY_PHONE.replace(/-/g, '')} `} className="text-white text-lg hover:text-aavo-green transition-colors block">
                        {INQUIRY_PHONE} (Call)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-aavo-green/10 p-3 rounded text-aavo-green shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <span className="block text-aavo-silver text-xs uppercase tracking-wider mb-1">{c.info.email}</span>
                    <a href={`mailto:${CONTACT_EMAIL} `} className="text-white text-lg hover:text-aavo-green transition-colors block break-all">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-aavo-green/10 p-3 rounded text-aavo-green shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <span className="block text-aavo-silver text-xs uppercase tracking-wider mb-1">{c.info.hours}</span>
                    <p className={`text - white text - lg ${lang === 'jp' ? 'font-jp' : ''} `}>
                      08:00 - 18:00
                    </p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex items-start gap-4 border-t border-white/10 pt-6 mt-6">
                  <div className="bg-aavo-green/10 p-3 rounded text-aavo-green shrink-0">
                    <Share2 size={24} />
                  </div>
                  <div>
                    <span className="block text-aavo-silver text-xs uppercase tracking-wider mb-3">{lang === 'en' ? 'Follow Us' : 'SNS'}</span>
                    <div className="flex gap-4">
                      <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-aavo-green hover:text-aavo-dark transition-colors" aria-label="Facebook">
                        <i className="fa-brands fa-facebook-f text-xl"></i>
                      </a>
                      <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-aavo-green hover:text-aavo-dark transition-colors" aria-label="TikTok">
                        <i className="fa-brands fa-tiktok text-xl"></i>
                      </a>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-aavo-green hover:text-aavo-dark transition-colors" aria-label="WhatsApp">
                        <i className="fa-brands fa-whatsapp text-xl"></i>
                      </a>
                      <a href={VIBER_URL} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-aavo-green hover:text-aavo-dark transition-colors" aria-label="Viber">
                        <i className="fa-brands fa-viber text-xl"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
          >
            <div className="bg-[#2A2A2A] p-8 md:p-10 rounded-lg border border-white/5 shadow-2xl relative overflow-hidden">
              {isSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-20 text-center"
                >
                  <div className="w-20 h-20 bg-aavo-green/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-aavo-green" />
                  </div>
                  <h3 className={`text - 2xl text - white font - header mb - 2 ${lang === 'jp' ? 'font-jp' : ''} `}>
                    {lang === 'en' ? 'Message Sent!' : '送信完了'}
                  </h3>
                  <p className="text-aavo-silver">{c.form.success}</p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="mt-8 text-sm text-aavo-green underline hover:text-white transition-colors"
                  >
                    {lang === 'en' ? 'Send another message' : '別のメッセージを送る'}
                  </button>
                </motion.div>
              ) : (
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <h3 className={`text - white font - header text - 2xl mb - 8 ${lang === 'jp' ? 'font-jp' : ''} `}>
                    {lang === 'en' ? 'Send us a Message' : 'メッセージを送る'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`block text - aavo - silver text - sm ${lang === 'jp' ? 'font-jp' : ''} `}>{c.form.name}</label>
                      <input type="text" name="name" required className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-aavo-green focus:outline-none focus:bg-black/60 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text - aavo - silver text - sm ${lang === 'jp' ? 'font-jp' : ''} `}>{c.form.company}</label>
                      <input type="text" name="company" className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-aavo-green focus:outline-none focus:bg-black/60 transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`block text - aavo - silver text - sm ${lang === 'jp' ? 'font-jp' : ''} `}>{c.form.email}</label>
                      <input type="email" name="email" required className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-aavo-green focus:outline-none focus:bg-black/60 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text - aavo - silver text - sm ${lang === 'jp' ? 'font-jp' : ''} `}>{c.form.phone}</label>
                      <input type="tel" name="phone" className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-aavo-green focus:outline-none focus:bg-black/60 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text - aavo - silver text - sm ${lang === 'jp' ? 'font-jp' : ''} `}>{c.form.message}</label>
                    <textarea name="message" required rows={5} className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-aavo-green focus:outline-none focus:bg-black/60 transition-all resize-none"></textarea>
                  </div>

                  <div className="flex justify-center">
                    {import.meta.env.VITE_RECAPTCHA_SITE_KEY && import.meta.env.VITE_RECAPTCHA_SITE_KEY !== 'your_recaptcha_site_key' && (
                      <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                        theme="dark"
                      />
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || (import.meta.env.VITE_RECAPTCHA_SITE_KEY && import.meta.env.VITE_RECAPTCHA_SITE_KEY !== 'your_recaptcha_site_key' && !captchaToken)}
                    className={`w-full bg-aavo-green text-aavo-dark font-bold font-header py-4 rounded-sm hover:bg-white transition-all duration-300 uppercase tracking-wider shadow-lg shadow-aavo-green/10 flex items-center justify-center gap-3 ${isSubmitting || (import.meta.env.VITE_RECAPTCHA_SITE_KEY && import.meta.env.VITE_RECAPTCHA_SITE_KEY !== 'your_recaptcha_site_key' && !captchaToken) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-aavo-dark border-t-transparent rounded-full"></div>
                        <span>{lang === 'en' ? 'Sending...' : '送信中...'}</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {c.form.submit}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;