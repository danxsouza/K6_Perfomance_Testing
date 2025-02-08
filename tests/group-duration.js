import http from 'k6/http';
import {sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<500'],
        'group_duration{group:::Main Page}' : ['p(95)<2000'],
        'group_duration{group:::Main Page::Assets}' : ['p(95)<2000'],
    }
}

export default function () {
    group('Main Page', function () {
        let res = http.get('https://test.k6.io/');
        check(res, {
            'status is 200': (r) => r.status === 200,
        });

        group('Assets', function (){
            http.get('https://test.k6.io/static/css/site.css');
            http.get('https://test.k6.io/static/js/prisms.js');
        });
    });

    group('New Page', function () {
        http.get('https://test.k6.io/news.php');

    });
    sleep(1);
}
