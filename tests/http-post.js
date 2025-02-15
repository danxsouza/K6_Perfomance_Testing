import http from 'k6/http';
import { check }  from 'k6';

export default function () {

    const credentials = {
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now(),
    }

    const body = JSON.stringify({
        username: 'test_' + Date.now(),
        password: 'test_9900239020990320'
    });

   http.post(
       'https://test-api.k6.io/user/register/',
       JSON.stringify(credentials),
       {
           headers: {
               'Content-Type': 'application/json',
           },
       }
   );
   
   let res = http.post(
       'https://test-api.k6.io/auth/token/login/',
       JSON.stringify({
           username: credentials.username,
           password: credentials.password
       }),
       {
           headers: {
               'Content-Type': 'application/json',
           },
       }
   )

    const accessToken = res.json().access;
    console.log(accessToken);
}
