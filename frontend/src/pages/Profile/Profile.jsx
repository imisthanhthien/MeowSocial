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
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
        <img
          src={preview || 'https://placekitten.com/100/100'}
          alt="Avatar"
          className="rounded-full w-24 h-24 sm:w-32 sm:h-32 object-cover"
        />

        <div className="w-full max-w-md">
          {editMode ? (
            <div className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên hiển thị"
                className="border px-3 py-2 rounded w-full"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Giới thiệu bản thân"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.bio || 'Chưa có giới thiệu'}</p>
            </>
          )}
        </div>
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

      <hr className="mb-6" />

      {/* Form đăng bài */}
      <div className="mb-6">
        <CreatePost onCreate={handleCreate} />
      </div>

      {/* Danh sách bài viết */}
      <p className="text-lg font-semibold mb-4">Bài viết của bạn</p>

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
