import http from 'k6/http';
import { sleep } from 'k6';
import { checkApiResponse, serviceUrl, shouldWrite, JSON_HEADERS } from './lib/helpers.js';

export const options = {
  scenarios: {
    product_load: {
      executor: 'ramping-vus',
      stages: [
          { duration: '15s', target: 7000 },
          // { duration: '10s', target: 1500 },
            // { duration: '10s', target: 1500 },
            // { duration: '10s', target: 2500 },
            // { duration: '5s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<800'],
  },
};

const BASE_URL = serviceUrl('PRODUCT_BASE_URL', 'http://localhost:8888/api');
const PRODUCT_ID = __ENV.PRODUCT_ID || '1';

export default function () {
  const endpoints = [
  ['/products', 'get all products'],
  [`/products/getProductById/${PRODUCT_ID}`, 'get product by id'],
  ['/products/getProductByName/iPhone', 'get by name'],
  ['/products/getAndSortByPrice/increase', 'sort price increase'],
  ['/products/getAndSortByPrice/decrease', 'sort price decrease'],
  ['/products/getProductByBrand/iphone', 'get by brand'],
  ['/products/getProductByRam/8', 'get by ram'],
  ['/products/getProductByRom/128', 'get by rom'],
  ['/products/getProductByColor/Black', 'get by color'],
  ['/products/getProductByPrice?min=0&max=100000000', 'filter by price'],
  ['/products/getProductByScreenSize?min=5&max=7', 'filter screen size'],
];

  for (const [path, name] of endpoints) {
    const res = http.get(`${BASE_URL}${path}`, { tags: { endpoint: name } });
    checkApiResponse(res, name);
  }

  if (shouldWrite()) {
    const suffix = `${__VU}-${__ITER}-${Date.now()}`;
    const payload = {
      productBrand: 'LoadTest',
      productName: `Load Test Phone ${suffix}`,
      productScreenSize: 6.5,
      productColor: 'Black',
      productRam: 8,
      productRom: 128,
      productDescription: 'Created by k6 load test',
      productReleaseDate: '2026-01-01T00:00:00.000Z',
      productStockQuantity: 10,
      productWarranty: 12,
      productPrice: 10000000,
      productFormattedPrice: '10,000,000 VND',
      productImage: '',
      productImage1: '',
      productImage2: '',
      productImage3: '',
    };
    const res = http.post(`${BASE_URL}/products`, JSON.stringify(payload), {
      headers: JSON_HEADERS,
      tags: { endpoint: 'create product' },
    });
    checkApiResponse(res, 'create product');
  }

  sleep(1);
}
