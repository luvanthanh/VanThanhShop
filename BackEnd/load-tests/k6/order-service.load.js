import http from 'k6/http';
import { sleep } from 'k6';
import { authHeaders, checkApiResponse, login, serviceUrl, shouldWrite, JSON_HEADERS } from './lib/helpers.js';

export const options = {
  scenarios: {
    order_load: {
      executor: 'ramping-vus',
      stages: [
        { duration: '15s', target: 200 },
        // { duration: '1m', target: 20 },
        // { duration: '30s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<800'],
  },
};

const BASE_URL = serviceUrl('ORDER_BASE_URL', 'http://localhost:8888/api');
const AUTH_BASE_URL = serviceUrl('AUTH_BASE_URL', 'http://localhost:8888/api');
const USER_ID = __ENV.ORDER_USER_ID || 'USR001';
const ORDER_ID = __ENV.ORDER_ID || 'ORD001';

export function setup() {
  const credentials = login(AUTH_BASE_URL, __ENV.K6_USERNAME || 'admin', __ENV.K6_PASSWORD || 'admin');
  return { token: credentials.token };
}

export default function (data) {
  const headers = authHeaders(data.token);

  const allOrders = http.get(`${BASE_URL}/orders`, {
    headers,
    tags: { endpoint: 'get all orders' },
  });
  checkApiResponse(allOrders, 'get all orders');

  const ordersByUser = http.get(`${BASE_URL}/orders/${USER_ID}`, {
    headers,
    tags: { endpoint: 'get orders by user' },
  });
  checkApiResponse(ordersByUser, 'get orders by user');

  if (ORDER_ID) {
    const details = http.get(`${BASE_URL}/orders/${ORDER_ID}/details`, {
      headers,
      tags: { endpoint: 'get order details' },
    });
    checkApiResponse(details, 'get order details');
  }

  if (shouldWrite()) {
    const payload = {
      shopAddress: 'Van Thanh Shop',
      note: 'Created by k6 load test',
      customerName: 'K6 Customer',
      deliveryAddress: 'Load test delivery address',
      customerPhoneNumber: '0900000000',
      paymentMethod: 'COD',
      totalMoney: 1000000,
      order_status: 'PENDING',
      userId: USER_ID,
      cartId: Number(__ENV.CART_ID || 1),
    };
    const res = http.post(`${BASE_URL}/orders`, JSON.stringify(payload), {
      headers: JSON_HEADERS,
      tags: { endpoint: 'create order' },
    });
    checkApiResponse(res, 'create order');
  }

  sleep(1);
}
