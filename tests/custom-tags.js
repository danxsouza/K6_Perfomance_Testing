import http from 'k6/http';
import {Counter} from 'k6/metrics';
import {check, sleep} from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{page:order}': ['p(95)<500'],
        http_errors: ['count==0'],
        'http_errors{page:order}': ['count==0'],
        checks: ['rate>0.99'],
        'checks{page:order}': ['rate>0.99'],
    }
}

let httpErros = new Counter('http_errors');

export default function () {
    let res = http.get('https://run.mocky.io/v3/4724f4f4-6023-4085-8ea5-bc02e23b858b');

    if (res.error) {
        httpErros.add(1);
    }

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    res = http.get(
        'https://run.mocky.io/v3/57bea8f3-5df7-4453-aecb-938d2f390c69?mocky-delay=2000ms',
        {
            tags: {
                page: 'order'
            }
        }
    );

    if (res.error) {
        httpErros.add(1, {page: 'order'});
    }

    check(res, {
        'status is 201': (r) => r.status === 201,
    }, {page: 'order'});

    sleep(1);

}
