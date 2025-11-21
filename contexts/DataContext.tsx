import React, { createContext, useState, useEffect, useContext } from 'react';
import { Product, DataContextType } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY_PRODUCTS = 'aavo_products_v1';
const STORAGE_KEY_CATALOG = 'aavo_catalog_url_v1';
const STORAGE_KEY_LOGO = 'aavo_logo_url_v1';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize products from LocalStorage or fallback to constants
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Initialize Catalog URL
  const [catalogUrl, setCatalogUrl] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_CATALOG) || '';
  });

  // Initialize Logo URL
  const [logoUrl, setLogoUrl] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_LOGO) || '';
  });

  // Save to LocalStorage whenever changes occur
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CATALOG, catalogUrl);
  }, [catalogUrl]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOGO, logoUrl);
  }, [logoUrl]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateCatalogUrl = (url: string) => {
    setCatalogUrl(url);
  };

  const updateLogoUrl = (url: string) => {
    setLogoUrl(url);
  };

  const resetData = () => {
    if (window.confirm("Are you sure? This will factory reset all product data to the original defaults.")) {
      setProducts(INITIAL_PRODUCTS);
      setCatalogUrl('');
      localStorage.removeItem(STORAGE_KEY_PRODUCTS);
      localStorage.removeItem(STORAGE_KEY_CATALOG);
    }
  };

  return (
    <DataContext.Provider value={{
      products,
      catalogUrl,
      logoUrl,
      addProduct,
      updateProduct,
      deleteProduct,
      updateCatalogUrl,
      updateLogoUrl,
      resetData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
