import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { useData } from '../contexts/DataContext';
import { Lock, Download, CheckCircle, FileText, Package, Star, TrendingUp, Headphones } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import ReCAPTCHA from 'react-google-recaptcha';

// Loading Spinner Component
const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

interface CatalogProps {
    lang: Language;
}

const Catalog: React.FC<CatalogProps> = ({ lang }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const t = TRANSLATIONS[lang];
    const c = t.catalog;
    const { catalogUrl } = useData();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaToken) {
            alert(lang === 'en' ? 'Please complete the reCAPTCHA verification.' : 'reCAPTCHA認証を完了してください。');
            return;
        }

        setIsLoading(true);

        try {
            await addDoc(collection(db, 'catalog_requests'), {
                ...formData,
                createdAt: serverTimestamp(),
                status: 'new'
            });
            setIsUnlocked(true);
        } catch (error) {
            console.error("Error saving catalog request:", error);
            alert(lang === 'en' ? "An error occurred. Please try again." : "エラーが発生しました。もう一度お試しください。");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (catalogUrl) {
            window.open(catalogUrl, '_blank');
        } else {
            window.alert("Catalog PDF is currently being updated. Please contact us via WhatsApp.");
        }
    };

    const benefitIcons = [Star, TrendingUp, Package, Headphones];

    return (
        <section className="pt-32 pb-24 bg-[#231F20] relative overflow-hidden animate-fade-in">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aavo-green/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aavo-silver/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Page Header */}
                <div className="mb-16 text-center md:text-left border-b border-white/10 pb-8">
                    <h1 className={`font-header text-4xl md:text-6xl text-white mb-4 ${lang === 'jp' ? 'font-jp' : ''}`}>
                        {c.title}
                    </h1>
                    <div className="h-1 w-20 bg-aavo-green mx-auto md:mx-0"></div>
                    <p className={`mt-6 text-aavo-silver max-w-2xl text-lg ${lang === 'jp' ? 'font-jp' : ''}`}>
                        {c.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Form / Gate */}
                    <div className="lg:col-span-7">
                        <div className="bg-[#2A2A2A] border border-aavo-silver/10 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                            {/* Decorative Glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-aavo-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            {!isUnlocked ? (
                                <>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-full bg-aavo-green/10 flex items-center justify-center text-aavo-green">
                                            <Lock size={24} />
                                        </div>
                                        <h2 className={`text-2xl text-white font-header ${lang === 'jp' ? 'font-jp' : ''}`}>
                                            {c.modalTitle}
                                        </h2>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className={`text-aavo-silver text-sm ${lang === 'jp' ? 'font-jp' : ''}`}>{c.namePlaceholder}</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-black/40 border border-white/10 rounded p-4 text-white focus:border-aavo-green focus:outline-none transition-colors font-body placeholder-gray-600"
                                                    placeholder={c.namePlaceholder}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className={`text-aavo-silver text-sm ${lang === 'jp' ? 'font-jp' : ''}`}>{c.phonePlaceholder}</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-black/40 border border-white/10 rounded p-4 text-white focus:border-aavo-green focus:outline-none transition-colors font-body placeholder-gray-600"
                                                    placeholder={c.phonePlaceholder}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className={`text-aavo-silver text-sm ${lang === 'jp' ? 'font-jp' : ''}`}>{c.emailPlaceholder}</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-black/40 border border-white/10 rounded p-4 text-white focus:border-aavo-green focus:outline-none transition-colors font-body placeholder-gray-600"
                                                placeholder={c.emailPlaceholder}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`w-full bg-aavo-green text-aavo-dark font-bold font-header py-4 rounded-sm hover:bg-white transition-all duration-300 uppercase tracking-wider shadow-lg shadow-aavo-green/10 flex items-center justify-center gap-3 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Spinner />
                                                    <span>{lang === 'en' ? 'Processing...' : '処理中...'}</span>
                                                </>
                                            ) : (
                                                <>
                                                    {c.submit}
                                                </>
                                            )}
                                        </button>

                                        <div className="flex justify-center mt-6">
                                            <ReCAPTCHA
                                                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                                onChange={(token) => setCaptchaToken(token)}
                                                theme="dark"
                                            />
                                        </div>

                                        <p className="text-center text-xs text-aavo-silver/50 mt-4">
                                            * Your information is secure and used only for verification.
                                        </p>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-12 animate-fade-in">
                                    <div className="w-20 h-20 mx-auto bg-aavo-green/20 rounded-full flex items-center justify-center mb-6">
                                        <Download size={40} className="text-aavo-green" />
                                    </div>
                                    <h3 className={`text-2xl text-white font-header mb-4 ${lang === 'jp' ? 'font-jp' : ''}`}>
                                        {c.success}
                                    </h3>
                                    <p className="text-aavo-silver mb-8">
                                        {catalogUrl ? 'Click below to view the catalog.' : 'Catalog is being updated by the administrator.'}
                                    </p>
                                    <button
                                        onClick={handleDownload}
                                        className="inline-flex items-center gap-3 bg-aavo-green text-aavo-dark px-8 py-4 rounded-sm font-header font-bold uppercase tracking-wider hover:bg-white transition-colors"
                                    >
                                        <FileText size={20} />
                                        {c.buttonUnlocked}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Visual Preview of Content */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#2A2A2A] p-6 rounded border border-white/5 flex items-center gap-4">
                                <div className="bg-white/10 p-3 rounded text-white">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <span className="block text-aavo-green font-bold text-lg">500+</span>
                                    <span className="text-aavo-silver text-xs uppercase tracking-wide">Items Listed</span>
                                </div>
                            </div>
                            <div className="bg-[#2A2A2A] p-6 rounded border border-white/5 flex items-center gap-4">
                                <div className="bg-white/10 p-3 rounded text-white">
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <span className="block text-aavo-green font-bold text-lg">Updated</span>
                                    <span className="text-aavo-silver text-xs uppercase tracking-wide">Weekly Prices</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Benefits & Content List */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* Benefits */}
                        <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                            <h3 className={`text-xl text-white font-header mb-6 ${lang === 'jp' ? 'font-jp' : ''}`}>
                                {c.benefitsTitle}
                            </h3>
                            <ul className="space-y-4">
                                {c.benefits.map((benefit, idx) => {
                                    const Icon = benefitIcons[idx] || CheckCircle;
                                    return (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="mt-1 text-aavo-green shrink-0">
                                                <Icon size={20} />
                                            </div>
                                            <span className={`text-aavo-silver leading-relaxed ${lang === 'jp' ? 'font-jp' : ''}`}>
                                                {benefit}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* What's Inside */}
                        <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                            <h3 className={`text-xl text-white font-header mb-6 ${lang === 'jp' ? 'font-jp' : ''}`}>
                                {c.whatsInsideTitle}
                            </h3>
                            <div className="space-y-3">
                                {c.whatsInside.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-black/20 rounded border border-white/5 hover:border-aavo-green/30 transition-colors">
                                        <div className="w-1.5 h-1.5 bg-aavo-green rounded-full"></div>
                                        <span className={`text-gray-300 text-sm ${lang === 'jp' ? 'font-jp' : ''}`}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Catalog;
