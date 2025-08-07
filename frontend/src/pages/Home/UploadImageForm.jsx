// src/components/UploadImageForm.jsx
import { useState } from 'react';
import { uploadImage } from '../../api/upload.api'; // ← đã viết ở bước trước

export default function UploadImageForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Vui lòng chọn ảnh!');

    setUploading(true);
    setMessage('');

    try {
      const res = await uploadImage(file);
     console.log('✅ Upload thành công:', res);
      onUploaded?.(res.imageUrl);
      setMessage('🎉 Upload thành công!');
    } catch (err) {
       console.error('❌ Upload thất bại:', err);
     setMessage('❌ Upload thất bại: ' + (err.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold mb-3">Upload ảnh</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="mt-4 w-full h-auto rounded border"
        />
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        {uploading ? 'Đang upload...' : 'Upload'}
      </button>

      {message && (
        <p className="mt-2 text-sm text-center text-green-600">{message}</p>
      )}
    </div>
  );
}
