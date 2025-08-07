import { useState, useEffect } from 'react';
import likesService from '../services/likes.service';

export const useLike = (postId) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const resLiked = await likesService.hasLiked(postId); // trả về { liked: true/false }
        const resAllLikes = await likesService.getUsersWhoLikedPost(postId); // trả về mảng user

        if (isMounted) {
          setLiked(resLiked.liked);
         
        setLikeCount(resAllLikes.likeCount);
      
        }
      } catch (err) {
        console.error('Error fetching like info', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  const like = async () => {
    if (loading || liked) return;
    setLoading(true);
    try {
      await likesService.likePost(postId);
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    } catch (err) {
      console.error('Error liking post', err);
    } finally {
      setLoading(false);
    }
  };

  const unlike = async () => {
    if (loading || !liked) return;
    setLoading(true);
    try {
      await likesService.unlikePost(postId);
      setLiked(false);
      setLikeCount((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error('Error unliking post', err);
    } finally {
      setLoading(false);
    }
  };

  return { liked, likeCount, like, unlike, loading };
};
