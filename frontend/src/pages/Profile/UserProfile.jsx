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
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <img src={avatar} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.bio || 'Chưa có giới thiệu'}</p>
        </div>
     {currentUser?.id !== id && (
  <div className="relative inline-block text-left">
  {!isFollowing ? (
    <button
      onClick={follow}
      disabled={followLoading}
      className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition duration-200 shadow-md"
    >
      + Theo dõi
    </button>
  ) : (
    <div className="relative inline-block">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 transition duration-200 shadow-md flex items-center gap-1"
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

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button
            onClick={() => {
              unfollow();
              setShowDropdown(false);
            }}
            className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100 rounded-b-lg"
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

      <h3 className="text-lg font-semibold mb-4">Bài viết của {user.name}</h3>
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={() => {}} />
          ))
        ) : (
          <p>Chưa có bài viết nào.</p>
        )}
      </div>
    </div>
  );
}
