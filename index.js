#!/usr/bin/env node
var program = require('commander')
var jwkToPem = require('jwk-to-pem')
var jwt = require('jsonwebtoken')
var request = require('request')
program
  .option('-h, --host <host>', 'host to point to')
  .option('-r, --realm <realm>', 'keycloak realm')
  .parse(process.argv)

var host = program.host
var realm = program.realm

var url = host + '/auth/realms/' + realm + '/protocol/openid-connect/certs'

function log (key, value) {
  process.stdout.write(key + ': ' + value + '\n')
}

function fetch (keycloakUrl) {
  request(keycloakUrl, function (error, response, body) {
    log('ERROR', error)
    log('CODE', response.statusCode)
    if (!error && response.statusCode === 200) {
      var jsonbody = JSON.parse(body)
      var keys = jsonbody.keys
      log('KEYS', keys)
      if (keys!==undefined) {
        var jwk = keys[0]
        var pem = jwkToPem(jwk)
        log('PEM', pem)
      } else {
        log('ERROR', error)
      }
    }
    return {body: body, error: error}
  })
}
var result = fetch(url)
