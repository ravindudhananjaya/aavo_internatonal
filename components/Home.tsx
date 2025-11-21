import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import CallToAction from './CallToAction';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { useData } from '../contexts/DataContext';
import { ArrowRight, Package, ShieldCheck, Globe, FileText, Star, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

const Home: React.FC<HomeProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const h = t.home;
  const { products } = useData();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Select a few sub-products for the "Featured" section dynamically
  const featuredProducts = products
    .flatMap(p => p.subProducts || [])
    .slice(0, 4); // Just take the first 4 available subproducts

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section */}
      <Hero lang={lang} onNavigate={onNavigate} />

      {/* 2. About Teaser Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 bg-[#231F20] border-b border-white/5"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.span variants={fadeInUp} className="text-aavo-green font-header text-sm uppercase tracking-widest mb-2 block">
                AAVO Wholesale Foods
              </motion.span>
              <motion.h2 variants={fadeInUp} className={`font-header text-3xl md:text-4xl text-white mb-6 leading-tight ${lang === 'jp' ? 'font-jp' : ''}`}>
                {h.aboutTitle}
              </motion.h2>
              <motion.p variants={fadeInUp} className={`text-aavo-silver text-lg leading-relaxed mb-8 font-body ${lang === 'jp' ? 'font-jp' : ''}`}>
                {h.aboutDesc}
              </motion.p>

              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="grid grid-cols-3 gap-4 mb-8">
                <motion.div variants={fadeInUp} className="text-center p-4 bg-white/5 rounded border border-white/10 hover:border-aavo-green/30 transition-colors">
                   <Globe className="mx-auto text-aavo-green mb-2" size={24} />
                   <span className="text-xs text-white font-header uppercase tracking-wide">Global Sourcing</span>
                </motion.div>
                <motion.div variants={fadeInUp} className="text-center p-4 bg-white/5 rounded border border-white/10 hover:border-aavo-green/30 transition-colors">
                   <ShieldCheck className="mx-auto text-aavo-green mb-2" size={24} />
                   <span className="text-xs text-white font-header uppercase tracking-wide">Quality Check</span>
                </motion.div>
                <motion.div variants={fadeInUp} className="text-center p-4 bg-white/5 rounded border border-white/10 hover:border-aavo-green/30 transition-colors">
                   <Package className="mx-auto text-aavo-green mb-2" size={24} />
                   <span className="text-xs text-white font-header uppercase tracking-wide">Bulk Supply</span>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-aavo-green pb-1 hover:text-aavo-green transition-colors"
                >
                  {h.learnMore}
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
                  alt="Warehouse"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                 <div className="absolute inset-0 bg-gradient-to-r from-[#231F20] via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 3. Categories Grid Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24 bg-[#1a1819]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className={`font-header text-3xl md:text-4xl text-white mb-4 ${lang === 'jp' ? 'font-jp' : ''}`}>
              {h.categoriesTitle}
            </motion.h2>
            <motion.p variants={fadeInUp} className={`text-aavo-silver max-w-2xl mx-auto text-lg ${lang === 'jp' ? 'font-jp' : ''}`}>
              {h.categoriesDesc}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
              >
                <Link
                  to="/products"
                  className="group relative h-64 rounded-lg overflow-hidden cursor-pointer border border-white/10 hover:border-aavo-green/50 transition-all shadow-lg block"
                >
                  <img
                    src={product.image}
                    alt={product.name[lang]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                  <div className="absolute bottom-0 left-0 p-6 w-full">
                     <h3 className={`text-xl font-header text-white mb-2 ${lang === 'jp' ? 'font-jp' : ''}`}>
                       {product.name[lang]}
                     </h3>
                     <div className="flex items-center gap-2 text-aavo-green text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                       View Products <ArrowRight size={14} />
                     </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Featured Products Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 bg-[#231F20] border-t border-white/5"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
             <motion.h2 variants={fadeInUp} className={`font-header text-3xl text-white ${lang === 'jp' ? 'font-jp' : ''}`}>
               {h.featuredTitle}
             </motion.h2>
             <motion.div variants={fadeInUp}>
               <Link
                  to="/products"
                  className="hidden md:flex items-center gap-2 text-aavo-silver hover:text-aavo-green transition-colors text-sm uppercase tracking-wider"
               >
                  View All <ArrowRight size={16} />
               </Link>
             </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {featuredProducts.map((item: any, idx) => (
               <motion.div variants={fadeInUp} key={idx} className="bg-[#2A2A2A] rounded-lg overflow-hidden border border-white/5 hover:border-aavo-green/30 transition-all hover:-translate-y-1 group">
                  <div className="aspect-square overflow-hidden relative">
                     <img src={item.image} alt={item.name[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                     <div className="absolute top-2 right-2 bg-aavo-green text-aavo-dark text-xs font-bold px-2 py-1 rounded-sm flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> Popular
                     </div>
                  </div>
                  <div className="p-4">
                     <h4 className={`text-white font-medium text-sm md:text-base truncate ${lang === 'jp' ? 'font-jp' : ''}`}>
                        {item.name[lang]}
                     </h4>
                  </div>
               </motion.div>
             ))}
             {featuredProducts.length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                    No featured products available.
                </div>
             )}
          </div>
           <div className="mt-8 text-center md:hidden">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-aavo-silver hover:text-aavo-green transition-colors text-sm uppercase tracking-wider border border-white/20 px-6 py-3 rounded"
             >
                View All Products
             </Link>
           </div>
        </div>
      </motion.section>

      {/* 5. FAQ Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-24 bg-[#1a1819] border-t border-white/5"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-aavo-green font-header text-sm uppercase tracking-widest mb-2 block">
               FAQ
            </span>
            <h2 className={`font-header text-3xl md:text-4xl text-white mb-4 ${lang === 'jp' ? 'font-jp' : ''}`}>
              {t.faq.title}
            </h2>
            <p className={`text-aavo-silver max-w-2xl mx-auto text-lg ${lang === 'jp' ? 'font-jp' : ''}`}>
              {t.faq.subtitle}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {t.faq.items.map((item, index) => (
              <div
                key={index}
                className="bg-[#231F20] border border-white/5 rounded-lg overflow-hidden transition-all hover:border-aavo-green/30"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className={`font-header font-bold text-lg text-white ${lang === 'jp' ? 'font-jp' : ''}`}>
                    {item.question}
                  </span>
                  <div className={`text-aavo-green transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    {openFaqIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0">
                    <p className={`text-aavo-silver leading-relaxed ${lang === 'jp' ? 'font-jp' : ''}`}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. Catalog Section (CTA) */}
      <section className="py-24 bg-[#231F20] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="bg-gradient-to-r from-aavo-green/20 to-aavo-green/5 border border-aavo-green/30 rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
            >
               <div className="md:w-2/3">
                  <div className="flex items-center gap-3 text-aavo-green mb-4">
                     <FileText size={24} />
                     <span className="font-header text-sm uppercase tracking-widest">Wholesale Catalog</span>
                  </div>
                  <h2 className={`font-header text-3xl md:text-5xl text-white mb-6 ${lang === 'jp' ? 'font-jp' : ''}`}>
                     {h.catalogTitle}
                  </h2>
                  <p className={`text-gray-300 text-lg mb-8 md:mb-0 ${lang === 'jp' ? 'font-jp' : ''}`}>
                     {h.catalogDesc}
                  </p>
               </div>
               <div className="md:w-1/3 flex justify-center md:justify-end">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                       to="/catalog"
                       className="bg-aavo-green text-aavo-dark font-header font-bold text-lg px-10 py-5 rounded-sm hover:bg-white transition-colors shadow-lg shadow-aavo-green/20 inline-block"
                    >
                       {h.catalogBtn}
                    </Link>
                  </motion.div>
               </div>
            </motion.div>
        </div>
      </section>

      {/* 7. Call To Action */}
      <CallToAction lang={lang} onNavigate={onNavigate} />
    </div>
  );
};

export default Home;
