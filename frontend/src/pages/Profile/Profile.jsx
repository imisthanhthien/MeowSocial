import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../hooks/useUser';
import { uploadImage } from '../../api/upload.api';
import CreatePost from '../../components/CreatePost';
import PostCard from '../../components/PostCard';
import { usePosts } from '../../hooks/usePosts';

export default function Profile() {
  const { user: authUser } = useAuth();
  const userId = authUser?.id;
  const {
    posts,
    createPost,
    deletePost,
  } = usePosts(userId);

  const {
    user,
    updateProfile,
    fetchUser,
    loading,
    error,
  } = useUser(userId);


  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);


  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setBio(user.bio || '');
      setPreview(
        user.avatarUrl
          ? `${import.meta.env.VITE_API_BASE_URL}${user.avatarUrl}`
          : ''
      );
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    let avatarUrl = user.avatar;

    if (avatarFile) {
      try {
        const data = await uploadImage(avatarFile);
        avatarUrl = data.imageUrl;
      } catch (err) {
        console.error('Lỗi upload ảnh:', err);
        return;
      }
    }

    await updateProfile({ name, bio, avatarUrl });
    await fetchUser();
    setEditMode(false);
  };

  const handleCreate = async (data) => {
    await createPost(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xoá bài viết này không?')) {
      await deletePost(id);
    }
  };

  if (loading) return <p>Đang tải thông tin...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Không tìm thấy người dùng</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-pink-50 rounded-2xl shadow-lg border border-pink-200">

      {/* Avatar và thông tin */}
      <div className="bg-gradient-to-br from-pink-50 via-rose-100 to-pink-100 rounded-3xl p-6 sm:flex sm:items-start gap-8 mb-10 border-2 border-pink-200 shadow-md hover:shadow-pink-300 transition-shadow duration-500 group">

        {/* Avatar */}
        <div className="relative">
          <img
            src={preview || `${import.meta.env.VITE_API_BASE_URL}${'/uploads/default_avatar.jpg'}`}
            alt="Avatar"
            className="rounded-full w-24 h-24 sm:w-32 sm:h-32 object-cover ring-4 ring-white bg-gradient-to-tr from-pink-300 via-purple-400 to-yellow-300 p-1 shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
          {editMode && (
            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md border border-purple-300">
              <label className="cursor-pointer" title="Thay ảnh đại diện">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L13 4.172l2.828 2.828 1.586-1.586a2 2 0 000-2.828zM11.586 5L4 12.586V16h3.414L15 8.414 11.586 5z" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Thông tin user */}
        <div className="flex-1 mt-4 sm:mt-0 space-y-4">
          {editMode ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="🐾 Tên hiển thị"
                className="border border-purple-300 px-5 py-3 rounded-2xl w-full shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 font-semibold bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 placeholder-purple-400 transition duration-300"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="📝 Giới thiệu bản thân"
                rows={4}
                className="border border-pink-300 px-5 py-3 rounded-2xl w-full shadow-md focus:outline-none focus:ring-4 focus:ring-pink-300 resize-none bg-gradient-to-r from-pink-50 to-pink-100 text-pink-900 placeholder-pink-400 font-medium transition duration-300"
              />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold text-purple-800 flex items-center gap-3 select-none">
                <span className="text-4xl animate-bounce">😺</span> {user.name}
              </h2>
              <p className="text-pink-600 italic text-lg leading-relaxed  p-4 rounded-xl max-w-prose">
                {user.bio || 'Chưa có gì để giới thiệu cả 😿'}
              </p>
            </>
          )}
        </div>


        {/* Nút chức năng */}
        <div className="mb-4 sm:mb-0 flex-shrink-0">
          {editMode ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                className="bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-white px-5 py-2 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 font-semibold text-sm"
                onClick={handleSave}
              >
                💖 Lưu lại nè
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-2xl shadow-md transition-all duration-300 hover:scale-105 font-semibold text-sm"
                onClick={() => setEditMode(false)}
              >
                🙅‍♀️ Huỷ bỏ
              </button>
            </div>
          ) : (
            <button
              className="bg-gradient-to-r from-green-300 to-green-400 hover:from-green-400 hover:to-green-500 text-white px-5 py-2 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 font-semibold text-sm"
              onClick={() => setEditMode(true)}
            >
              🎨 Chỉnh sửa chút nè
            </button>
          )}
        </div>

      </div>

      <p className="text-xl text-center font-bold mb-4 px-6 py-3 rounded-2xl shadow-lg bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-purple-700 animate-fade-in">
        🐾 <span className="drop-shadow">Bài viết của bạn</span> 🐾
      </p>


      {/* Form đăng bài */}
      <div className="mb-6">
        <div className="bg-white rounded-xl  max-w-xl w-full mx-auto">
          <CreatePost onCreate={handleCreate} />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải bài viết...</p>
      ) : (
        <div className="space-y-6">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts
              .slice()
              .reverse()
              .map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={handleDelete}
                />
              ))
          ) : (
            <p className="text-center text-gray-500">Chưa có bài viết nào.</p>
          )}
        </div>
      )}
    </div>
  );
}
