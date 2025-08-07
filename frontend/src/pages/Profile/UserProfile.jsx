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
    : 'https://placekitten.com/100/100';

  return (
   <div className="container mx-auto px-4 py-8">
  {/* Profile Header */}
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 bg-white p-6 rounded-2xl shadow-md border border-purple-100">
    {/* Avatar */}
    <img
      src={avatar}
      alt="avatar"
      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-purple-200 shadow-sm transition-transform duration-300 hover:scale-105"
    />

    {/* User Info */}
    <div className="flex-1 text-center sm:text-left">
      <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
      <p className="text-gray-600 mt-1 italic">{user.bio || '📝 Chưa có giới thiệu.'}</p>
    </div>

    {/* Follow Button */}
    {currentUser?.id !== id && (
      <div className="mt-4 sm:mt-0">
        {!isFollowing ? (
          <button
            onClick={follow}
            disabled={followLoading}
            className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition duration-200 shadow-md"
          >
            + Theo dõi
          </button>
        ) : (
          <div className="relative inline-block text-left">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-gray-500 hover:bg-gray-600 transition duration-200 shadow-md flex items-center gap-2"
            >
              ✅ Đã theo dõi
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  showDropdown ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                <button
                  onClick={() => {
                    unfollow();
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100 transition"
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

  {/* Posts Section */}
  <h3 className="text-lg text-center font-semibold mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 rounded-xl shadow">
    📝 Bài viết của {user.name}
    </h3>

  <div className="space-y-4">
    {posts.length > 0 ? (
      posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={() => {}} />
      ))
    ) : (
      <div className="text-gray-500 text-center py-8 bg-white border border-dashed border-gray-300 rounded-xl">
        Không có bài viết nào được hiển thị.
      </div>
    )}
  </div>
</div>

  );
}
