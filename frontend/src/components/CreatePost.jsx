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
      className="p-2 rounded-lg shadow-sm w-auto bg-white"
    >
      {/* Avatar + input */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-9 h-9 rounded-full object-cover"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bạn đang nghĩ gì?"
          className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
          rows={1}
        />
      </div>

      {/* Preview image */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="rounded-md max-w-full max-h-64 object-cover mb-2"
        />
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Footer: action buttons */}
      <div className="flex justify-between items-center border-t pt-2 mt-2">
        <button
          type="button"
          onClick={handleChooseFile}
          className="flex items-center gap-1 text-gray-600 text-sm hover:text-purple-600 transition"
        >
          <FaPhotoVideo className="w-4 h-4 text-purple-600" />
          <span>Ảnh/Video</span>
        </button>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-1.5 rounded-full hover:bg-purple-700 transition text-sm font-medium"
        >
          Đăng
        </button>
      </div>
    </form>

  );
}
