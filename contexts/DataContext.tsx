import React, { createContext, useState, useEffect, useContext } from 'react';
import { Product, DataContextType } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';
import { db, storage } from '../firebase';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [catalogUrl, setCatalogUrl] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Subscribe to Products
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      console.log("Firestore update received. Docs count:", snapshot.size);
      const productsData: Product[] = [];
      snapshot.forEach((doc) => {
        productsData.push(doc.data() as Product);
      });

      // If empty, seed initial data
      if (productsData.length === 0 && !snapshot.metadata.fromCache) {
        console.log("Database empty, seeding initial data...");
        seedInitialData();
      } else {
        console.log("Updating products state with", productsData.length, "items");
        setProducts(productsData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      alert("Error connecting to database: " + error.message);
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

  // Helper to upload base64 images to Storage
  const processProductImages = async (product: Product): Promise<Product> => {
    const processed = { ...product };

    // Helper to upload single string if base64
    const uploadIfBase64 = async (str: string, prefix: string): Promise<string> => {
      if (str && str.startsWith('data:image')) {
        console.log(`Migrating base64 image for ${prefix}...`);
        try {
          const timestamp = Date.now();
          const storagePath = `uploads/${timestamp}_${prefix}_migrated`;
          const storageRef = ref(storage, storagePath);
          await uploadString(storageRef, str, 'data_url');
          const url = await getDownloadURL(storageRef);
          console.log("Migration successful:", url);
          return url;
        } catch (e) {
          console.error("Failed to migrate image:", e);
          // Return original if failed, so we don't lose data (though save might still fail)
          return str;
        }
      }
      return str;
    };

    // Process main image
    processed.image = await uploadIfBase64(processed.image, `main_${processed.id}`);

    // Process sub-products
    if (processed.subProducts && processed.subProducts.length > 0) {
      processed.subProducts = await Promise.all(
        processed.subProducts.map(async (sub, idx) => ({
          ...sub,
          image: await uploadIfBase64(sub.image, `sub_${processed.id}_${idx}`)
        }))
      );
    }

    return processed;
  };

  const addProduct = async (product: Product) => {
    console.log("Attempting to add product:", product.id);
    try {
      const processedProduct = await processProductImages(product);
      await setDoc(doc(db, "products", product.id), processedProduct);
      console.log("Product added successfully");
      alert("Category/Product saved successfully!");
    } catch (e: any) {
      console.error("Error adding product: ", e);
      alert("Failed to save: " + e.message);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    console.log("Attempting to update product:", updatedProduct.id);
    try {
      const processedProduct = await processProductImages(updatedProduct);
      await setDoc(doc(db, "products", updatedProduct.id), processedProduct);
      console.log("Product updated successfully");
      alert("Category/Product updated successfully!");
    } catch (e: any) {
      console.error("Error updating product: ", e);
      alert("Failed to update: " + e.message);
    }
  };

  const deleteProduct = async (id: string) => {
    console.log("Attempting to delete product:", id);
    try {
      await deleteDoc(doc(db, "products", id));
      console.log("Product deleted successfully");
      alert("Category/Product deleted successfully!");
    } catch (e: any) {
      console.error("Error deleting product: ", e);
      alert("Failed to delete: " + e.message);
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
