

import { ContentStrings, Product } from './types';

export const COMPANY_LOGO = ""; // URL to your logo (e.g., "https://example.com/logo.png")
export const COMPANY_PHONE = "818079755742"; // WhatsApp / Viber
export const INQUIRY_PHONE = "043-301-5294"; // Updated Direct Inquiry
export const CONTACT_EMAIL = "aavointernational.com.jp@gmail.com";

// Social Media Links
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61582116699860";
export const TIKTOK_URL = "https://www.tiktok.com/@aavo.internationa3";
export const WHATSAPP_URL = `https://wa.me/${COMPANY_PHONE}`;
export const VIBER_URL = `viber://chat?number=${COMPANY_PHONE}`;

export const TRANSLATIONS: Record<'en' | 'jp', ContentStrings> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      products: "Categories",
      catalog: "Catalog",
      contact: "Contact",
    },
    hero: {
      title: "Authentic Asian Grocery Imports",
      subtitle: "Directly sourcing the finest spices, grains, and meats from Asia to your doorstep.",
      cta: "Browse Categories",
    },
    home: {
      aboutTitle: "Who We Are",
      aboutDesc: "We are a premier wholesale food distributor bridging the gap between authentic Asian producers and the Japanese market. Our mission is to provide high-quality, halal-certified meats and essential groceries to restaurants and retailers.",
      learnMore: "Read Our Story",
      categoriesTitle: "Our Product Range",
      categoriesDesc: "Explore our diverse selection of imported goods, curated for quality and authenticity.",
      featuredTitle: "Featured Products",
      catalogTitle: "Download Full Catalog",
      catalogDesc: "Get access to our complete price list and seasonal offerings by registering for our wholesale catalog.",
      catalogBtn: "Get Catalog",
      contactTitle: "Partner With Us",
      contactDesc: "Ready to stock your shelves or kitchen with premium Asian ingredients?",
      contactBtn: "Contact Us Now"
    },
    about: {
      title: "Bringing Asia's Flavors to You",
      subtitle: "Your Trusted Partner for Imported Groceries",
      description: "AAVO Wholesale Foods specializes in importing authentic ingredients from Nepal, India, and Southeast Asia. We bridge the gap between international producers and local businesses, supplying restaurants and retailers with high-quality spices, premium meats, and essential staples.",
      features: [
        {
          title: "Global Sourcing",
          description: "We carefully select suppliers across Asia to ensure authentic taste and superior quality for our market."
        },
        {
          title: "Quality Assurance",
          description: "Strict quality control processes ensure that all imported goods meet local food safety standards."
        },
        {
          title: "Reliable Distribution",
          description: "Our efficient logistics network ensures timely delivery of fresh and dry goods to your business."
        }
      ],
      companyProfile: {
        title: "Company Profile",
        items: [
          { label: "Company Name", value: "Aavo International" },
          { label: "Head Office", value: "167 Uchiyamacho, Hanamigawa Ward, Chiba City, Chiba Prefecture 262-0002" },
          { label: "Phone", value: "043-301-5294" },
          { label: "Establishment", value: "2024/04/31" }
        ]
      }
    },
    products: {
      title: "Product Categories",
      requestQuote: "Request Quote",
      viewDetails: "View Details",
      specLabel: "Specification",
      allProductsTitle: "All Products"
    },
    productDetail: {
      backToHome: "Back to Categories",
      inquiry: "Inquire About This Product",
      origin: "Origin",
      grade: "Grade",
      storage: "Storage",
      description: "Description",
      specifications: "Specifications",
      availableProducts: "Products",
      qualityCertified: "Quality Certified"
    },
    catalog: {
      title: "Wholesale Catalog",
      subtitle: "Exclusive Access",
      description: "Unlock our comprehensive wholesale price list. Available exclusively for restaurant owners and retailers.",
      buttonLocked: "Unlock Catalog",
      buttonUnlocked: "Download PDF",
      modalTitle: "Request Access",
      namePlaceholder: "Your Name / Company Name",
      emailPlaceholder: "Email Address",
      phonePlaceholder: "Phone Number",
      submit: "Verify & Unlock",
      success: "Access Granted",
      benefitsTitle: "Why Register?",
      benefits: [
        "Full wholesale pricing visibility",
        "Seasonal discount notifications",
        "Priority inventory updates",
        "Direct line to sales team"
      ],
      whatsInsideTitle: "What's Inside?",
      whatsInside: [
        "Premium Halal Meats",
        "Bulk Basmati & Jasmine Rice",
        "Imported Spices & Seasonings",
        "Dried Goods & Essentials"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Common questions about our wholesale process.",
      items: [
        {
          question: "What is the minimum order quantity?",
          answer: "Our minimum order quantity depends on your location and the product type. Generally, we require a minimum order of 30kg for frozen goods to ensure efficient shipping."
        },
        {
          question: "Do you deliver nationwide in Japan?",
          answer: "Yes, we ship to all 47 prefectures in Japan via refrigerated transport (Cool Takkyubin) for fresh/frozen items."
        },
        {
          question: "How can I open a wholesale account?",
          answer: "Simply contact us via the form below or WhatsApp. We will verify your business details and set up an account within 24 hours."
        }
      ]
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with our team for orders, inquiries, or partnerships.",
      form: {
        name: "Your Name",
        company: "Company Name",
        email: "Email Address",
        phone: "Phone Number",
        message: "Message",
        submit: "Send Message",
        success: "Thank you! Your message has been sent."
      },
      info: {
        office: "Head Office",
        phone: "Phone & WhatsApp",
        email: "Email Support",
        hours: "Business Hours"
      }
    },
    footer: {
      address: "167 Uchiyamacho, Hanamigawa Ward, Chiba City, Chiba Prefecture 262-0002",
      copyright: "© 2024 Aavo International. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      refund: "Refund Policy"
    },
    legal: {
      privacy: {
        title: "Privacy Policy",
        lastUpdated: "April 30, 2024",
        sections: [
          { title: "1. Information We Collect", content: "We collect information you provide directly to us, such as your name, email address, phone number, and business details when you register for an account or contact us." },
          { title: "2. How We Use Information", content: "We use the information we collect to process your orders, communicate with you, and improve our services." }
        ]
      },
      terms: {
        title: "Terms of Service",
        lastUpdated: "April 30, 2024",
        sections: [
          { title: "1. Acceptance of Terms", content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement." },
          { title: "2. Wholesale Accounts", content: "Wholesale accounts are intended for business use only. We reserve the right to verify business credentials." }
        ]
      },
      refund: {
        title: "Refund Policy",
        lastUpdated: "April 30, 2024",
        sections: [
          { title: "1. Returns", content: "Due to the perishable nature of our products (meats, frozen goods), we generally do not accept returns unless the product is defective or incorrect upon delivery." },
          { title: "2. Claims", content: "Any claims regarding quality or missing items must be made within 24 hours of receipt." }
        ]
      }
    }
  },
  jp: {
    nav: {
      home: "ホーム",
      about: "私たちについて",
      products: "商品一覧",
      catalog: "カタログ",
      contact: "お問い合わせ",
    },
    hero: {
      title: "本格的なアジア食材を日本へ",
      subtitle: "最高品質のスパイス、穀物、肉類をアジア各地から直輸入し、お届けします。",
      cta: "商品カテゴリーを見る",
    },
    home: {
      aboutTitle: "私たちについて",
      aboutDesc: "私たちは、本格的なアジアの生産者と日本市場の架け橋となる食品卸売業者です。レストランや小売店向けに、高品質なハラール認証肉や必須食料品を提供することを使命としています。",
      learnMore: "ストーリーを読む",
      categoriesTitle: "取り扱い商品",
      categoriesDesc: "品質と本場にこだわった、厳選された輸入食材の数々をご覧ください。",
      featuredTitle: "おすすめ商品",
      catalogTitle: "カタログをダウンロード",
      catalogDesc: "卸売カタログに登録して、完全な価格リストと季節の商品情報をご覧ください。",
      catalogBtn: "カタログを入手",
      contactTitle: "パートナーになる",
      contactDesc: "プレミアムなアジア食材をお探しですか？お気軽にご相談ください。",
      contactBtn: "お問い合わせ"
    },
    about: {
      title: "アジアの風味をあなたのもとへ",
      subtitle: "輸入食品の信頼できるパートナー",
      description: "AAVO Wholesale Foodsは、ネパール、インド、東南アジアからの本格的な食材の輸入を専門としています。私たちは、国際的な生産者と地元のビジネスを結びつけ、レストランや小売店に高品質のスパイス、高級肉、必需品を供給しています。",
      features: [
        {
          title: "グローバルな調達",
          description: "アジア各地のサプライヤーを厳選し、市場に向けて本場の味と優れた品質を保証します。"
        },
        {
          title: "品質保証",
          description: "厳格な品質管理プロセスにより、すべての輸入品が国内の食品安全基準を満たしていることを保証します。"
        },
        {
          title: "確実な配送",
          description: "効率的な物流ネットワークにより、新鮮な商品や乾物をビジネスにタイムリーにお届けします。"
        }
      ],
      companyProfile: {
        title: "会社概要",
        items: [
          { label: "会社名", value: "Ａａｖｏ　ｉｎｔｅｒｎａｔｉｏｎａｌ株式会社" },
          { label: "住所", value: "〒2620002 千葉県千葉市花見川区内山町１６７番地１" },
          { label: "電話番号", value: "043-301-5294" },
          { label: "設立", value: "2024/04/31" }
        ]
      }
    },
    products: {
      title: "商品カテゴリー",
      requestQuote: "見積もり依頼",
      viewDetails: "詳細を見る",
      specLabel: "仕様",
      allProductsTitle: "全商品一覧"
    },
    productDetail: {
      backToHome: "カテゴリーに戻る",
      inquiry: "この商品について問い合わせる",
      origin: "原産国",
      grade: "グレード",
      storage: "保存方法",
      description: "商品説明",
      specifications: "詳細仕様",
      availableProducts: "商品一覧",
      qualityCertified: "品質保証済み"
    },
    catalog: {
      title: "卸売カタログ",
      subtitle: "限定アクセス",
      description: "包括的な卸売価格リストをご覧ください。飲食店オーナー様および小売店様限定です。",
      buttonLocked: "カタログをロック解除",
      buttonUnlocked: "PDFをダウンロード",
      modalTitle: "アクセス申請",
      namePlaceholder: "お名前 / 会社名",
      emailPlaceholder: "メールアドレス",
      phonePlaceholder: "電話番号",
      submit: "確認して解除",
      success: "アクセス承認",
      benefitsTitle: "登録のメリット",
      benefits: [
        "卸売価格の完全な閲覧",
        "季節の割引通知",
        "在庫情報の優先アップデート",
        "営業チームへの直通ライン"
      ],
      whatsInsideTitle: "カタログ内容",
      whatsInside: [
        "プレミアム和牛 & ハラール肉",
        "バスマティライス & ジャスミンライス",
        "輸入スパイス & 調味料",
        "乾物 & 必需品"
      ]
    },
    faq: {
      title: "よくある質問",
      subtitle: "卸売プロセスに関する一般的な質問。",
      items: [
        {
          question: "最低注文数はありますか？",
          answer: "最低注文数は地域や商品タイプによって異なります。一般的に、冷凍食品の効率的な配送のために30kgからの注文をお願いしています。"
        },
        {
          question: "日本全国に配送していますか？",
          answer: "はい、生鮮・冷凍品についてはクール宅急便を利用して47都道府県すべてに配送しています。"
        },
        {
          question: "卸売アカウントを開設するには？",
          answer: "以下のお問い合わせフォームまたはWhatsAppからご連絡ください。24時間以内に詳細を確認し、アカウントを設定いたします。"
        }
      ]
    },
    contact: {
      title: "お問い合わせ",
      subtitle: "注文、質問、パートナーシップについてはチームにご連絡ください。",
      form: {
        name: "お名前",
        company: "会社名",
        email: "メールアドレス",
        phone: "電話番号",
        message: "メッセージ",
        submit: "送信する",
        success: "ありがとうございます！メッセージが送信されました。"
      },
      info: {
        office: "本社",
        phone: "電話 & WhatsApp",
        email: "メールサポート",
        hours: "営業時間"
      }
    },
    footer: {
      address: "〒262-0002 千葉県千葉市花見川区内山町167-1",
      copyright: "© 2024 Aavo International. All rights reserved.",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
      refund: "返金ポリシー"
    },
    legal: {
      privacy: {
        title: "プライバシーポリシー",
        lastUpdated: "2024年4月30日",
        sections: [
          { title: "1. 収集する情報", content: "アカウント登録やお問い合わせの際に、お名前、メールアドレス、電話番号、ビジネス詳細などの情報を収集します。" },
          { title: "2. 情報の利用方法", content: "収集した情報は、注文の処理、お客様への連絡、サービスの向上のために使用されます。" }
        ]
      },
      terms: {
        title: "利用規約",
        lastUpdated: "2024年4月30日",
        sections: [
          { title: "1. 規約への同意", content: "当ウェブサイトにアクセスし利用することで、本契約の条件に拘束されることに同意したものとみなされます。" },
          { title: "2. 卸売アカウント", content: "卸売アカウントは事業用のみを対象としています。当社は事業証明を確認する権利を留保します。" }
        ]
      },
      refund: {
        title: "返金ポリシー",
        lastUpdated: "2024年4月30日",
        sections: [
          { title: "1. 返品について", content: "商品の性質上（肉類、冷凍食品）、商品に欠陥がある場合や誤配送を除き、原則として返品はお受けできません。" },
          { title: "2. クレームについて", content: "品質や欠品に関するクレームは、商品到着後24時間以内にご連絡ください。" }
        ]
      }
    }
  }
};

export const PRODUCTS: Product[] = [
  {
    id: 'meat-goat',
    name: { en: 'Meat Products', jp: 'ハラール山羊肉' },
    description: {
      en: 'Premium quality goat meat sourced directly from trusted farms. Available in various cuts suitable for curries, grilling, and roasting. Fully Halal certified.',
      jp: '信頼できる農場から直接調達した最高品質の山羊肉。カレー、グリル、ローストなど、様々な料理に適したカットをご用意しています。完全ハラール認証済み。'
    },
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1000&auto=format&fit=crop',
    specs: {
      origin: { en: 'Australia / Local', jp: 'オーストラリア / 国産' },
      grade: 'Premium',
      temp: { en: 'Frozen -18°C', jp: '冷凍 -18°C' }
    },
    longSpecs: [
      { label: { en: 'Processing', jp: '加工方法' }, value: { en: 'Skin-on / Skin-off', jp: '皮付き / 皮なし' } },
      { label: { en: 'Certification', jp: '認証' }, value: { en: 'Halal Certified', jp: 'ハラール認証' } },
      { label: { en: 'Packaging', jp: '包装' }, value: { en: 'Vacuum Pack', jp: '真空パック' } }
    ],
    subProducts: [
      { name: { en: 'Skin-On Mutton Cut', jp: '皮付きマトンカット' }, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=500&auto=format&fit=crop' },
      { name: { en: 'Goat Leg Whole', jp: '山羊もも肉（ホール）' }, image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=500&auto=format&fit=crop' },
      { name: { en: 'Boneless Cubes', jp: '骨なしキューブ' }, image: 'https://images.unsplash.com/photo-1578861256505-d3be7cb037d3?q=80&w=500&auto=format&fit=crop' }
    ]
  },
  {
    id: 'rice',
    name: { en: 'Basmati Rice', jp: 'バスマティライス' },
    description: {
      en: 'Extra long grain Basmati rice known for its delicate fragrance and fluffy texture. Aged to perfection for the best biryani experience.',
      jp: '繊細な香りとふわっとした食感で知られる極長粒バスマティライス。最高のビリヤニ体験のために熟成されています。'
    },
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop',
    specs: {
      origin: { en: 'India / Pakistan', jp: 'インド / パキスタン' },
      grade: '1121 XXL',
      temp: { en: 'Dry Storage', jp: '常温保存' }
    },
    longSpecs: [
      { label: { en: 'Grain Length', jp: '粒の長さ' }, value: { en: '8.3mm+', jp: '8.3mm以上' } },
      { label: { en: 'Aging', jp: '熟成期間' }, value: { en: 'min. 12 months', jp: '最低12ヶ月' } },
      { label: { en: 'Bag Size', jp: '袋サイズ' }, value: { en: '5kg / 20kg', jp: '5kg / 20kg' } }
    ],
    subProducts: [
      { name: { en: 'India Gate Classic', jp: 'インディアゲート クラシック' }, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=500&auto=format&fit=crop' },
      { name: { en: 'Daawat Chef\'s Secret', jp: 'ダワット シェフズシークレット' }, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=500&auto=format&fit=crop' }
    ]
  },
  {
    id: 'spices',
    name: { en: 'Spices & Masalas', jp: 'スパイス & マサラ' },
    description: {
      en: 'A comprehensive collection of whole and ground spices. From aromatic cardamom to fiery chili powder, essential for authentic Asian cuisine.',
      jp: 'ホールスパイスからパウダースパイスまで、包括的なラインナップ。香り高いカルダモンから激辛チリパウダーまで、本格的なアジア料理に欠かせません。'
    },
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop',
    specs: {
      origin: { en: 'Global', jp: '世界各国' },
      grade: 'Export Quality',
      temp: { en: 'Dry Storage', jp: '常温保存' }
    },
    longSpecs: [
      { label: { en: 'Type', jp: 'タイプ' }, value: { en: 'Whole & Ground', jp: 'ホール & パウダー' } },
      { label: { en: 'Packaging', jp: '包装' }, value: { en: 'Bulk / Retail', jp: '業務用 / 小売用' } }
    ],
    subProducts: [
      { name: { en: 'Green Cardamom', jp: 'グリーンカルダモン' }, image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=500&auto=format&fit=crop' },
      { name: { en: 'Cumin Seeds', jp: 'クミンシード' }, image: 'https://images.unsplash.com/photo-1599940859674-a7fef05b94ae?q=80&w=500&auto=format&fit=crop' },
      { name: { en: 'MDH Masala Mix', jp: 'MDH マサラミックス' }, image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=500&auto=format&fit=crop' }
    ]
  },
  {
    id: 'daal-beans',
    name: { en: 'Daal & Beans', jp: '豆類 & ダール' },
    description: {
      en: 'A wide selection of premium lentils, pulses, and beans. Featuring high-quality Yellow Moong Dal, Toor Dal, and Chickpeas essential for authentic Asian cuisine.',
      jp: '高品質なレンズ豆、豆類を幅広く取り揃えています。本格的なアジア料理に欠かせないイエロームングダール、トゥールダール、ひよこ豆などをご用意しています。'
    },
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe726e?q=80&w=1000&auto=format&fit=crop',
    specs: {
      origin: { en: 'India / Myanmar / Canada', jp: 'インド / ミャンマー / カナダ' },
      grade: 'Sortex Cleaned',
      temp: { en: 'Dry Storage', jp: '常温保存' }
    },
    longSpecs: [
      { label: { en: 'Variety', jp: '種類' }, value: { en: 'Whole / Split / Washed', jp: 'ホール / 挽き割り / 洗浄済み' } },
      { label: { en: 'Packaging', jp: '包装' }, value: { en: '1kg / 5kg / 25kg', jp: '1kg / 5kg / 25kg' } }
    ],
    subProducts: [
      { name: { en: 'Toor Dal', jp: 'トゥールダール' }, image: 'https://images.unsplash.com/photo-1585996323540-c78fa3831087?q=80&w=500&auto=format&fit=crop' }, 
      { name: { en: 'Chickpeas (Kabuli)', jp: 'ひよこ豆' }, image: 'https://images.unsplash.com/photo-1587486913049-53fc88a55219?q=80&w=500&auto=format&fit=crop' },
      { name: { en: 'Yellow Moong Dal', jp: 'イエロームングダール' }, image: 'https://images.unsplash.com/photo-1515543904379-3d757afe726e?q=80&w=500&auto=format&fit=crop' }
    ]
  },
  {
    id: 'noodles',
    name: { en: 'Noodles & Instant', jp: '麺類 & インスタント' },
    description: {
      en: 'Popular instant noodles and dried noodles from Nepal and Southeast Asia. Quick, delicious, and nostalgic flavors.',
      jp: 'ネパールや東南アジアで人気のインスタント麺や乾麺。手軽で美味しく、懐かしい味わい。'
    },
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1000&auto=format&fit=crop',
    specs: {
      origin: { en: 'Nepal / SE Asia', jp: 'ネパール / 東南アジア' },
      grade: 'Standard',
      temp: { en: 'Dry Storage', jp: '常温保存' }
    },
    subProducts: [
      { name: { en: 'Wai Wai Noodles', jp: 'ワイワイ ヌードル' }, image: 'https://images.unsplash.com/photo-1599020792689-9fdeef965d72?q=80&w=500&auto=format&fit=crop' },
      { name: { en: 'Rara Noodles', jp: 'ララ ヌードル' }, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=500&auto=format&fit=crop' }
    ]
  },
  {
    id: 'beverage',
    name: { en: 'Beverages & Others', jp: '飲料 & その他' },
    description: {
      en: 'Refreshing tropical juices, tea, and other pantry essentials to complete your inventory.',
      jp: 'トロピカルジュース、お茶、その他在庫を充実させるためのパントリー必需品。'
    },
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=1000&auto=format&fit=crop',
    specs: {
      origin: { en: 'Various', jp: '各地' },
      grade: 'Standard',
      temp: { en: 'Dry / Cool', jp: '常温 / 冷暗所' }
    },
    subProducts: [
      { name: { en: 'Mango Juice', jp: 'マンゴージュース' }, image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=500&auto=format&fit=crop' },
      { name: { en: 'Tokla Tea', jp: 'トクラ ティー' }, image: 'https://images.unsplash.com/photo-1571934811356-5cc55449d0f1?q=80&w=500&auto=format&fit=crop' }
    ]
  }
];
