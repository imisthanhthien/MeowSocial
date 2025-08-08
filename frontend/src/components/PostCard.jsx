import { useState, useEffect, useRef } from 'react';
import { useLike } from '../hooks/useLike';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useComments } from '../hooks/useComments';
import { FaHeart } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { FaEllipsisV } from 'react-icons/fa';
import { FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';


export default function PostCard({ post, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [likedCommentIds, setLikedCommentIds] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const menuRef = useRef(null);

  dayjs.locale({
    ...dayjs.Ls['vi'],
    relativeTime: {
      future: 'trong %s',
      past: '%s trước',
      s: '%d giây',
      m: '1 phút',
      mm: '%d phút',
      h: '1 giờ',
      hh: '%d giờ',
      d: '1 ngày',
      dd: '%d ngày',
      M: '1 tháng',
      MM: '%d tháng',
      y: '1 năm',
      yy: '%d năm'
    }
  }, null, true);
  dayjs.extend(relativeTime);
  dayjs.locale('vi');

  const { user: authUser } = useAuth();
  const { liked, likeCount, like, unlike, loading } = useLike(post?.id);
  const {
    comments,
    loading: commentsLoading,
    createComment,
    deleteComment,
    updateComment
  } = useComments(post?.id);


  const toggleLike = (id) => {
    setLikedCommentIds((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const toggleExpanded = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddComment = async (e) => {

    if (!newComment.trim()) return;
    await createComment({ userId: authUser.id, postId: post.id, content: newComment });
    setNewComment('');
  };


  const avatar = post.user?.avatarUrl
    ? `${import.meta.env.VITE_API_BASE_URL}${post.user.avatarUrl}`
    : 'https://placekitten.com/40/40';

  const image = post.imageUrl
    ? `${import.meta.env.VITE_API_BASE_URL}${post.imageUrl}`
    : null;

  const createdAt = new Date(post.createdAt).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="bg-gradient-to-br from-amber-100 via-white to-emerald-100 border border-pink-300 rounded-xl shadow-md p-4 max-w-xl w-full mx-auto relative">
      
      {/* Menu 3 chấm */}
      <div className="absolute top-2 right-2" ref={menuRef}>
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="text-pink-400 hover:text-pink-600 text-2xl font-bold px-2 transition-colors duration-200"
        >
          ⋮
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 bg-pink-50 border border-pink-200 rounded-xl shadow-lg z-10 w-36 overflow-hidden">
            {authUser?.id === post.user?.id && (
              <>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onEdit(post);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-pink-100 text-pink-600 w-full text-left transition duration-200"
                >
                  🐾 Sửa bài
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDelete(post.id);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-red-100 text-red-500 w-full text-left transition duration-200"
                >
                  🗑️ Xóa bài
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar}
          alt="Avatar"
          className="rounded-full w-11 h-11 object-cover ring-2 ring-pink-300 shadow-sm"
        />
        <div>
          {post.user?.id ? (
            <Link
              to={post.user.id === authUser?.id ? '/profile' : `/users/${post.user.id}`}
              className="font-semibold text-[15px] md:text-base text-pink-500 hover:underline hover:text-pink-600 transition duration-200"
            >
              {post.user.name}
            </Link>
          ) : (
            <p className="font-semibold text-[15px] md:text-base text-gray-700 italic">Ẩn danh</p>
          )}
          <p className="text-[12px] text-gray-400 mt-0.5">
            {dayjs(post.createdAt).fromNow()}
          </p>
        </div>
      </div>

      {/* Nội dung bài viết */}
      {post.content && (
        <p className="text-sm md:text-base text-gray-800 mb-3 whitespace-pre-line break-words">
          {post.content}
        </p>
      )}

      {/* Ảnh bài viết */}
      {image && (
        <div className="w-full h-[600px] overflow-hidden rounded-lg">
          <img
            src={image}
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>


      )}


      {/* Hành động */}
      <div className="flex justify-between items-center mt-3 px-4 py-2 rounded-2xl text-sm space-x-3 bg-pink-50/40 shadow-inner">

        {/* Like button */}
        <button
          onClick={liked ? unlike : like}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 font-semibold border shadow-sm
      ${liked
              ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
              : 'bg-white text-pink-400 hover:bg-pink-50 hover:text-pink-500'
            }`}
        >
          <span className="text-xl">{liked ? '💖' : '🤍'}</span>
          <span className="font-medium">{likeCount} lượt thích</span>
        </button>

        {/* Comment button */}
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 font-semibold border shadow-sm
      bg-white text-blue-400 hover:bg-blue-50 hover:text-blue-500"
        >
          <span className="text-xl">💬</span>
          <span className="font-medium">Bình luận ({comments.length})</span>
        </button>
      </div>

      {/* Bình luận */}
      {showComments && (
        <div className="mt-4 border-t pt-4 space-y-3">
          {commentsLoading ? (
            <p className="text-center text-pink-400 animate-pulse text-sm">😺 Đang tải bình luận...</p>
          ) : Array.isArray(comments) && comments.length > 0 ? (
            <>
              <div className={`space-y-3 ${showAllComments ? 'max-h-64 overflow-y-auto pr-1' : ''}`}>
                {(showAllComments ? comments : comments.slice(0, 4)).map((comment) => {
                  const isOwner = authUser?.id === comment.user?.id;
                  const isPostAuthor = authUser?.id === post.user?.id;
                  const isCanManage = isOwner || isPostAuthor;

                  return (
                    <div
                      key={comment.id}
                      className="relative flex items-start bg-pink-50 rounded-xl px-5 py-3 gap-4 shadow-md border border-pink-100"
                    >

                      {/* Form chỉnh sửa bình luận */}
                      {editingCommentId === comment.id ? (
                        <div className="mt-2 space-y-2 w-full">
                          <textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="w-full border border-pink-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                            rows={3}
                          />
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => {
                                setEditingCommentId(null);
                                setEditingContent('');
                              }}
                              className="text-sm px-4 py-1 rounded-lg text-pink-600 hover:bg-pink-100 transition"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={async () => {
                                await updateComment(comment.id, editingContent);
                                setEditingCommentId(null);
                              }}
                              className="text-sm px-4 py-1 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>

                          {/* Avatar */}
                          <img
                            src={
                              comment.user?.avatarUrl
                                ? `${import.meta.env.VITE_API_BASE_URL}${comment.user.avatarUrl}`
                                : '/default-avatar.png'
                            }
                            alt={comment.user?.name || "Người dùng"}
                            className="w-10 h-10 rounded-full object-cover border-2 border-pink-200"
                          />

                          {/* Nội dung bình luận */}
                        
                          <div className="flex-1">
                            <div className="flex items-center justify-start space-x-2 relative">
                              <Link
                                to={comment.user.id === authUser?.id ? '/profile' : `/users/${comment.user.id}`}
                                className="font-semibold text-sm md:text-base text-pink-600 hover:underline"
                              >
                                {comment.user?.name || "Ẩn danh"}
                              </Link>

                              {!comment.user.isFollowing && (
                                <button
                                  onClick={() => handleFollow(comment.user.id)}
                                  className="text-xs bg-purple-100 text-purple-600 font-medium px-3 py-1 rounded-full hover:bg-purple-200 transition-colors duration-200"
                                >
                                  + Theo dõi
                                </button>
                              )}
                            </div>

                            <div className="flex justify-between items-start mt-1 w-full relative">

                              {/* Nội dung bình luận bên trái */}
                              <div className="flex-1 max-w-[450px]">
                                <p
                                  className={`text-sm text-pink-800 break-words whitespace-pre-wrap relative transition-all duration-300 ease-in-out
                              ${expandedComments[comment.id] ? '' : 'max-h-12 overflow-hidden line-clamp-2'}`}
                                >
                                  {comment.content}
                                </p>

                                {comment.content.length > 100 && (
                                  <button
                                    onClick={() => toggleExpanded(comment.id)}
                                    className="text-xs text-purple-600 mt-1 hover:underline"
                                  >
                                    {expandedComments[comment.id] ? 'Thu gọn' : 'Xem thêm'}
                                  </button>
                                )}
                              </div>

                              {/* Thời gian góc phải dưới */}
                              <p className="absolute bottom-0 right-0 text-xs text-gray-600 whitespace-nowrap">
                                {dayjs(comment.createdAt).fromNow()}
                              </p>
                            </div>

                            {/* Thao tác Like & Reply */}
                            <div className="flex gap-6 mt-3 text-xs font-semibold text-pink-500">
                              <button
                                onClick={() => toggleLike(comment.id)}
                                className="flex items-center gap-1 hover:text-pink-700 transition"
                              >
                                <FaHeart
                                  className={`${likedCommentIds.includes(comment.id) ? 'text-pink-600' : 'text-pink-300'}`}
                                />
                                Thích
                              </button>

                              <button className="flex items-center gap-1 hover:text-pink-700 transition cursor-pointer">
                                <BiCommentDetail className="text-sm" />
                                Trả lời
                              </button>
                            </div>
                          </div>

                          {/* Menu 3 chấm */}
                          <div className="absolute top-2 right-2" ref={menuRef}>
                            <button
                              onClick={() => setOpenMenuId(openMenuId === comment.id ? null : comment.id)}
                              className="p-1 rounded-full hover:bg-pink-100 transition-colors"
                            >
                              <FaEllipsisV className="text-sm text-pink-400" />
                            </button>

                            {openMenuId === comment.id && (
                              <div className="absolute top-6 right-0 bg-white border border-pink-200 rounded-lg shadow-lg text-sm z-10 w-36">
                                {isCanManage ? (
                                  <>
                                    <button
                                      onClick={() => {
                                        deleteComment(comment.id);
                                        setOpenMenuId(null);
                                      }}
                                      className="block w-full px-4 py-2 text-left text-pink-600 hover:bg-pink-50 rounded-t-lg transition"
                                    >
                                      <FiTrash2 className="inline mr-1" /> Xóa
                                    </button>
                                    {isOwner && (
                                      <button
                                        onClick={() => {
                                          setEditingCommentId(comment.id);
                                          setEditingContent(comment.content);
                                          setOpenMenuId(null);
                                        }}
                                        className="block w-full px-4 py-2 text-left hover:bg-pink-50 rounded-b-lg transition"
                                      >
                                        <FiEdit2 className="inline mr-1" /> Sửa
                                      </button>
                                    )}
                                  </>
                                ) : (
                                  <button
                                    onClick={() => setOpenMenuId(null)}
                                    className="block w-full px-4 py-2 text-left hover:bg-pink-50 rounded-lg transition"
                                  >
                                    <FiUser className="inline mr-1" /> Xem thông tin
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Nút xem thêm bình luận */}
              {!showAllComments && comments.length > 4 && (
                <div className="text-center mt-2">
                  <button
                    onClick={() => setShowAllComments(true)}
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Xem thêm {comments.length - 4} bình luận
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-pink-400 italic">Chưa có bình luận nào.</p>
          )}

          {/* Nhập bình luận */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newComment.trim()) {
                handleAddComment();
              }
            }}
            className="flex gap-2 mt-4"
          >
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="😺 Viết bình luận dễ thương..."
              className="bg-pink-50 border border-pink-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-300 rounded-full px-4 py-2 text-sm text-pink-700 placeholder-pink-400 shadow-sm transition duration-150 outline-none w-full"
            />

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 active:scale-95 transition-transform duration-150 text-white text-sm px-5 py-2 rounded-full shadow-md hover:shadow-lg font-semibold"
            >
              Gửi
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
