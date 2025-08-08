import { useState, useEffect } from 'react';
import notificationsApi from '../services/notifications.service';

const useNotificationsService = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationsApi.getByUserId(userId);
      setNotifications(res);
    } catch (err) {
      console.error('❌ Lỗi fetch notifications:', err);
    }
    finally {
      setLoading(false);
    }
  };

  const markAsSeen = async (id) => {
    await notificationsApi.markAsSeen(id);
    fetchNotifications(); // refresh list
  };

  const deleteNotification = async (id) => {
    await notificationsApi.delete(id);
    fetchNotifications(); // refresh list
  };

  const createNotification = async (data) => {
    await notificationsApi.create(data);
    fetchNotifications(); // refresh list
  };



  useEffect(() => {
    if (userId) fetchNotifications();
  }, [userId]);

  return {
    notifications,
    loading,
    markAsSeen,
    deleteNotification,
    createNotification,
  };
};

export default useNotificationsService;
