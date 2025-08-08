import commentApi from '../api/comment.api';

const commentService = {
  createComment: async (data) => {
    try {
      const res = await commentApi.create(data);
      return res.data;
    } catch (error) {
      console.error('❌ Error creating comment:', error);
      throw error;
    }
  },

  getAllComments: async () => {
    try {
      const res = await commentApi.getAll();
      return res.data;
    } catch (error) {
      console.error('❌ Error fetching all comments:', error);
      throw error;
    }
  },

  getCommentsByPostId: async (postId) => {
    try {
      const res = await commentApi.getByPostId(postId);
      return res.data;
    } catch (error) {
      console.error(`❌ Error fetching comments for post ${postId}:`, error);
      throw error;
    }
  },

  getCommentById: async (id) => {
    try {
      const res = await commentApi.getById(id);
      return res.data;
    } catch (error) {
      console.error(`❌ Error fetching comment with id ${id}:`, error);
      throw error;
    }
  },

  updateComment: async (id, content) => {
    try {
      const res = await commentApi.update(id, content);
      return res.data;
    } catch (error) {
      console.error(`❌ Error updating comment with id ${id}:`, error);
      throw error;
    }
  },

  deleteComment: async (id) => {
    try {
      const res = await commentApi.remove(id);
      return res.data;
    } catch (error) {
      console.error(`❌ Error deleting comment with id ${id}:`, error);
      throw error;
    }
  },
};

export default commentService;
