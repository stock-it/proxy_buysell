const http = require('k6/http');
const { check } = require('k6');

export const options = {
  vus: 100,
  duration: "3m"
};

export default function() {
  const res = http.get("http://127.0.0.1:3000/api/accounts/2QW30682");
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
};

