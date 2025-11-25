import React, { createContext, useState, useEffect, useContext } from 'react';
import { Product, DataContextType } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';
import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [catalogUrl, setCatalogUrl] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Subscribe to Products
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData: Product[] = [];
      snapshot.forEach((doc) => {
        productsData.push(doc.data() as Product);
      });

      // If empty, seed initial data
      if (productsData.length === 0 && !snapshot.metadata.fromCache) {
        seedInitialData();
      } else {
        setProducts(productsData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      // Fallback to initial products if DB fails (e.g. missing config)
      setProducts(INITIAL_PRODUCTS);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to Settings (Catalog & Logo)
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "settings", "general"), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setCatalogUrl(data.catalogUrl || '');
        setLogoUrl(data.logoUrl || '');
      }
    }, (error) => {
      console.error("Error fetching settings:", error);
    });

    return () => unsubscribe();
  }, []);

  const seedInitialData = async () => {
    try {
      const batch = writeBatch(db);
      INITIAL_PRODUCTS.forEach(product => {
        const docRef = doc(db, "products", product.id);
        batch.set(docRef, product);
      });
      await batch.commit();
      console.log("Initial data seeded");
    } catch (e) {
      console.error("Error seeding data: ", e);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      await setDoc(doc(db, "products", product.id), product);
    } catch (e) {
      console.error("Error adding product: ", e);
      alert("Failed to add product. Check console for details.");
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      await setDoc(doc(db, "products", updatedProduct.id), updatedProduct);
    } catch (e) {
      console.error("Error updating product: ", e);
      alert("Failed to update product. Check console for details.");
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (e) {
      console.error("Error deleting product: ", e);
      alert("Failed to delete product. Check console for details.");
    }
  };

  const updateCatalogUrl = async (url: string) => {
    try {
      await setDoc(doc(db, "settings", "general"), { catalogUrl: url }, { merge: true });
    } catch (e) {
      console.error("Error updating catalog URL: ", e);
    }
  };

  const updateLogoUrl = async (url: string) => {
    try {
      await setDoc(doc(db, "settings", "general"), { logoUrl: url }, { merge: true });
    } catch (e) {
      console.error("Error updating logo URL: ", e);
    }
  };

  const resetData = async () => {
    if (window.confirm("Are you sure? This will delete all products in the database and restore defaults.")) {
      try {
        // Delete all existing products
        const querySnapshot = await getDocs(collection(db, "products"));
        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();

        // Reseed
        await seedInitialData();

        // Reset settings
        await setDoc(doc(db, "settings", "general"), { catalogUrl: '', logoUrl: '' });

      } catch (e) {
        console.error("Error resetting data: ", e);
        alert("Failed to reset data.");
      }
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
