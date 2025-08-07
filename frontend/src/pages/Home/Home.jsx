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
   <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen pt-5 px-4 md:px-8">
  <div className="max-w-2xl mx-auto space-y-10">
    
    {/* Form tạo bài viết */}
    <div className="bg-white rounded-xl  max-w-xl w-full mx-auto">
  <CreatePost onCreate={handleCreate} />
</div>

    {/* Danh sách bài viết */}
    <div className="space-y-6">
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Đang tải bài viết...</p>
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
        <p className="text-center text-gray-500">Chưa có bài viết nào.</p>
      )}
    </div>
  </div>
</div>

  );
}
