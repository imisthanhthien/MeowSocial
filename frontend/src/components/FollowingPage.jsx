import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useFollow from '../hooks/useFollow';
import { Link } from 'react-router-dom';

const FollowingPage = () => {
    const { userId } = useParams();
    const { user } = useAuth();
    const { followingList, loading } = useFollow(userId); // get userId following

    if (loading) return <div className="text-center py-10">Đang tải...</div>;

    return (
        <div className=" p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Đang theo dõi</h2>
            {followingList.length === 0 ? (
                <div className="text-gray-500">Chưa theo dõi ai.</div>
            ) : (
                <ul className="space-y-4">
                    {followingList.map((followedUser) => (
                        <FollowItem
                            key={followedUser.id}
                            currentUserId={user.id}
                            targetUser={followedUser}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

const FollowItem = ({ currentUserId, targetUser }) => {
    const { isFollowing, follow, unfollow, loading } = useFollow(currentUserId, targetUser.id);

    return (
        <li className="flex items-center justify-between p-4 bg-pink-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-200">
            <Link
                to={`/users/${targetUser.id}`}
                className="flex items-center gap-4 hover:bg-pink-200 px-4 py-3 rounded-2xl transition-colors duration-300"
            >
                <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${targetUser.avatarUrl}`}
                    alt={targetUser.name}
                    className="w-14 h-14 rounded-full object-cover border-4 border-pink-300 shadow-sm"
                />
                <span className="font-semibold text-pink-900 text-lg tracking-wide">{targetUser.name}</span>
            </Link>

            {currentUserId !== targetUser.id && (
                <button
                    onClick={isFollowing ? unfollow : follow}
                    disabled={loading}
                    className={`px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 flex items-center gap-2 ${isFollowing
                        ? 'bg-white text-pink-500 border border-pink-300 hover:bg-pink-50'
                        : 'bg-pink-500 text-white hover:bg-pink-600'
                        }`}
                >
                    {isFollowing ? '💗 Đang theo dõi' : '🤍 Theo dõi'}
                </button>
            )}
        </li>
    );
};

export default FollowingPage;
