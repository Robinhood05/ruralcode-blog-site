import axios from 'axios';
import type { Blog, Video, Category } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authHeaders = () => {
  const token = localStorage.getItem('rc_admin_token');
  return token ? { Authorization: `Basic ${token}` } : {};
};

// Categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
};

// Blogs
export const getBlogs = async (category?: string, popular?: boolean, limit?: number): Promise<Blog[]> => {
  const params: any = {};
  if (category) params.category = category;
  if (popular) params.popular = 'true';
  if (limit) params.limit = limit;
  const response = await api.get('/blogs', { params });
  return response.data;
};

export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  const response = await api.get(`/blogs/${slug}`);
  return response.data;
};

export const createBlog = async (blogData: Partial<Blog>): Promise<Blog> => {
  const response = await api.post('/blogs', blogData, { headers: authHeaders() });
  return response.data;
};

export const updateBlog = async (id: number, blogData: Partial<Blog>): Promise<void> => {
  await api.put(`/blogs/${id}`, blogData, { headers: authHeaders() });
};

export const deleteBlog = async (id: number): Promise<void> => {
  await api.delete(`/blogs/${id}`, { headers: authHeaders() });
};

// Videos
export const getVideos = async (category?: string, popular?: boolean, limit?: number): Promise<Video[]> => {
  const params: any = {};
  if (category) params.category = category;
  if (popular) params.popular = 'true';
  if (limit) params.limit = limit;
  const response = await api.get('/videos', { params });
  return response.data;
};

export const getVideoById = async (id: number): Promise<Video> => {
  const response = await api.get(`/videos/${id}`);
  return response.data;
};

export const createVideo = async (videoData: Partial<Video>): Promise<Video> => {
  const response = await api.post('/videos', videoData, { headers: authHeaders() });
  return response.data;
};

export const updateVideo = async (id: number, videoData: Partial<Video>): Promise<void> => {
  await api.put(`/videos/${id}`, videoData, { headers: authHeaders() });
};

export const deleteVideo = async (id: number): Promise<void> => {
  await api.delete(`/videos/${id}`, { headers: authHeaders() });
};

