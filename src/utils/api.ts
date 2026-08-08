// src/utils/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://client-divergent.vercel.app/api';

export const api = {
  get: async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        console.warn(`API call failed: ${endpoint}`, response.status);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.warn(`API call error: ${endpoint}`, error);
      return null;
    }
  },
  post: async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.warn(`API call failed: ${endpoint}`, response.status);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.warn(`API call error: ${endpoint}`, error);
      return null;
    }
  }
};