import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import useNotificationsService from '../hooks/useNotificationsService';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const MAX_VISIBLE = 5;

const NotificationsBell = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const {
    notifications = [],
    loading,
    markAsSeen,
  } = useNotificationsService(userId);

  const unseenCount = notifications.filter((n) => !n.seen).length;

  const handleClickNotification = async (notification) => {
    try {
      await markAsSeen(notification.id);
      window.location.href = `/posts/${notification.sourceId}`;
    } catch (err) {
      console.error('❌ Lỗi khi xử lý thông báo:', err);
    }
  };

  const visibleNotifications = expanded
    ? notifications
    : notifications.slice(0, MAX_VISIBLE);

  return (
    <div className="relative">
      {/* Bell icon */}
      <button
        onClick={() => {
          setOpen((prev) => !prev);
          setExpanded(false);
        }}
        className="relative text-white hover:text-yellow-400 transition duration-300"
        title="Thông báo dễ thương nè"
      >
        <FaBell className="w-6 h-6 md:w-7 md:h-7 " />
        {unseenCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-400 text-white text-[10px] md:text-xs rounded-full px-1.5 py-0.5 shadow-md ">
            {unseenCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-pink-50 border border-pink-200 shadow-2xl rounded-2xl z-50 max-h-[420px] overflow-y-auto ring-1 ring-pink-100">
          {/* Header */}
          <div className="p-4 text-center text-lg font-bold text-pink-600 bg-pink-100 border-b border-pink-200 shadow-inner rounded-t-2xl tracking-wide select-none">
            🎀 Thông báo dễ thương 🎀
          </div>

          {/* Nội dung */}
          {loading ? (
            <div className="p-4 text-sm text-pink-500 italic">⏳ Đang tải nè...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-400 text-center">📭 Không có thông báo nào hết~</div>
          ) : (
            <>
              {visibleNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleClickNotification(n)}
                  className={`flex items-start gap-3 px-4 py-3 cursor-pointer rounded-xl mx-2 my-1 transition-all duration-200 ${!n.seen
                      ? 'bg-pink-100 hover:bg-pink-200 font-semibold'
                      : 'hover:bg-white'
                    }`}
                >
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${n.actor?.avatarUrl}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className="flex-1 text-sm text-gray-800">
                    <p className="leading-snug">
                      <span className="font-bold text-pink-600">{n.actor?.name}</span>{' '}
                      {n.type === 'like'
                        ? 'đã thả tim bài viết của bạn 💖'
                        : 'đã để lại bình luận đáng yêu ✨'}
                    </p>
                    <p className="text-xs text-pink-500 mt-1">{dayjs(n.createdAt).fromNow()}</p>
                  </div>
                </div>
              ))}

              {/* Xem thêm */}
              {notifications.length > MAX_VISIBLE && (
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="w-full text-center py-2 text-sm text-pink-600 hover:underline bg-pink-100 font-medium"
                >
                  {expanded
                    ? '🔽 Thu gọn'
                    : `🔼 Xem thêm (${notifications.length - MAX_VISIBLE})`}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>

  );
};

export default NotificationsBell;
