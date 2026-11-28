import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'https://employ-gotta-thing-prefer.trycloudflare.com/api';

export async function apiRequest(endpoint, { method = 'GET', body } = {}) {
  const token = await AsyncStorage.getItem('@prediallink:token');

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `Erro na requisição (${response.status})`);
  }

  return data;
}