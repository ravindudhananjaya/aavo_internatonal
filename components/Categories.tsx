import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { useData } from '../contexts/DataContext';
import CallToAction from './CallToAction';
import { Thermometer, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoriesProps {
    lang: Language;
    onProductSelect: (productId: string) => void;
    onNavigate: (sectionId: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ lang, onProductSelect, onNavigate }) => {
    const t = TRANSLATIONS[lang];
    const { products } = useData();

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <>
            <section id="categories" className="pt-32 pb-20 bg-aavo-dark relative animate-fade-in">
                {/* Decorative BG */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aavo-green/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">

                    {/* Page Header */}
                    <div className="mb-16 text-center md:text-left border-b border-white/10 pb-8">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className={`font-header text-4xl md:text-6xl text-white mb-4 ${lang === 'jp' ? 'font-jp' : ''}`}
                        >
                            {t.products.title}
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
                            className={`mt-6 text-aavo-silver max-w-2xl text-lg ${lang === 'jp' ? 'font-jp' : ''}`}
                        >
                            {lang === 'en'
                                ? 'Explore our comprehensive range of high-quality Asian ingredients, available for wholesale distribution across Japan.'
                                : '日本全国への卸売に対応した、高品質なアジア食材の包括的なラインナップをご覧ください。'}
                        </motion.p>
                    </div>

                    {/* Category Grid */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-24"
                    >
                        {products.map((product) => (
                            <motion.div
                                variants={item}
                                key={product.id}
                                onClick={() => onProductSelect(product.id)}
                                className="group bg-[#2A2A2A] border border-aavo-silver/10 rounded-lg overflow-hidden hover:border-aavo-green/50 transition-all duration-300 hover:shadow-xl hover:shadow-aavo-green/10 cursor-pointer flex flex-col"
                            >
                                {/* Image Container */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name[lang]}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A] to-transparent opacity-60"></div>

                                    {/* Hover overlay with "View Details" */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                                        <span className="text-white font-header text-sm border border-white/50 px-4 py-2 rounded-full flex items-center gap-2 bg-black/50 hover:bg-aavo-green hover:border-aavo-green hover:text-aavo-dark transition-colors">
                                            {t.products.viewDetails} <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative flex-grow flex flex-col">
                                    <h3 className={`font-header text-xl text-white mb-4 min-h-[3.5rem] ${lang === 'jp' ? 'font-jp' : ''}`}>
                                        {product.name[lang]}
                                    </h3>

                                    <div className="space-y-3 mb-8 flex-grow">
                                        <div className="flex items-start gap-3 text-aavo-silver text-sm font-body">
                                            <MapPin size={16} className="text-aavo-green shrink-0 mt-0.5" />
                                            <span className={lang === 'jp' ? 'font-jp' : ''}>{product.specs.origin[lang]}</span>
                                        </div>
                                        {product.specs.grade && (
                                            <div className="flex items-start gap-3 text-aavo-silver text-sm font-body">
                                                <div className="w-4 h-4 rounded-full border border-aavo-green flex items-center justify-center shrink-0 mt-0.5">
                                                    <div className="w-2 h-2 bg-aavo-green rounded-full"></div>
                                                </div>
                                                <span>{product.specs.grade}</span>
                                            </div>
                                        )}
                                        <div className="flex items-start gap-3 text-aavo-silver text-sm font-body">
                                            <Thermometer size={16} className="text-aavo-green shrink-0 mt-0.5" />
                                            <span className={lang === 'jp' ? 'font-jp' : ''}>{product.specs.temp[lang]}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </section>
            <CallToAction lang={lang} onNavigate={onNavigate} />
        </>
    );
};

export default Categories;
