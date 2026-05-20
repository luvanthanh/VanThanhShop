import http from 'k6/http';
import { check, fail } from 'k6';

export const JSON_HEADERS = {
  'Content-Type': 'application/json',
};

export function serviceUrl(envName, defaultUrl) {
  return (__ENV[envName] || defaultUrl).replace(/\/$/, '');
}

export function authHeaders(token) {
  return token
    ? { ...JSON_HEADERS, Authorization: `Bearer ${token}` }
    : JSON_HEADERS;
}

export function checkApiResponse(res, name) {
  return check(res, {
    [`${name}: status is 2xx/3xx`]: (r) => r.status >= 200 && r.status < 400,
    [`${name}: no server error`]: (r) => r.status < 500,
  });
}

export function login(baseUrl, username = 'admin', password = 'admin') {
  const res = http.post(
    `${baseUrl}/users/auth/login`,
    JSON.stringify({ userName: username, password }),
    { headers: JSON_HEADERS, tags: { endpoint: 'login' } },
  );

  const ok = check(res, {
    'login success': (r) => r.status === 200 && Boolean(r.json('data.token')),
  });

  if (!ok) {
    fail(`Cannot login to user-service. Status=${res.status}, body=${res.body}`);
  }

  return {
    token: res.json('data.token'),
    userId: res.json('data.userId'),
  };
}

export function shouldWrite() {
  return (__ENV.ENABLE_WRITES || 'false').toLowerCase() === 'true';
}
