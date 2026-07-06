import { options as productLoadOptions } from './product-service.load.js';
export { default } from './product-service.load.js';

export const options = {
  ...productLoadOptions,
  scenarios: {
    product_stress: {
      executor: 'ramping-vus',
          stages: [
          { duration: '20s', target: 2500 },
          { duration: '20s', target: 2750 },
          { duration: '20s', target: 3000 },
          { duration: '20s', target: 3250 },
          { duration: '20s', target: 3500 },
          { duration: '20s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<800'],
  },
};
