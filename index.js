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

function log (key, value) {
  process.stdout.write(key + ': ' + value + '\n')
}

function fetch (keycloakUrl) {
  request(keycloakUrl, function (error, response, body) {
    // log('ERROR', error)
    // log('CODE', response.statusCode)
    if (!error && response.statusCode === 200) {
      var keys = JSON.parse(body).keys
      // log('KEY', keys[0])
      if (keys !== undefined) {
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

if (host === undefined || realm === undefined) {
  log('ERROR', 'No host or realm defined')
} else {
  var url = host + '/auth/realms/' + realm + '/protocol/openid-connect/certs'
  fetch(url)
}
