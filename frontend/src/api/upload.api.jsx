import axiosClient from './axiosClient';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axiosClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });

    return response.data; // { imageUrl, filename, mimetype, size, ... }
  } catch (error) {
    throw error.response?.data || error;
  }
};
