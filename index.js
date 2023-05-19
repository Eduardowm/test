const express = require('express')
const app = express()
const port = 3000

const RATE_LIMIT = 5;

const CALLS = [];

function rateLimitCheck(req) {
    if (!CALLS[req.ip]) {
        CALLS[req.ip] = 0;
    }

    CALLS[req.ip]++;

    return CALLS[req.ip] >= RATE_LIMIT;
}

app.get('/', (req, res) => {
    if (rateLimitCheck(req)) {
        console.log('Limit reached!');
        res.status(429);
    } else {
        res.send('Hello World!')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})