import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error('❌ Lỗi khi lấy bài viết:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <p className="text-center mt-10">Đang tải bài viết...</p>;
  if (!post) return <p className="text-center mt-10">Không tìm thấy bài viết.</p>;
 console.log(post);
  return (
    <div className="mt-6">
      <PostCard post={post} />
    </div>
  );
}
