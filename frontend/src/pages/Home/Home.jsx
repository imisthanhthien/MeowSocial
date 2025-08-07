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
  } = usePosts(); // Hook tự động fetch bài viết

  // Hàm tạo bài viết mới (nếu CreatePost cần)
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
    <div className="pt-20 px-4 md:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Newsfeed</h1>

        {/* Form tạo bài viết */}
        <CreatePost onCreate={handleCreate} />

        {/* Hiển thị danh sách bài viết */}
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
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
            ) : (
              <p className="text-center text-gray-500">Chưa có bài viết nào.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
