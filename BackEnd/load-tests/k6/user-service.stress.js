import { options as userLoadOptions } from './user-service.load.js';
export { setup, default } from './user-service.load.js';

export const options = {
  ...userLoadOptions,
  scenarios: {
    user_stress: {
      executor: 'ramping-vus',
      stages: [
        { duration: '1m', target: 50 },
        { duration: '2m', target: 100 },
        { duration: '2m', target: 150 },
        { duration: '1m', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.10'],
    http_req_duration: ['p(95)<1500'],
  },
};
