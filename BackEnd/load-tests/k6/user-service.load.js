import http from 'k6/http';
import { sleep } from 'k6';
import { authHeaders, checkApiResponse, login, serviceUrl, shouldWrite, JSON_HEADERS } from './lib/helpers.js';

export const options = {
  scenarios: {
    user_load: {
      executor: 'ramping-vus',
      stages: [
        { duration: '30s', target: 20 },
        { duration: '1m', target: 20 },
        { duration: '30s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<800'],
  },
};

const BASE_URL = serviceUrl('USER_BASE_URL', 'http://localhost:8888/api');

export function setup() {
  return login(BASE_URL, __ENV.USERNAME || 'admin', __ENV.PASSWORD || 'admin');
}

export default function (data) {
  const headers = authHeaders(data.token);

  const myInfo = http.get(`${BASE_URL}/users/myInfo`, {
    headers,
    tags: { endpoint: 'my info' },
  });
  checkApiResponse(myInfo, 'my info');

  const getById = http.get(`${BASE_URL}/users/${data.userId}`, {
    headers,
    tags: { endpoint: 'get user by id' },
  });
  checkApiResponse(getById, 'get user by id');

  const introspect = http.post(
    `${BASE_URL}/users/auth/introspect`,
    JSON.stringify({ token: data.token }),
    { headers: JSON_HEADERS, tags: { endpoint: 'introspect' } },
  );
  checkApiResponse(introspect, 'introspect');

  if (shouldWrite()) {
    const suffix = `${__VU}${__ITER}${Date.now()}`;
    const payload = {
      userName: `k6_user_${suffix}`,
      userPassword: 'Password@123',
      userFirstName: 'K6',
      userLastName: 'User',
      userAddress: 'Load test address',
      userEmail: `k6_user_${suffix}@example.com`,
      userPhoneNumber: `090${String(suffix).slice(-7).padStart(7, '0')}`,
    };
    const res = http.post(`${BASE_URL}/users`, JSON.stringify(payload), {
      headers: JSON_HEADERS,
      tags: { endpoint: 'create user' },
    });
    checkApiResponse(res, 'create user');
  }

  sleep(1);
}
