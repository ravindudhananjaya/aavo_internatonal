import React, { useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, COMPANY_PHONE } from '../constants';
import { useData } from '../contexts/DataContext';
import { ArrowLeft, MessageCircle, Thermometer, MapPin, ShieldCheck, Package } from 'lucide-react';

interface SingleProductDetailProps {
  lang: Language;
  categoryId: string;
  productIndex: number;
  onBack: () => void;
  onProductSelect?: (categoryId: string, productIndex: number) => void;
}

const SingleProductDetail: React.FC<SingleProductDetailProps> = ({ lang, categoryId, productIndex, onBack, onProductSelect }) => {
  const t = TRANSLATIONS[lang];
  const td = t.productDetail;
  const { products } = useData();

  const category = products.find(p => p.id === categoryId);
  const product = category?.subProducts?.[productIndex];

  // Update SEO title
  useEffect(() => {
    if (product && category) {
      const prevTitle = document.title;
      document.title = `${product.name[lang]} | ${category.name[lang]} | AAVO Wholesale Foods`;
      return () => {
        document.title = prevTitle;
      };
    }
  }, [lang, product, category]);

  if (!category || !product) {
    return <div className="pt-32 text-white text-center">Product not found</div>;
  }

  const getWhatsAppLink = () => {
    const text = lang === 'en'
      ? `Hi, I am interested in wholesale inquiry for: ${product.name.en} from the ${category.name.en} category. Please provide pricing and availability.`
      : `こんにちは。${category.name.jp}カテゴリーの「${product.name.jp}」について卸売価格と在庫状況をお知らせください。`;
    return `https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-24 pb-20 bg-aavo-dark animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-aavo-silver hover:text-aavo-green transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-header text-sm uppercase tracking-wider">{td.backToHome}</span>
        </button>

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-aavo-silver/70">
          <span className="hover:text-aavo-green cursor-pointer" onClick={onBack}>
            {category.name[lang]}
          </span>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name[lang]}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Image */}
          <div className="relative rounded-xl overflow-hidden bg-[#2A2A2A] border border-aavo-silver/10 shadow-2xl">
            <img
              src={product.image}
              alt={product.name[lang]}
              className="w-full h-full object-cover min-h-[400px] lg:min-h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              {/* Category Badge */}
              <div className="inline-block px-3 py-1 border border-aavo-green/50 rounded-full text-aavo-green text-xs font-bold mb-4 tracking-widest uppercase">
                {category.name[lang]}
              </div>

              <h1 className={`font-header text-3xl md:text-5xl text-white mb-6 leading-tight ${lang === 'jp' ? 'font-jp' : ''}`}>
                {product.name[lang]}
              </h1>

              {/* Product Specs from Category */}
              <div className="flex flex-wrap gap-6 mb-8 text-sm text-aavo-silver font-body">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-aavo-green" />
                  <span className={lang === 'jp' ? 'font-jp' : ''}>{category.specs.origin[lang]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer size={18} className="text-aavo-green" />
                  <span className={lang === 'jp' ? 'font-jp' : ''}>{category.specs.temp[lang]}</span>
                </div>
                {category.specs.grade && (
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-aavo-green" />
                    <span>{category.specs.grade}</span>
                  </div>
                )}
              </div>

              {/* Category Description */}
              <div className="bg-[#2A2A2A]/50 rounded-lg p-6 mb-8 border border-aavo-silver/10">
                <h3 className={`font-header text-white mb-3 flex items-center gap-2 ${lang === 'jp' ? 'font-jp' : ''}`}>
                  <Package size={18} className="text-aavo-green" />
                  {lang === 'en' ? 'About This Product' : 'この商品について'}
                </h3>
                <p className={`text-gray-300 leading-relaxed ${lang === 'jp' ? 'font-jp' : ''}`}>
                  {category.description[lang]}
                </p>
              </div>

              {/* WhatsApp Inquiry Section */}
              <div className="bg-gradient-to-r from-aavo-green/10 to-transparent border border-aavo-green/30 rounded-lg p-6 mb-8">
                <h3 className={`font-header text-white text-lg mb-3 ${lang === 'jp' ? 'font-jp' : ''}`}>
                  {lang === 'en' ? 'Wholesale Inquiries' : '卸売のお問い合わせ'}
                </h3>
                <p className={`text-aavo-silver text-sm mb-4 ${lang === 'jp' ? 'font-jp' : ''}`}>
                  {lang === 'en'
                    ? 'Contact us via WhatsApp for pricing, minimum order quantities, and availability.'
                    : 'WhatsAppで価格、最小注文数量、在庫状況についてお問い合わせください。'}
                </p>
                <div className="flex items-center gap-3 text-aavo-silver text-sm mb-4">
                  <MessageCircle size={16} className="text-aavo-green" />
                  <span>+{COMPANY_PHONE.replace(/(\d{2})(\d{4})(\d{4})(\d{2})/, '$1 $2 $3 $4')}</span>
                </div>
              </div>

              {/* Main CTA */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-aavo-green text-aavo-dark hover:bg-white hover:text-aavo-dark px-8 py-4 rounded-sm font-header font-bold text-lg uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-aavo-green/20 hover:shadow-xl"
              >
                <MessageCircle size={24} />
                {lang === 'en' ? 'Inquire on WhatsApp' : 'WhatsAppでお問い合わせ'}
              </a>
              <p className="mt-4 text-aavo-silver/50 text-xs text-center">
                {lang === 'en'
                  ? '* Wholesale inquiries only. Minimum Order Quantities apply.'
                  : '※ 卸売専用です。最小注文数量が適用されます。'}
              </p>
            </div>
          </div>
        </div>

        {/* Other Products in Category */}
        {category.subProducts && category.subProducts.length > 1 && (
          <div className="mt-16 border-t border-aavo-silver/10 pt-12">
            <h2 className={`font-header text-2xl text-white mb-8 ${lang === 'jp' ? 'font-jp' : ''}`}>
              {lang === 'en' ? 'Other Products in This Category' : 'このカテゴリーの他の商品'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.subProducts
                .filter((_, idx) => idx !== productIndex)
                .slice(0, 5)
                .map((item, idx) => {
                  const originalIndex = category.subProducts!.findIndex(
                    (sp) => sp.name.en === item.name.en && sp.image === item.image
                  );
                  return (
                    <div
                      key={idx}
                      className="group bg-[#231F20] border border-aavo-silver/10 rounded-lg overflow-hidden hover:border-aavo-green/30 transition-all cursor-pointer"
                      onClick={() => {
                        if (onProductSelect) {
                          onProductSelect(categoryId, originalIndex);
                        }
                      }}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name[lang]}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className={`text-white text-xs md:text-sm ${lang === 'jp' ? 'font-jp' : 'font-header'}`}>
                          {item.name[lang]}
                        </h3>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductDetail;
