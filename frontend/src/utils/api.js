const API_BASE = 'http://localhost:5000/api';

export const apiFetch = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const config = {
    ...options,
    headers: { ...headers, ...options.headers },
  };

  const response = await fetch(`${API_BASE}/${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  // Check if there's a response body to parse
  const contentLength = response.headers.get('Content-Length');
  if (response.status === 204 || contentLength === '0') {
    return null;
  }

  return await response.json();
};
