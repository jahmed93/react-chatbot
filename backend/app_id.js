const crypto = require('crypto');

const app_id = BigInt(parseInt(crypto.randomBytes(20).toString('hex'), 16)).toString(); // random value.

console.log(app_id);
//913650112359261869052632131542719572708335550464
