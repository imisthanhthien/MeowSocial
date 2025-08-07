// ./hooks/usePosts.jsx
import { useState, useEffect } from 'react';
import postService from '../services/post.service';

export const usePosts = (userId = null) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = userId
        ? await postService.getByUserId(userId)
        : await postService.getAll();

      const data = res?.data ?? res; // xử lý nếu response là res.data hoặc res trực tiếp
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.warn('⚠️ Dữ liệu không phải mảng:', data);
        setPosts([]);
      }
    } catch (err) {
      console.error('❌ Lỗi khi fetch posts:', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (data) => {
    try {
      const res = await postService.create(data);
      await fetchPosts();
      return res;
    } catch (err) {
      console.error('❌ Lỗi khi tạo post:', err);
      throw err;
    }
  };

  const updatePost = async (id, data) => {
    try {
      const res = await postService.update(id, data);
      await fetchPosts();
      return res;
    } catch (err) {
      console.error('❌ Lỗi khi cập nhật post:', err);
      throw err;
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await postService.delete(id);
      await fetchPosts();
      return res;
    } catch (err) {
      console.error('❌ Lỗi khi xóa post:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
};
