const jwt = require('jsonwebtoken');

const secretKey = 'abcd';

const payload = {
    role: 'preview',
    app: 'contentful',
};

const token = jwt.sign(payload, secretKey);

console.log('Generated JWT:', token);
