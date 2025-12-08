import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Product, SubProduct } from '../../types';
import { Plus, Edit, Trash2, Save, X, Link as LinkIcon, RefreshCw, LogOut, Package, ArrowLeft, Grid, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { analyzeProductImage } from '../../services/gemini';

interface AdminDashboardProps {
  onLogout: () => void;
}

type ViewMode = 'categories' | 'category-form' | 'products' | 'product-form' | 'catalog' | 'logo';

const emptyProduct: Product = {
  id: '',
  name: { en: '', jp: '' },
  description: { en: '', jp: '' },
  image: '',
  specs: {
    origin: { en: '', jp: '' },
    grade: '',
    temp: { en: '', jp: '' }
  },
  subProducts: []
};

const emptySubProduct: SubProduct = {
  name: { en: '', jp: '' },
  description: { en: '', jp: '' },
  image: ''
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { products, catalogUrl, logoUrl, addProduct, updateProduct, deleteProduct, updateCatalogUrl, updateLogoUrl, resetData } = useData();
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [currentCategory, setCurrentCategory] = useState<Product>(emptyProduct);
  const [currentSubProduct, setCurrentSubProduct] = useState<SubProduct>(emptySubProduct);
  const [editingSubProductIndex, setEditingSubProductIndex] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [tempCatalogUrl, setTempCatalogUrl] = useState(catalogUrl);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Ensure Gemini always receives a base64-encoded image, even if user provided a URL
  const getImageAsBase64 = async (imageSource: string): Promise<string> => {
    if (imageSource.startsWith('data:')) {
      return imageSource;
    }

    const response = await fetch(imageSource);
    if (!response.ok) {
      throw new Error('Unable to fetch image from the provided URL');
    }

    const blob = await response.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image data'));
      reader.readAsDataURL(blob);
    });
  };

  // Get selected category
  const selectedCategory = products.find(p => p.id === selectedCategoryId);

  // Category handlers
  const handleEditCategory = (product: Product) => {
    setCurrentCategory(product);
    setViewMode('category-form');
  };

  const handleCreateCategory = () => {
    const newId = `cat-${Date.now()}`;
    setCurrentCategory({ ...emptyProduct, id: newId });
    setViewMode('category-form');
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category and all its products?")) {
      deleteProduct(id);
    }
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const exists = products.find(p => p.id === currentCategory.id);
    if (exists) {
      updateProduct(currentCategory);
    } else {
      addProduct(currentCategory);
    }
    setViewMode('categories');
  };

  // Product handlers
  const handleViewProducts = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setViewMode('products');
  };

  const handleCreateProduct = () => {
    setCurrentSubProduct({ ...emptySubProduct });
    setEditingSubProductIndex(null);
    setViewMode('product-form');
  };

  const handleEditProduct = (index: number) => {
    if (selectedCategory?.subProducts) {
      setCurrentSubProduct({ ...selectedCategory.subProducts[index] });
      setEditingSubProductIndex(index);
      setViewMode('product-form');
    }
  };

  const handleDeleteProduct = (index: number) => {
    if (window.confirm("Are you sure you want to delete this product?") && selectedCategory) {
      const updatedSubProducts = selectedCategory.subProducts?.filter((_, i) => i !== index) || [];
      updateProduct({ ...selectedCategory, subProducts: updatedSubProducts });
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    let updatedSubProducts = [...(selectedCategory.subProducts || [])];

    if (editingSubProductIndex !== null) {
      updatedSubProducts[editingSubProductIndex] = currentSubProduct;
    } else {
      updatedSubProducts.push(currentSubProduct);
    }

    // Sanitize the entire object to remove undefined values
    // Also filter out any nulls from the array (which JSON.stringify might create for sparse arrays)
    const productToUpdate = { ...selectedCategory, subProducts: updatedSubProducts };
    const sanitizedProduct = JSON.parse(JSON.stringify(productToUpdate));

    if (Array.isArray(sanitizedProduct.subProducts)) {
      sanitizedProduct.subProducts = sanitizedProduct.subProducts.filter((p: any) => p !== null);
    }

    console.log("Saving product:", sanitizedProduct);
    updateProduct(sanitizedProduct);
    setViewMode('products');
  };

  // Catalog handler
  const handleSaveCatalog = () => {
    updateCatalogUrl(tempCatalogUrl);
    alert("Catalog URL updated successfully!");
  };

  // Helper to update nested state safely
  const updateCategoryField = (path: string, value: string) => {
    const keys = path.split('.');
    setCurrentCategory(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // Navigation Header
  const NavHeader = () => (
    <nav className="bg-[#231F20] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-aavo-green rounded"></div>
          <h1 className="font-bold text-xl tracking-wider">AAVO CRM</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onLogout} className="flex items-center gap-2 text-sm hover:text-aavo-green">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );

  // Sidebar Navigation
  const Sidebar = () => (
    <div className="w-64 bg-white shadow-lg min-h-screen p-4">
      <div className="space-y-2">
        <button
          onClick={() => setViewMode('categories')}
          className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${viewMode === 'categories' || viewMode === 'category-form'
            ? 'bg-aavo-green text-white'
            : 'hover:bg-gray-100 text-gray-700'
            }`}
        >
          <Grid size={20} />
          Categories
        </button>
        <button
          onClick={() => setViewMode('catalog')}
          className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${viewMode === 'catalog'
            ? 'bg-aavo-green text-white'
            : 'hover:bg-gray-100 text-gray-700'
            }`}
        >
          <LinkIcon size={20} />
          Catalog Settings
        </button>
        <button
          onClick={() => setViewMode('logo')}
          className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${viewMode === 'logo'
            ? 'bg-aavo-green text-white'
            : 'hover:bg-gray-100 text-gray-700'
            }`}
        >
          <ImageIcon size={20} />
          Website Logo
        </button>
      </div>

      <div className="mt-8 pt-4 border-t">
        <button
          onClick={resetData}
          className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
        >
          <RefreshCw size={20} />
          Factory Reset
        </button>
      </div>
    </div>
  );

  // Category Form View
  const CategoryFormView = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setViewMode('categories')} className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold">
            {products.find(p => p.id === currentCategory.id) ? 'Edit Category' : 'New Category'}
          </h2>
        </div>
        <button onClick={() => setViewMode('categories')} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSaveCategory} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Category Name (EN)</label>
            <input
              required
              className="w-full p-2 border rounded"
              value={currentCategory.name.en}
              onChange={e => updateCategoryField('name.en', e.target.value)}
              placeholder="e.g., Basmati Rice"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Category Name (JP)</label>
            <input
              required
              className="w-full p-2 border rounded"
              value={currentCategory.name.jp}
              onChange={e => updateCategoryField('name.jp', e.target.value)}
              placeholder="e.g., バスマティライス"
            />
          </div>
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Description (EN)</label>
            <textarea
              required
              rows={3}
              className="w-full p-2 border rounded"
              value={currentCategory.description.en}
              onChange={e => updateCategoryField('description.en', e.target.value)}
              placeholder="Describe the category..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Description (JP)</label>
            <textarea
              required
              rows={3}
              className="w-full p-2 border rounded"
              value={currentCategory.description.jp}
              onChange={e => updateCategoryField('description.jp', e.target.value)}
              placeholder="カテゴリーの説明..."
            />
          </div>
        </div>

        {/* Image */}
        <ImageUpload
          value={currentCategory.image}
          onChange={(url) => updateCategoryField('image', url)}
          label="Category Image"
          sizeGuide={{ width: 800, height: 600, maxSize: '2MB' }}
          aspectRatio="4:3"
        />

        {/* Specs */}
        <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
          <div>
            <label className="block text-sm font-bold mb-1">Origin (EN)</label>
            <input
              className="w-full p-2 border rounded"
              value={currentCategory.specs.origin.en}
              onChange={e => updateCategoryField('specs.origin.en', e.target.value)}
              placeholder="e.g., India / Pakistan"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Origin (JP)</label>
            <input
              className="w-full p-2 border rounded"
              value={currentCategory.specs.origin.jp}
              onChange={e => updateCategoryField('specs.origin.jp', e.target.value)}
              placeholder="e.g., インド / パキスタン"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Grade</label>
            <input
              className="w-full p-2 border rounded"
              value={currentCategory.specs.grade}
              onChange={e => updateCategoryField('specs.grade', e.target.value)}
              placeholder="e.g., Premium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Storage Temp (EN)</label>
            <input
              className="w-full p-2 border rounded"
              value={currentCategory.specs.temp.en}
              onChange={e => updateCategoryField('specs.temp.en', e.target.value)}
              placeholder="e.g., Room Temperature"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Storage Temp (JP)</label>
            <input
              className="w-full p-2 border rounded"
              value={currentCategory.specs.temp.jp}
              onChange={e => updateCategoryField('specs.temp.jp', e.target.value)}
              placeholder="e.g., 常温"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => setViewMode('categories')}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-bold flex items-center gap-2"
          >
            <Save size={18} />
            Save Category
          </button>
        </div>
      </form>
    </div>
  );

  // Categories List View
  const CategoriesView = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Product Categories</h2>
        <button
          onClick={handleCreateCategory}
          className="flex items-center gap-2 px-4 py-2 bg-aavo-green text-white rounded hover:bg-green-700 shadow-lg font-bold"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="h-40 bg-gray-200 relative">
              {product.image && (
                <img src={product.image} alt={product.name.en} className="w-full h-full object-cover" />
              )}
              <div className="absolute top-2 right-2 bg-aavo-green text-white text-xs px-2 py-1 rounded">
                {product.subProducts?.length || 0} products
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800">{product.name.en}</h3>
              <p className="text-sm text-gray-500 mb-3">{product.name.jp}</p>
              <p className="text-xs text-gray-400 mb-4">{product.specs.origin.en}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewProducts(product.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  <Package size={16} /> Products
                </button>
                <button
                  onClick={() => handleEditCategory(product)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded border"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteCategory(product.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded border border-red-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-500 bg-white rounded-lg border border-dashed">
            <Grid size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No categories found. Add one to get started.</p>
          </div>
        )}
      </div>
    </>
  );

  // Products List View
  const ProductsView = () => (
    <>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setViewMode('categories')}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-700">
            {selectedCategory?.name.en || 'Products'}
          </h2>
          <p className="text-sm text-gray-500">{selectedCategory?.name.jp}</p>
        </div>
        <button
          onClick={handleCreateProduct}
          className="flex items-center gap-2 px-4 py-2 bg-aavo-green text-white rounded hover:bg-green-700 shadow-lg font-bold"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedCategory?.subProducts?.map((subProduct, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="h-40 bg-gray-200">
              {subProduct.image && (
                <img src={subProduct.image} alt={subProduct.name.en} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800">{subProduct.name.en}</h3>
              <p className="text-sm text-gray-500 mb-4">{subProduct.name.jp}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditProduct(index)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded border border-red-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {(!selectedCategory?.subProducts || selectedCategory.subProducts.length === 0) && (
          <div className="col-span-full text-center py-16 text-gray-500 bg-white rounded-lg border border-dashed">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No products in this category. Add one to get started.</p>
          </div>
        )}
      </div>
    </>
  );

  // Product Form View
  const ProductFormView = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setViewMode('products')} className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold">
            {editingSubProductIndex !== null ? 'Edit Product' : 'New Product'}
          </h2>
        </div>
        <button onClick={() => setViewMode('products')} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      <div className="mb-4 p-3 bg-gray-100 rounded">
        <p className="text-sm text-gray-600">
          Category: <span className="font-bold">{selectedCategory?.name.en}</span>
        </p>
      </div>

      <form onSubmit={handleSaveProduct} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Product Name (EN)</label>
            <input
              required
              className="w-full p-2 border rounded"
              value={currentSubProduct.name.en}
              onChange={e => setCurrentSubProduct(prev => ({
                ...prev,
                name: { ...prev.name, en: e.target.value }
              }))}
              placeholder="e.g., Basmati Rice 5kg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Product Name (JP)</label>
            <input
              required
              className="w-full p-2 border rounded"
              value={currentSubProduct.name.jp}
              onChange={e => setCurrentSubProduct(prev => ({
                ...prev,
                name: { ...prev.name, jp: e.target.value }
              }))}
              placeholder="e.g., バスマティライス 5kg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Product Description (EN)</label>
            <textarea
              rows={3}
              className="w-full p-2 border rounded"
              value={currentSubProduct.description?.en || ''}
              onChange={e => setCurrentSubProduct(prev => ({
                ...prev,
                description: { ...(prev.description || { en: '', jp: '' }), en: e.target.value }
              }))}
              placeholder="Specific description for this product..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Product Description (JP)</label>
            <textarea
              rows={3}
              className="w-full p-2 border rounded"
              value={currentSubProduct.description?.jp || ''}
              onChange={e => setCurrentSubProduct(prev => ({
                ...prev,
                description: { ...(prev.description || { en: '', jp: '' }), jp: e.target.value }
              }))}
              placeholder="この商品の具体的な説明..."
            />
          </div>
        </div>

        <ImageUpload
          value={currentSubProduct.image}
          onChange={(url) => setCurrentSubProduct(prev => ({ ...prev, image: url }))}
          label="Product Image"
          sizeGuide={{ width: 600, height: 600, maxSize: '2MB' }}
          aspectRatio="1:1"
        />

        {currentSubProduct.image && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={async () => {
                if (!currentSubProduct.image) return;
                setIsAnalyzing(true);
                try {
                  const base64Image = await getImageAsBase64(currentSubProduct.image);
                  const data = await analyzeProductImage(base64Image);
                  if (data) {
                    setCurrentSubProduct(prev => ({
                      ...prev,
                      name: { en: data.name.en, jp: data.name.jp },
                      description: { en: data.description.en, jp: data.description.jp }
                    }));
                  }
                } catch (error: any) {
                  console.error("Analysis failed:", error);
                  alert(`Failed to analyze image: ${error.message || "Unknown error"}`);
                } finally {
                  setIsAnalyzing(false);
                }
              }}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              {isAnalyzing ? 'Analyzing...' : 'Auto-Fill with AI'}
            </button>
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => setViewMode('products')}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-bold flex items-center gap-2"
          >
            <Save size={18} />
            Save Product
          </button>
        </div>
      </form>
    </div>
  );

  // Catalog View
  const CatalogView = () => (
    <div className="max-w-2xl bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <LinkIcon size={24} className="text-aavo-green" />
        Catalog Download URL
      </h2>
      <p className="text-gray-600 mb-6">
        This is the URL that users will be directed to when they unlock the catalog on the website.
        You can paste a Google Drive link, Dropbox link, or a direct file URL here.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Download Link</label>
        <input
          type="text"
          className="w-full p-3 border rounded focus:ring-2 focus:ring-aavo-green focus:outline-none"
          placeholder="https://example.com/my-catalog.pdf"
          value={tempCatalogUrl}
          onChange={(e) => setTempCatalogUrl(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveCatalog}
          className="px-6 py-3 bg-aavo-green text-white font-bold rounded shadow hover:bg-green-700 flex items-center gap-2"
        >
          <Save size={18} /> Update Catalog Link
        </button>
      </div>
    </div>
  );

  // Logo Settings View
  const LogoView = () => (
    <div className="max-w-2xl">
      <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <ImageIcon size={24} className="text-aavo-green" />
          Website Logo
        </h2>
        <p className="text-gray-600 mb-6">
          Upload your company logo to display in the header and footer of the website.
          The logo will be stored locally in the browser.
        </p>

        <ImageUpload
          value={logoUrl}
          onChange={(url) => updateLogoUrl(url)}
          label="Company Logo"
          sizeGuide={{ width: 200, height: 60, maxSize: '500KB' }}
          aspectRatio="3:1"
        />

        {logoUrl && (
          <div className="mt-6 p-4 bg-gray-900 rounded-lg">
            <p className="text-xs text-gray-400 mb-3">Preview on dark background (header/footer):</p>
            <img src={logoUrl} alt="Logo preview" className="h-12 object-contain" />
          </div>
        )}
      </div>

      {/* Size Guide Reference */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="font-bold text-lg mb-4">Image Size Guidelines</h3>
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded">
            <div>
              <p className="font-semibold text-gray-700">Logo</p>
              <p className="text-gray-500">200 x 60px</p>
              <p className="text-xs text-gray-400">Ratio 3:1, Max 500KB</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Category Image</p>
              <p className="text-gray-500">800 x 600px</p>
              <p className="text-xs text-gray-400">Ratio 4:3, Max 2MB</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Product Image</p>
              <p className="text-gray-500">600 x 600px</p>
              <p className="text-xs text-gray-400">Ratio 1:1, Max 2MB</p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            <p className="font-semibold mb-1">Tips for best results:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use PNG format for logos with transparency</li>
              <li>Use JPG/WebP for product photos (smaller file size)</li>
              <li>Compress images before uploading to save storage space</li>
              <li>Images are stored in browser localStorage (limited to ~5MB total)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on view mode
  const renderContent = () => {
    switch (viewMode) {
      case 'category-form':
        return <CategoryFormView />;
      case 'products':
        return <ProductsView />;
      case 'product-form':
        return <ProductFormView />;
      case 'catalog':
        return <CatalogView />;
      case 'logo':
        return <LogoView />;
      default:
        return <CategoriesView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <NavHeader />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
