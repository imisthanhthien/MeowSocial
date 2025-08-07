import authApi from '../api/auth.api';

const authService = {
  register: async (name, email, password) => {
    const response = await authApi.register({ name, email, password });
    return response.data;
  },

  login: async (email, password) => {
    const response = await authApi.login({ email, password });
    console.log('📦 Dữ liệu phản hồi login:', response);
    const { access_token, user } = response.data;
    // Lưu token vào localStorage
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    return { access_token, user };
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  getToken: () => {
    return localStorage.getItem('access_token');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
