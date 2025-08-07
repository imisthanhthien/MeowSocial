import { useState, useRef } from 'react';
import { uploadImage } from '../api/upload.api';
import { useAuth } from "../contexts/AuthContext";

export default function CreatePost({ onCreate }) {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const avatarUrl = user?.avatarUrl
    ? `${import.meta.env.VITE_API_BASE_URL}${user.avatarUrl}`
    : "https://i.pravatar.cc/150?img=32";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = null;

    if (file) {
      const res = await uploadImage(file);
      imageUrl = res.imageUrl;
    }

    if (onCreate) {
      await onCreate({ content, imageUrl });
    }

    setContent('');
    setFile(null);
    setPreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md mb-6 w-full max-w-2xl mx-auto"
    >
      {/* Phần trên: Avatar + ô nhập */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bạn đang nghĩ gì thế?"
          className="w-full border border-gray-300 rounded-2xl px-4 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm sm:text-base"
          rows={3}
        />
      </div>

      {/* Xem trước ảnh */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="rounded-lg max-w-full max-h-80 object-cover mb-3"
        />
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Hàng dưới: Nút thêm ảnh + nút đăng */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-3 gap-3 sm:gap-0">
        <button
          type="button"
          onClick={handleChooseFile}
          className="flex items-center justify-center sm:justify-start space-x-2 text-purple-600 hover:bg-purple-100 px-3 py-2 rounded transition"
        >
          <span className="text-xl">📷</span>
          <span className="font-medium text-sm">Ảnh/Video</span>
        </button>

        <button
          type="submit"
          className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition text-sm font-medium self-end sm:self-auto"
        >
          Đăng bài
        </button>
      </div>
    </form>
  );
}
