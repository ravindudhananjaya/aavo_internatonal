import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    lang?: 'en' | 'jp';
}

const SEO: React.FC<SEOProps> = ({
    title,
    description = "Premium Japanese wholesale food supplier. High-End Wagyu Export, Toyosu Market Seafood, and Bulk Matcha. Direct shipping from Japan.",
    keywords = "Asian Wholesale Japan, Halal Meat Tokyo, Basmati Rice Wholesale, Nepal Foods Japan, Spices Importer, Restaurant Supply Japan",
    image = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop",
    url = "https://aavointernational.com/",
    lang = 'en'
}) => {
    const siteTitle = lang === 'en' ? "AAVO Wholesale Foods" : "AAVO 業務用食品卸";
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

    return (
        <Helmet>
            <html lang={lang === 'en' ? 'en' : 'ja'} />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
