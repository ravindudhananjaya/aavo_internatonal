import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { TRANSLATIONS, COMPANY_PHONE } from '../constants';
import { useData } from '../contexts/DataContext';
import CallToAction from './CallToAction';
import { MessageCircle, Thermometer, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductShowcaseProps {
  lang: Language;
  onProductSelect: (productId: string) => void;
  onNavigate: (sectionId: string) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ lang, onProductSelect, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const { products } = useData();

  const getWhatsAppLink = (productName: string) => {
    const text = lang === 'en'
      ? `Hi, I am interested in a quote for: ${productName}`
      : `こんにちは。以下の商品について見積もりをお願いします：${productName}`;
    return `https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(text)}`;
  };

  // Flatten all subproducts for the "All Products" view
  const allSubProducts = React.useMemo(() => {
    return products.flatMap(category =>
      (category.subProducts || []).map(sub => ({
        ...sub,
        categoryName: category.name
      }))
    );
  }, [products]);

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
      <section id="products" className="pt-32 pb-20 bg-aavo-dark relative animate-fade-in">
        {/* Decorative BG */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aavo-green/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">



          {/* All Products Grid */}
          <div className="pt-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`font-header text-4xl md:text-6xl text-white mb-10 text-center ${lang === 'jp' ? 'font-jp' : ''}`}
            >
              {t.products.allProductsTitle}
            </motion.h1>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {allSubProducts.map((subItem, idx) => (
                <motion.div
                  variants={item}
                  key={idx}
                  className="group bg-[#231F20] border border-aavo-silver/10 rounded-lg overflow-hidden hover:border-aavo-green/30 transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={subItem.image}
                      alt={subItem.name[lang]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>

                    {/* Quick Add / Inquiry Button Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                      <a
                        href={getWhatsAppLink(subItem.name[lang])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2 bg-aavo-green text-aavo-dark text-xs font-bold uppercase rounded-sm hover:bg-white"
                      >
                        <MessageCircle size={14} />
                        {t.products.requestQuote}
                      </a>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className={`text-xs text-aavo-green mb-1 block ${lang === 'jp' ? 'font-jp' : ''}`}>
                      {subItem.categoryName?.[lang]}
                    </span>
                    <h3 className={`text-white font-medium text-sm md:text-base mb-2 ${lang === 'jp' ? 'font-jp' : 'font-header'}`}>
                      {subItem.name[lang]}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>
      {/* Catalog Banner at bottom */}
      <Link to="/catalog" className="block bg-aavo-green py-6 text-center cursor-pointer hover:bg-white transition-colors group">
        <p className="text-aavo-dark font-header font-bold uppercase tracking-widest flex items-center justify-center gap-3">
          {lang === 'en' ? 'Looking for the full list? Download Catalog' : '全リストをお探しですか？ カタログをダウンロード'}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </p>
      </Link>
      <CallToAction lang={lang} onNavigate={onNavigate} />
    </>
  );
};

export default ProductShowcase;
