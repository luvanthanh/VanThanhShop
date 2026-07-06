import http from 'k6/http';
import { check, fail } from 'k6';

export const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Accept': 'application/json',
};

export function serviceUrl(envName, defaultUrl) {
  return (__ENV[envName] || defaultUrl).replace(/\/$/, '');
}

export function authHeaders(token) {
  return token
    ? {
        ...JSON_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    : JSON_HEADERS;
}

export function checkApiResponse(res, name) {
  return check(res, {
    [`${name}: status < 500`]: (r) => r.status < 500,
    [`${name}: status OK`]: (r) => r.status >= 200 && r.status < 400,
  });
}

export function login(baseUrl, username = 'admin', password = 'admin') {
  const payload = JSON.stringify({
    userName: username,
    password: password,
  });

  const res = http.post(
    `${baseUrl}/users/auth/login`,
    payload,
    {
      headers: JSON_HEADERS,
      tags: { endpoint: 'login' },
    }
  );

  const isOk = check(res, {
    'login status is 200': (r) => r.status === 200,
    'login has token': (r) => {
      try {
        return !!r.json('data.token');
      } catch (e) {
        return false;
      }
    },
  });

  if (!isOk) {
    console.error('LOGIN FAILED RESPONSE:', res.status, res.body);
    fail(`Cannot login. Status=${res.status}, body=${res.body}`);
  }

  const body = res.json('data');

  return {
    token: body.token,
    userId: body.userId,
  };
}

export function shouldWrite() {
  return (__ENV.ENABLE_WRITES || 'false').toLowerCase() === 'true';
}