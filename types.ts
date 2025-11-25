export type Language = 'en' | 'jp';

export interface ContentStrings {
  nav: {
    home: string;
    about: string;
    categories: string;
    products: string;
    catalog: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  home: {
    aboutTitle: string;
    aboutDesc: string;
    learnMore: string;
    categoriesTitle: string;
    categoriesDesc: string;
    featuredTitle: string;
    catalogTitle: string;
    catalogDesc: string;
    catalogBtn: string;
    contactTitle: string;
    contactDesc: string;
    contactBtn: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    features: {
      title: string;
      description: string;
    }[];
    companyProfile: {
      title: string;
      items: {
        label: string;
        value: string;
      }[];
    };
  };
  products: {
    title: string;
    requestQuote: string;
    viewDetails: string;
    specLabel: string;
    allProductsTitle: string;
  };
  productDetail: {
    backToHome: string;
    inquiry: string;
    origin: string;
    grade: string;
    storage: string;
    description: string;
    specifications: string;
    availableProducts: string;
    qualityCertified: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    description: string;
    buttonLocked: string;
    buttonUnlocked: string;
    modalTitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    submit: string;
    success: string;
    benefitsTitle: string;
    benefits: string[];
    whatsInsideTitle: string;
    whatsInside: string[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      company: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      success: string;
    };
    info: {
      office: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
  footer: {
    address: string;
    copyright: string;
    privacy: string;
    terms: string;
    refund: string;
  };
  legal: {
    privacy: {
      title: string;
      lastUpdated: string;
      sections: { title: string; content: string }[];
    };
    terms: {
      title: string;
      lastUpdated: string;
      sections: { title: string; content: string }[];
    };
    refund: {
      title: string;
      lastUpdated: string;
      sections: { title: string; content: string }[];
    };
  };
}

export interface SubProduct {
  name: { en: string; jp: string };
  image: string;
  categoryName?: { en: string; jp: string }; // Optional for display purposes
}

export interface Product {
  id: string;
  name: {
    en: string;
    jp: string;
  };
  description: {
    en: string;
    jp: string;
  };
  image: string;
  specs: {
    origin: { en: string; jp: string };
    grade?: string;
    temp: { en: string; jp: string };
  };
  longSpecs?: {
    label: { en: string; jp: string };
    value: { en: string; jp: string };
  }[];
  subProducts?: SubProduct[];
}

export interface DataContextType {
  products: Product[];
  catalogUrl: string;
  logoUrl: string;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateCatalogUrl: (url: string) => void;
  updateLogoUrl: (url: string) => void;
  resetData: () => void;
}
