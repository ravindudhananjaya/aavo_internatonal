import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS, COMPANY_PHONE } from '../constants';
import { useData } from '../contexts/DataContext';
import { ArrowLeft, MessageCircle, Thermometer, MapPin, Info, ShieldCheck, Package } from 'lucide-react';
import SEO from './SEO';

interface ProductDetailProps {
  lang: Language;
  productId: string; // Changed from product object to ID to allow lookup
  onBack: () => void;
  onProductSelect?: (categoryId: string, productIndex: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ lang, productId, onBack, onProductSelect }) => {
  const t = TRANSLATIONS[lang];
  const td = t.productDetail;
  const { products } = useData();

  const product = products.find(p => p.id === productId);

  if (!product) return <div className="pt-32 text-white text-center">Product not found</div>;

  const getWhatsAppLink = (specificItem?: string) => {
    let text = "";
    if (specificItem) {
      text = lang === 'en'
        ? `Hi, I am interested in a quote for ${specificItem} from the ${product.name.en} category.`
        : `こんにちは。${product.name.jp}カテゴリーの「${specificItem}」について見積もりをお願いします。`;
    } else {
      text = lang === 'en'
        ? `Hi, I am interested in a quote for: ${product.name.en}`
        : `こんにちは。以下の商品について見積もりをお願いします：${product.name.jp}`;
    }
    return `https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-24 pb-20 bg-aavo-dark animate-fade-in">
      <SEO
        title={product.name[lang]}
        description={product.description[lang]}
        image={product.image}
        lang={lang === 'en' ? 'en' : 'jp'}
        url={`https://aavointernational.com/products/${productId}`}
      />
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-aavo-silver hover:text-aavo-green transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-header text-sm uppercase tracking-wider">{td.backToHome}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Image */}
          <div className="relative rounded-xl overflow-hidden bg-[#2A2A2A] border border-aavo-silver/10 shadow-2xl">
            <img
              src={product.image}
              alt={product.name[lang]}
              className="w-full h-full object-cover min-h-[400px] lg:min-h-[600px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 border border-aavo-green/50 rounded-full text-aavo-green text-xs font-bold mb-4 tracking-widest uppercase">
                {product.specs.grade || "Premium"}
              </div>
              <h1 className={`font-header text-3xl md:text-5xl text-white mb-6 leading-tight ${lang === 'jp' ? 'font-jp' : ''}`}>
                {product.name[lang]}
              </h1>

              {/* Quick Specs Icons */}
              <div className="flex flex-wrap gap-6 mb-8 text-sm text-aavo-silver font-body">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-aavo-green" />
                  <span className={lang === 'jp' ? 'font-jp' : ''}>{product.specs.origin[lang]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer size={18} className="text-aavo-green" />
                  <span className={lang === 'jp' ? 'font-jp' : ''}>{product.specs.temp[lang]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-aavo-green" />
                  <span className={lang === 'jp' ? 'font-jp' : ''}>{td.qualityCertified}</span>
                </div>
              </div>

              <p className={`text-gray-300 leading-relaxed text-lg mb-10 ${lang === 'jp' ? 'font-jp' : ''}`}>
                {product.description[lang]}
              </p>

              {/* Detailed Specs Table */}
              <div className="bg-[#2A2A2A]/50 rounded-lg p-6 mb-10 border border-aavo-silver/10">
                <h3 className={`font-header text-white mb-4 flex items-center gap-2 ${lang === 'jp' ? 'font-jp' : ''}`}>
                  <Info size={18} className="text-aavo-green" />
                  {td.specifications}
                </h3>
                <div className="space-y-3">
                  {product.longSpecs?.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-aavo-silver/10 last:border-0">
                      <span className={`text-aavo-silver text-sm ${lang === 'jp' ? 'font-jp' : ''}`}>{spec.label[lang]}</span>
                      <span className={`text-white font-medium text-right ${lang === 'jp' ? 'font-jp' : ''}`}>{spec.value[lang]}</span>
                    </div>
                  ))}
                  {!product.longSpecs && (
                    <p className="text-aavo-silver/50 text-sm italic">Standard specification sheet applies.</p>
                  )}
                </div>
              </div>

              {/* Main Category CTA */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-aavo-green text-aavo-dark hover:bg-white hover:text-aavo-dark px-8 py-4 rounded-sm font-header font-bold text-lg uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-aavo-green/20 hover:shadow-xl"
              >
                <MessageCircle size={24} />
                {td.inquiry}
              </a>
              <p className="mt-4 text-aavo-silver/50 text-xs text-center md:text-left">
                * Wholesale inquiries only. Minimum Order Quantities apply.
              </p>
            </div>
          </div>
        </div>

        {/* Sub Products Showcase */}
        {product.subProducts && product.subProducts.length > 0 && (
          <div className="mt-20 border-t border-aavo-silver/10 pt-16">
            <div className="mb-10 text-center md:text-left">
              <h2 className={`font-header text-2xl md:text-3xl text-white flex items-center gap-3 justify-center md:justify-start ${lang === 'jp' ? 'font-jp' : ''}`}>
                <Package className="text-aavo-green" />
                {td.availableProducts}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {product.subProducts.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-[#231F20] border border-aavo-silver/10 rounded-lg overflow-hidden hover:border-aavo-green/30 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  onClick={() => onProductSelect && onProductSelect(productId, idx)}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name[lang]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>

                    {/* View Product Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                      <div className="flex items-center justify-center gap-2 w-full py-2 bg-aavo-green text-aavo-dark text-xs font-bold uppercase rounded-sm">
                        <Package size={14} />
                        {t.products.viewDetails}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className={`text-white font-medium text-sm md:text-base ${lang === 'jp' ? 'font-jp' : 'font-header'}`}>
                      {item.name[lang]}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
