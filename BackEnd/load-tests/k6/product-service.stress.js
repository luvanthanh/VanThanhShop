import { options as productLoadOptions } from './product-service.load.js';
export { default } from './product-service.load.js';

export const options = {
  ...productLoadOptions,
  scenarios: {
    product_stress: {
      executor: 'ramping-vus',
      stages: [
          { duration: '10s', target: 50 },
          { duration: '10s', target: 100 },
          { duration: '20s', target: 150 },
          { duration: '20s', target: 250 },
          { duration: '10s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.10'],
    http_req_duration: ['p(95)<1500'],
  },
};
