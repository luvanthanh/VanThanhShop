import { options as orderLoadOptions } from './order-service.load.js';
export { default } from './order-service.load.js';

export const options = {
  ...orderLoadOptions,
  scenarios: {
    order_stress: {
      executor: 'ramping-vus',
      stages: [
         { duration: '30s', target: 50 },
  { duration: '30s', target: 100 },
  { duration: '30s', target: 150 },
  { duration: '30s', target: 250 },
  { duration: '1m', target: 250 },
  { duration: '30s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.10'],
    http_req_duration: ['p(95)<1500'],
  },
};
