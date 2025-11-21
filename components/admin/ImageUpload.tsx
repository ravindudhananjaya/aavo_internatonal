import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  sizeGuide?: {
    width: number;
    height: number;
    maxSize: string;
  };
  aspectRatio?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label,
  sizeGuide = { width: 800, height: 600, maxSize: '2MB' },
  aspectRatio = '4:3'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useUrl, setUseUrl] = useState(!value || !value.startsWith('data:'));
  const [urlInput, setUrlInput] = useState(value && !value.startsWith('data:') ? value : '');

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, GIF, WebP)');
      setIsUploading(false);
      return;
    }

    // Validate file size (max 2MB for localStorage)
    const maxSizeBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeBytes) {
      setError('Image size must be less than 2MB. Please compress the image or use a URL instead.');
      setIsUploading(false);
      return;
    }

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onChange(base64);
        setIsUploading(false);
        setUseUrl(false);
      };
      reader.onerror = () => {
        setError('Failed to read file. Please try again.');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setError('Failed to process image. Please try again.');
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setError(null);
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-gray-700">{label}</label>

      {/* Size Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
        <div className="flex items-start gap-2">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold mb-1">Image Size Guide:</p>
            <ul className="space-y-0.5">
              <li>Recommended: {sizeGuide.width} x {sizeGuide.height}px ({aspectRatio})</li>
              <li>Max file size: {sizeGuide.maxSize}</li>
              <li>Formats: JPG, PNG, WebP</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Toggle between URL and Upload */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => setUseUrl(true)}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
            useUrl ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          URL Link
        </button>
        <button
          type="button"
          onClick={() => setUseUrl(false)}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
            !useUrl ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Upload File
        </button>
      </div>

      {useUrl ? (
        /* URL Input */
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded text-sm"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onBlur={handleUrlSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Set
          </button>
        </div>
      ) : (
        /* File Upload */
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isUploading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-blue-600">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Processing...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <Upload size={32} />
              <span className="text-sm font-medium">Click to upload image</span>
              <span className="text-xs">Max size: {sizeGuide.maxSize}</span>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-2 text-red-600 text-xs flex items-center gap-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative">
          <div className="border rounded-lg overflow-hidden bg-gray-100">
            <img
              src={value}
              alt="Preview"
              className="w-full h-40 object-contain"
              onError={() => setError('Failed to load image. Please check the URL.')}
            />
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
          >
            <X size={16} />
          </button>
          <div className="mt-2 text-xs text-gray-500 truncate">
            {value.startsWith('data:') ? 'Uploaded image (stored locally)' : value}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!value && !useUrl && (
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <ImageIcon size={16} />
          <span>No image selected</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
