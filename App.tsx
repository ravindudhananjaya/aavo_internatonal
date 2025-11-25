import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Language } from './types';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Catalog from './components/Catalog';
import ProductShowcase from './components/ProductShowcase';
import Categories from './components/Categories';
import ProductDetail from './components/ProductDetail';
import SingleProductDetail from './components/SingleProductDetail';
import Legal from './components/Legal';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import SEO from './components/SEO';

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
        navigate('/crm');
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
  return (
    <>
      <SEO
        title={lang === 'en' ? "AAVO Wholesale Foods" : "AAVO 業務用食品卸"}
        lang={lang === 'en' ? 'en' : 'jp'}
      />
      <Home lang={lang} onNavigate={handleNavigate} />
    </>
  );
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
  return (
    <>
      <SEO
        title={lang === 'en' ? "About Us" : "会社概要"}
        description={lang === 'en' ? "Learn about AAVO International's mission to bring authentic Asian flavors to Japan." : "AAVOインターナショナルのミッションと会社概要について。"}
        lang={lang === 'en' ? 'en' : 'jp'}
        url="https://aavointernational.com/about"
      />
      <About lang={lang} onNavigate={handleNavigate} />
    </>
  );
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
  return (
    <>
      <SEO
        title={lang === 'en' ? "All Products" : "全商品一覧"}
        description={lang === 'en' ? "Browse our full range of wholesale Asian ingredients including Halal meats, rice, and spices." : "ハラール肉、米、スパイスなど、厳選されたアジア食材の全商品一覧。"}
        lang={lang === 'en' ? 'en' : 'jp'}
        url="https://aavointernational.com/products"
      />
      <ProductShowcase lang={lang} onProductSelect={handleProductSelect} onNavigate={handleNavigate} />
    </>
  );
};

const CategoriesPage: React.FC<{ lang: Language }> = ({ lang }) => {
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
  return (
    <>
      <SEO
        title={lang === 'en' ? "Categories" : "商品カテゴリー"}
        description={lang === 'en' ? "Explore our product categories: Meat, Rice, Spices, and more." : "肉類、米、スパイスなど、カテゴリーから商品を探す。"}
        lang={lang === 'en' ? 'en' : 'jp'}
        url="https://aavointernational.com/categories"
      />
      <Categories lang={lang} onProductSelect={handleProductSelect} onNavigate={handleNavigate} />
    </>
  );
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
  return (
    <>
      <SEO
        title={lang === 'en' ? "Contact Us" : "お問い合わせ"}
        description={lang === 'en' ? "Get in touch with AAVO International for wholesale inquiries." : "AAVOインターナショナルへのお問い合わせはこちら。"}
        lang={lang === 'en' ? 'en' : 'jp'}
        url="https://aavointernational.com/contact"
      />
      <Contact lang={lang} />
    </>
  );
};

const CatalogPage: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <>
      <SEO
        title={lang === 'en' ? "Wholesale Catalog" : "卸売カタログ"}
        description={lang === 'en' ? "Download our latest wholesale catalog." : "最新の卸売カタログをダウンロード。"}
        lang={lang === 'en' ? 'en' : 'jp'}
        url="https://aavointernational.com/catalog"
      />
      <Catalog lang={lang} />
    </>
  );
};

const LegalPage: React.FC<{ lang: Language; type: 'privacy' | 'terms' | 'refund' }> = ({ lang, type }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  let title = "Legal";
  if (type === 'privacy') title = lang === 'en' ? "Privacy Policy" : "プライバシーポリシー";
  if (type === 'terms') title = lang === 'en' ? "Terms of Service" : "利用規約";
  if (type === 'refund') title = lang === 'en' ? "Refund Policy" : "返金ポリシー";

  return (
    <>
      <SEO
        title={title}
        lang={lang === 'en' ? 'en' : 'jp'}
        url={`https://aavointernational.com/${type}`}
      />
      <Legal lang={lang} type={type} onBack={handleBack} />
    </>
  );
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
    if (adminUser === 'aavoadmin' && adminPass === 'aavo@2024') {
      onLogin();
    } else {
      alert('Invalid Username or Password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1819]">
      <SEO title="CRM Login" />
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

  return (
    <>
      <SEO title="Admin Dashboard" />
      <AdminDashboard onLogout={handleLogout} />
    </>
  );
};

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <HelmetProvider>
      <DataProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Admin Route - No Header/Footer */}
            <Route
              path="/crm"
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

            <Route path="/categories" element={
              <Layout lang={lang} setLang={setLang}>
                <CategoriesPage lang={lang} />
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
    </HelmetProvider>
  );
};

export default App;
