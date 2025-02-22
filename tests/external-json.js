import http from 'k6/http';
import {check} from 'k6';
import {SharedArray} from 'k6/data';
import {randomItem} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const usersCredentials = new SharedArray('users with credentials', function () {
    return JSON.parse(open('./users.json')).users;
});

export default function () {

    const randomCredentials = randomItem(usersCredentials);

    let res = http.post('https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: randomCredentials.username,
                password: randomCredentials.password
            },
        ),
        {
            headers: {
                'Content-Type': 'application/json',
            }
        },
    );

    check(res, {
        'status is 201': (r) => r.status === 200,
        'has access token': (r) => r.json().access !== undefined
    });
    const accessToken = res.json().access;

}
