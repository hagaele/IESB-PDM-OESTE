const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request(path, options = {}) {
  if (!BASE_URL) {
    throw new Error('EXPO_PUBLIC_API_URL não está definida. Copie o .env.example para .env e reinicie o Expo.');
  }

  const response = await fetch(`${BASE_URL}/${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  return response.json();
}

const send = (method, body) => ({ method, body: JSON.stringify(body) });

export const api = {
  list: (resource) => request(resource),
  create: (resource, body) => request(resource, send('POST', body)),
  update: (resource, id, body) => request(`${resource}/${id}`, send('PUT', body)),
  remove: (resource, id) => request(`${resource}/${id}`, { method: 'DELETE' }),
};
