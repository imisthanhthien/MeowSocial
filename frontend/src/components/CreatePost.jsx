import { useState, useRef } from 'react';
import { uploadImage } from '../api/upload.api';
import { useAuth } from "../contexts/AuthContext";
import { FaPhotoVideo } from "react-icons/fa";

export default function CreatePost({ onCreate }) {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const avatarUrl = user?.avatarUrl
    ? `${import.meta.env.VITE_API_BASE_URL}${user.avatarUrl}`
    : `${import.meta.env.VITE_API_BASE_URL}${'/uploads/default_avatar.jpg'}` ;

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
      className="p-4 rounded-2xl shadow-md w-full max-w-xl mx-auto bg-white border border-pink-100"
    >
      {/* Avatar + Input */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-200"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bạn đang nghĩ gì?"
          className="w-full bg-pink-50 rounded-xl px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none shadow-inner transition"
          rows={2}
        />
      </div>

      {/* Preview Image */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="rounded-xl max-w-full max-h-64 object-cover mb-3 border border-pink-100 shadow-sm"
        />
      )}

      {/* File Input (Hidden) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Footer Buttons */}
      <div className="flex justify-between items-center border-t pt-3 mt-3">
        <button
          type="button"
          onClick={handleChooseFile}
          className="flex items-center gap-2 text-gray-500 hover:text-pink-600 transition text-sm font-medium"
        >
          <FaPhotoVideo className="w-5 h-5 text-pink-500" />
          <span>Thêm ảnh/video</span>
        </button>

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition"
        >
          Đăng
        </button>
      </div>
    </form>

  );
}
