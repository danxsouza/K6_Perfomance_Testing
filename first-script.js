import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '10s',
}

export default function () {
    let url = 'https://httpbin.test.k6.io/post';
    let response = http.post(url, 'Hello world!');
    sleep(1);
}
