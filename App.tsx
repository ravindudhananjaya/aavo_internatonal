import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Language } from './types';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Catalog from './components/Catalog';
import ProductShowcase from './components/ProductShowcase';
import ProductDetail from './components/ProductDetail';
import SingleProductDetail from './components/SingleProductDetail';
import Legal from './components/Legal';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';

// Layout component that includes Header and Footer
const Layout: React.FC<{
  children: React.ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
}> = ({ children, lang, setLang }) => {
  const navigate = useNavigate();

  const handleNavigate = (sectionId: string) => {
    switch (sectionId) {
      case 'home':
        navigate('/');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'products':
        navigate('/products');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'catalog':
        navigate('/catalog');
        break;
      case 'privacy':
        navigate('/privacy');
        break;
      case 'terms':
        navigate('/terms');
        break;
      case 'refund':
        navigate('/refund');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/');
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-aavo-dark min-h-screen flex flex-col">
      <Header lang={lang} setLang={setLang} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer lang={lang} onNavigate={handleNavigate} />
    </div>
  );
};

// Page wrapper components with navigation
const HomePage: React.FC<{ lang: Language }> = ({ lang }) => {
  const navigate = useNavigate();
  const handleNavigate = (sectionId: string) => {
    switch (sectionId) {
      case 'home':
        navigate('/');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'products':
        navigate('/products');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'catalog':
        navigate('/catalog');
        break;
      default:
        navigate('/');
    }
    window.scrollTo(0, 0);
  };
  return <Home lang={lang} onNavigate={handleNavigate} />;
};

const AboutPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const navigate = useNavigate();
  const handleNavigate = (sectionId: string) => {
    switch (sectionId) {
      case 'contact':
        navigate('/contact');
        break;
      default:
        navigate('/');
    }
    window.scrollTo(0, 0);
  };
  return <About lang={lang} onNavigate={handleNavigate} />;
};

const ProductsPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const navigate = useNavigate();
  const handleNavigate = (sectionId: string) => {
    switch (sectionId) {
      case 'contact':
        navigate('/contact');
        break;
      default:
        navigate('/');
    }
    window.scrollTo(0, 0);
  };
  const handleProductSelect = (id: string) => {
    navigate(`/products/${id}`);
    window.scrollTo(0, 0);
  };
  return <ProductShowcase lang={lang} onProductSelect={handleProductSelect} onNavigate={handleNavigate} />;
};

const ProductDetailPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const handleBack = () => {
    navigate('/products');
    window.scrollTo(0, 0);
  };

  const handleProductSelect = (categoryId: string, productIndex: number) => {
    navigate(`/products/${categoryId}/${productIndex}`);
    window.scrollTo(0, 0);
  };

  if (!productId) {
    navigate('/products');
    return null;
  }

  return <ProductDetail lang={lang} productId={productId} onBack={handleBack} onProductSelect={handleProductSelect} />;
};

// Single Product Detail Page
const SingleProductDetailPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const navigate = useNavigate();
  const { categoryId, productIndex } = useParams<{ categoryId: string; productIndex: string }>();

  const handleBack = () => {
    navigate(`/products/${categoryId}`);
    window.scrollTo(0, 0);
  };

  const handleProductSelect = (catId: string, prodIndex: number) => {
    navigate(`/products/${catId}/${prodIndex}`);
    window.scrollTo(0, 0);
  };

  if (!categoryId || productIndex === undefined) {
    navigate('/products');
    return null;
  }

  return <SingleProductDetail lang={lang} categoryId={categoryId} productIndex={parseInt(productIndex, 10)} onBack={handleBack} onProductSelect={handleProductSelect} />;
};

const ContactPage: React.FC<{ lang: Language }> = ({ lang }) => {
  return <Contact lang={lang} />;
};

const CatalogPage: React.FC<{ lang: Language }> = ({ lang }) => {
  return <Catalog lang={lang} />;
};

const LegalPage: React.FC<{ lang: Language; type: 'privacy' | 'terms' | 'refund' }> = ({ lang, type }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };
  return <Legal lang={lang} type={type} onBack={handleBack} />;
};

// Admin Login Page
const AdminLoginPage: React.FC<{
  onLogin: () => void;
}> = ({ onLogin }) => {
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === 'aavoadmin' && adminPass === 'qazwsx./@1') {
      onLogin();
    } else {
      alert('Invalid Username or Password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1819]">
      <div className="bg-[#2A2A2A] p-8 rounded-lg border border-white/10 shadow-2xl max-w-sm w-full">
        <h2 className="text-white font-header text-2xl mb-6 text-center">CRM Login</h2>
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <input
            type="text"
            className="w-full bg-black/40 border border-white/10 rounded p-3 text-white"
            placeholder="Username"
            value={adminUser}
            onChange={(e) => setAdminUser(e.target.value)}
          />
          <input
            type="password"
            className="w-full bg-black/40 border border-white/10 rounded p-3 text-white"
            placeholder="Password"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
          />
          <button type="submit" className="w-full bg-aavo-green text-black font-bold py-3 rounded">Login</button>
          <button type="button" onClick={() => navigate('/')} className="w-full text-aavo-silver text-sm">Back to Home</button>
        </form>
      </div>
    </div>
  );
};

// Admin Page with Dashboard
const AdminPage: React.FC<{
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}> = ({ isLoggedIn, onLogin, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  if (!isLoggedIn) {
    return <AdminLoginPage onLogin={onLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
};

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Title updater component
const TitleUpdater: React.FC<{ lang: Language }> = ({ lang }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = lang === 'en'
      ? "AAVO Wholesale Foods | Asian Grocery & Spice Importer"
      : "AAVO 業務用食品卸 | アジア食品・スパイス輸入";

    if (pathname === '/about') {
      title = lang === 'en' ? "About Us | AAVO Wholesale Foods" : "会社概要 | AAVO 業務用食品卸";
    } else if (pathname === '/products' || pathname.startsWith('/products/')) {
      title = lang === 'en' ? "Product Categories | AAVO Wholesale Foods" : "商品カテゴリー | AAVO 業務用食品卸";
    } else if (pathname === '/contact') {
      title = lang === 'en' ? "Contact Us | AAVO Wholesale Foods" : "お問い合わせ | AAVO 業務用食品卸";
    } else if (pathname === '/catalog') {
      title = lang === 'en' ? "Wholesale Catalog | AAVO Wholesale Foods" : "卸売カタログ | AAVO 業務用食品卸";
    } else if (pathname === '/privacy') {
      title = lang === 'en' ? "Privacy Policy | AAVO Wholesale Foods" : "プライバシーポリシー | AAVO 業務用食品卸";
    } else if (pathname === '/terms') {
      title = lang === 'en' ? "Terms of Service | AAVO Wholesale Foods" : "利用規約 | AAVO 業務用食品卸";
    } else if (pathname === '/refund') {
      title = lang === 'en' ? "Refund Policy | AAVO Wholesale Foods" : "返金ポリシー | AAVO 業務用食品卸";
    } else if (pathname === '/qazwsx./@1') {
      title = "AAVO CRM | Admin Dashboard";
    }

    document.title = title;
    document.documentElement.lang = lang === 'en' ? 'en' : 'ja';
  }, [lang, pathname]);

  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <TitleUpdater lang={lang} />
        <Routes>
          {/* Admin Route - No Header/Footer */}
          <Route
            path="/admin"
            element={
              <AdminPage
                isLoggedIn={isAdminLoggedIn}
                onLogin={() => setIsAdminLoggedIn(true)}
                onLogout={() => setIsAdminLoggedIn(false)}
              />
            }
          />

          {/* Public Routes with Header/Footer */}
          <Route path="/" element={
            <Layout lang={lang} setLang={setLang}>
              <HomePage lang={lang} />
            </Layout>
          } />

          <Route path="/about" element={
            <Layout lang={lang} setLang={setLang}>
              <AboutPage lang={lang} />
            </Layout>
          } />

          <Route path="/products" element={
            <Layout lang={lang} setLang={setLang}>
              <ProductsPage lang={lang} />
            </Layout>
          } />

          <Route path="/products/:productId" element={
            <Layout lang={lang} setLang={setLang}>
              <ProductDetailPage lang={lang} />
            </Layout>
          } />

          <Route path="/products/:categoryId/:productIndex" element={
            <Layout lang={lang} setLang={setLang}>
              <SingleProductDetailPage lang={lang} />
            </Layout>
          } />

          <Route path="/contact" element={
            <Layout lang={lang} setLang={setLang}>
              <ContactPage lang={lang} />
            </Layout>
          } />

          <Route path="/catalog" element={
            <Layout lang={lang} setLang={setLang}>
              <CatalogPage lang={lang} />
            </Layout>
          } />

          <Route path="/privacy" element={
            <Layout lang={lang} setLang={setLang}>
              <LegalPage lang={lang} type="privacy" />
            </Layout>
          } />

          <Route path="/terms" element={
            <Layout lang={lang} setLang={setLang}>
              <LegalPage lang={lang} type="terms" />
            </Layout>
          } />

          <Route path="/refund" element={
            <Layout lang={lang} setLang={setLang}>
              <LegalPage lang={lang} type="refund" />
            </Layout>
          } />

          {/* Catch-all route - redirect to home */}
          <Route path="*" element={
            <Layout lang={lang} setLang={setLang}>
              <HomePage lang={lang} />
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
