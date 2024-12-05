import crypto from 'crypto';
console.log(
  crypto
    .createHash('sha512')
    .update('asjkdfnv0923r02mlskdf')
    .digest('hex')
    .substring(0, 32)
);
