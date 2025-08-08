import { usePosts } from '../../hooks/usePosts';
import PostCard from '../../components/PostCard';
import CreatePost from '../../components/CreatePost';

export default function Home() {
  const {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
  } = usePosts();

  // Hàm tạo bài viết mới 
  const handleCreate = async (data) => {
    await createPost(data);
  };

  // Hàm chỉnh sửa bài viết
  const handleEdit = async (id, updatedData) => {
    await updatePost(id, updatedData);
  };

  // Hàm xoá bài viết
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xoá bài viết này không?')) {
      await deletePost(id);
    }
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-blue-50 min-h-screen pt-6 px-4 md:px-8">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Form tạo bài viết */}
        <div className="bg-gradient-to-br from-pink-100 via-white to-rose-100 border border-pink-300 shadow-xl rounded-3xl p-6 max-w-xl w-full mx-auto text-gray-800 tracking-wide hover:shadow-pink-300 transition duration-300">
          <h2 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
            🐾 Tạo bài viết mới
          </h2>
          <CreatePost onCreate={handleCreate} />
        </div>

        {/* Danh sách bài viết */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-pink-500 font-semibold animate-pulse">
              😺 Đang tải bài viết...
            </p>
          ) : Array.isArray(posts) && posts.length > 0 ? (
            posts
              .slice()
              .reverse()
              .map((post) => (
                <div
                  key={post.id}

                >
                  <PostCard post={post} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
              ))
          ) : (
            <p className="text-center text-blue-400 font-medium">
              😿 Chưa có bài viết nào.
            </p>
          )}
        </div>
      </div>
    </div>

  );
}
