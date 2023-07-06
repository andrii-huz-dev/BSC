import { AxiosInstance } from '../basic';

export const getPosts = async () => {
  const query = `posts?_limit=50`;
  try {
    const res = await AxiosInstance.get(query);
    return res.data;
  } catch (e) {
    console.log('ERROR LOG:: getPosts', e);
  }
};

export const getComments = async () => {
  const query = 'comments?_limit=50';
  try {
    const res = await AxiosInstance.get(query);
    return res.data;
  } catch (e) {
    console.log('ERROR LOG:: getPosts', e);
  }
};
