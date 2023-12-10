# community-portal-backend

## Generating a secret key

Run the following using NodeJS:
```js
const crypto = require('crypto')
console.log(crypto.randomBytes(64).toString('base64').slice(0, -2))
```
