import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { usePosts } from '../../hooks/usePosts';
import PostCard from '../../components/PostCard';
import { useAuth } from '../../contexts/AuthContext';
import useFollow from '../../hooks/useFollow';
import { useState } from 'react';

export default function UserProfile() {
  const { id } = useParams();
  const { user, loading, error, fetchPublicProfile } = useUser(id);
  const { posts } = usePosts(id);
  const { user: currentUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const followerId = currentUser?.id;
  const followingId = id;
  const { isFollowing, follow, unfollow, loading: followLoading } = useFollow(followerId, followingId);
  useEffect(() => {
    if (id) fetchPublicProfile(id);
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Không tìm thấy người dùng</p>;

  const avatar = user.avatarUrl
    ? `${import.meta.env.VITE_API_BASE_URL}${user.avatarUrl}`
    : `${import.meta.env.VITE_API_BASE_URL}${'/default_avatar.jpg'}`;

  return (

    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-pink-50 via-rose-100 to-purple-50 rounded-[2rem] shadow-[0_15px_30px_-5px_rgba(255,192,203,0.4)] border border-pink-200 relative overflow-hidden">

      {/* Trang trí góc */}
      <div className="absolute top-2 left-4 text-5xl opacity-10 select-none pointer-events-none animate-pulse">🌷</div>
      <div className="absolute bottom-2 right-4 text-5xl opacity-10 select-none pointer-events-none animate-bounce">🐾</div>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 bg-white p-6 rounded-[2rem] shadow-inner border border-pink-100 relative overflow-hidden">

        {/* Sticker hoa */}
        <div className="absolute -top-2 right-4 text-4xl opacity-10 select-none">🌸</div>

        {/* Avatar mèo viền lấp lánh */}
        <div className="relative">
          <img
            src={avatar}
            alt="avatar"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-pink-300 shadow-md hover:scale-105 transition-transform duration-300 bg-white"
          />
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-[3px] border-dashed border-pink-200 animate-spin-slow pointer-events-none"></div>
        </div>

        {/* Thông tin người dùng */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-3xl font-extrabold text-pink-700 flex items-center justify-center sm:justify-start gap-2 select-none">
            🐱 {user.name}
          </h2>
          <p className="text-pink-600 mt-2 italic bg-pink-100 px-4 py-2 rounded-xl inline-block shadow-sm max-w-[90%]">
            {user.bio || '📖 Mèo này chưa có gì để nói cả~'}
          </p>
        </div>

        {/* Nút theo dõi */}
        {currentUser?.id !== id && (
          <div className="mt-4 sm:mt-0">
            {!isFollowing ? (
              <button
                onClick={follow}
                disabled={followLoading}
                className="px-6 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 transition duration-200 shadow-md"
              >
                💞 Theo dõi
              </button>
            ) : (
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="px-6 py-2 rounded-full text-sm font-bold text-white bg-green-400 hover:bg-green-500 transition duration-200 shadow-md flex items-center gap-2"
                >
                  ✅ Đã theo dõi
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${showDropdown ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown hủy theo dõi */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-pink-100 rounded-xl shadow-xl z-10 overflow-hidden">
                    <button
                      onClick={() => {
                        unfollow();
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-pink-100 transition"
                    >
                      ❌ Hủy theo dõi
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tiêu đề bài viết */}
      <h3 className="text-xl text-center font-semibold mb-6 px-6 py-3 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 rounded-full shadow-sm border border-pink-200 inline-block mx-auto">
        📝 Những bài viết xinh xắn của <span className="font-bold">{user.name}</span>
      </h3>

      {/* Danh sách bài viết */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="hover:scale-[1.01] transition-transform duration-200">
              <PostCard key={post.id} post={post} onDelete={() => { }} />
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-8 bg-white border border-dashed border-pink-200 rounded-xl shadow-inner">
            😿 Không có bài viết nào được hiển thị.
          </div>
        )}
      </div>
    </div>

  );
}
