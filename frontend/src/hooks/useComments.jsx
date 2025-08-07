import { useState, useEffect, useCallback, useRef } from 'react';
import commentService from '../services/comment.service';

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false); // dùng cho tạo/sửa/xoá
  const [commentsLoading, setCommentsLoading] = useState(true); // dùng riêng cho fetch
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  // cleanup
 useEffect(() => {
  isMounted.current = true; 

  return () => {
    isMounted.current = false; 
  };
}, []);

const fetchComments = useCallback(async () => {
  if (!postId) return;

  setCommentsLoading(true);
  setError(null);

  try {
    const res = await commentService.getCommentsByPostId(postId);
    const rawData = res;

    // 👉 Nếu không có dữ liệu (null hoặc undefined), thì gán mảng rỗng
    if (!rawData) {
        
      if (isMounted.current) setComments([]);
      return;
    }


    const commentsArray = Array.isArray(rawData) ? rawData : [rawData];

    const formattedComments = commentsArray.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      user: {
        id: c.user?.id,
        name: c.user?.name,
        avatarUrl: c.user?.avatarUrl,
      },
    }));

    if (isMounted.current) {
      
      setComments(formattedComments);
    }
  } catch (err) {
    console.error('🔴 Error fetching comments:', err);
    if (isMounted.current) setError(err);
  } finally {
    if (isMounted.current) setCommentsLoading(false);
  }
}, [postId]);


  const createComment = useCallback(async (data) => {
    setLoading(true);
    try {
      const newComment = await commentService.createComment(data);
      if (isMounted.current && newComment) {
        setComments((prev) => [...prev, newComment]);
      }
    } catch (err) {
      console.error('🔴 Error creating comment:', err);
      if (isMounted.current) setError(err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  const deleteComment = useCallback(async (id) => {
    setLoading(true);
    try {
      await commentService.deleteComment(id);
      if (isMounted.current) {
        setComments((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error('🔴 Error deleting comment:', err);
      if (isMounted.current) setError(err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  const updateComment = useCallback(async (id, content) => {
    setLoading(true);
    try {
      const updated = await commentService.updateComment(id, content);
      if (isMounted.current && updated) {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, content: updated.content } : c))
        );
      }
    } catch (err) {
      console.error('🔴 Error updating comment:', err);
      if (isMounted.current) setError(err);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  // fetch khi postId thay đổi
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [fetchComments]);

  return {
    comments,
    loading,
    commentsLoading,
    error,
    fetchComments,
    createComment,
    deleteComment,
    updateComment,
  };
};

export default useComments;
