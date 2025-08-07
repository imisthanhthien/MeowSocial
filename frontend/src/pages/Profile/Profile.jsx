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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Avatar và thông tin */}
<div className="bg-white shadow-lg rounded-2xl p-6 sm:flex sm:items-start gap-8 mb-6 border border-purple-100 hover:shadow-xl transition-shadow duration-300">
  <div className="relative">
    <img
      src={preview || 'https://placekitten.com/100/100'}
      alt="Avatar"
      className="rounded-full w-24 h-24 sm:w-32 sm:h-32 object-cover border-4 border-transparent bg-gradient-to-br from-purple-400 to-pink-400 p-1"
    />
    {editMode && (
      <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
        <label className="cursor-pointer">
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

  <div className="flex-1 mt-4 sm:mt-0 space-y-3">
    {editMode ? (
      <>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên hiển thị"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Giới thiệu bản thân"
          rows={3}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
        />
      </>
    ) : (
      <>
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600 italic">{user.bio || '📝 Chưa có giới thiệu bản thân.'}</p>
      </>
    )}
  </div>
  {/* Nút chỉnh sửa */}
      <div className="mb-6">
        {editMode ? (
          <div className="flex gap-3">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
              onClick={handleSave}
            >
              Lưu
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded"
              onClick={() => setEditMode(false)}
            >
              Huỷ
            </button>
          </div>
        ) : (
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
            onClick={() => setEditMode(true)}
          >
            Chỉnh sửa
          </button>
        )}
      </div>
    
</div>



    

      {/* Danh sách bài viết */}
      <p className="text-lg text-center font-semibold mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 rounded-xl shadow">
        📌 Bài viết của bạn
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
                  // onEdit={handleEdit}
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
