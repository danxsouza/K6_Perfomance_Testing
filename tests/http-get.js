import http from 'k6/http';
import { check }  from 'k6';


export default function() {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = res.json();
    console.log(crocodiles[0].id)

    const crocodileID = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;
    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileID}/`);

    console.log(res.headers);
    console.log(res.headers['Content-Type']);

    check(res, {
        'Status is 200': (r) => r.status === 200,
        'Crocodile is Sobek': (r) => r.json().name === crocodileName,
    })

}





