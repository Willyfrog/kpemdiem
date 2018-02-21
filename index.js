var jwkToPem = require('jwk-to-pem')
var jwt = require('jsonwebtoken')


var jwk = {
  kid: '',
  kty: 'RSA',
  alg: 'RS256',
  use: 'sig',
  n: '',
  e: ''}

var pem = jwkToPem(jwk)
process.stdout.write("PEM: " + pem)
