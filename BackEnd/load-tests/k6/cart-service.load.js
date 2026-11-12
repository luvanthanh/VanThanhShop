import http from 'k6/http';
import { fail, sleep } from 'k6';
import { authHeaders, checkApiResponse, login, serviceUrl, shouldWrite } from './lib/helpers.js';

export const options = {
  scenarios: {
    cart_load: {
      executor: 'ramping-vus',
      stages: [
        { duration: '15s', target: 500 }
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

const BASE_URL = serviceUrl('CART_BASE_URL', 'http://localhost:8888/api');
const AUTH_BASE_URL = serviceUrl('AUTH_BASE_URL', 'http://localhost:8888/api');
const PRODUCT_ID = Number(__ENV.CART_PRODUCT_ID || 1);

export function setup() {
  const credentials = login(AUTH_BASE_URL, __ENV.USERNAME || 'admin', __ENV.PASSWORD || 'admin');
  const userId = __ENV.CART_USER_ID || credentials.userId;
  const response = http.post(`${BASE_URL}/carts/user/${userId}`, null, {
    headers: authHeaders(credentials.token),
    tags: { endpoint: 'create cart' },
  });

  if (!checkApiResponse(response, 'create cart')) {
    fail(`Cannot create cart. Status=${response.status}, body=${response.body}`);
  }

  const cartId = response.json('data.cartId');
  if (!cartId) {
    fail(`Create cart response has no cartId. Body=${response.body}`);
  }

  return { ...credentials, userId, cartId };
}

export default function (data) {
  const headers = authHeaders(data.token);

  const cart = http.get(`${BASE_URL}/carts/user/${data.userId}`, {
    headers,
    tags: { endpoint: 'get cart by user' },
  });
  checkApiResponse(cart, 'get cart by user');

  const items = http.get(`${BASE_URL}/carts/${data.cartId}/items`, {
    headers,
    tags: { endpoint: 'get cart items' },
  });
  checkApiResponse(items, 'get cart items');

  if (shouldWrite() && items.status >= 200 && items.status < 400) {
    const existingItems = items.json('data');
    if (Array.isArray(existingItems) && !existingItems.some((item) => item.productId === PRODUCT_ID)) {
      const addItem = http.post(
        `${BASE_URL}/carts/${data.cartId}/items`,
        JSON.stringify({ productId: PRODUCT_ID, quantity: 1 }),
        { headers, tags: { endpoint: 'add cart item' } },
      );

      if (checkApiResponse(addItem, 'add cart item')) {
        const cartItemId = addItem.json('data.cartItemsId');
        if (cartItemId) {
          const updateItem = http.put(
            `${BASE_URL}/carts/items/${cartItemId}`,
            JSON.stringify({ productQuantity: 2 }),
            { headers, tags: { endpoint: 'update cart item' } },
          );
          checkApiResponse(updateItem, 'update cart item');

          const deleteItem = http.del(`${BASE_URL}/carts/items/${cartItemId}`, null, {
            headers,
            tags: { endpoint: 'delete cart item' },
          });
          checkApiResponse(deleteItem, 'delete cart item');
        }
      }
    }
  }

  sleep(1);
}
