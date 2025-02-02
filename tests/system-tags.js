import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}' : ['p(95)<1000'],
        'http_req_duration{status:201}' : ['p(95)<1000'],
    }
};

export default function () {
    http.get('https://run.mocky.io/v3/4724f4f4-6023-4085-8ea5-bc02e23b858b');
    http.get('https://run.mocky.io/v3/57bea8f3-5df7-4453-aecb-938d2f390c69?mocky-delay=2000ms')
}
