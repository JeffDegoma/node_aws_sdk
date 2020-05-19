const AWS = require('aws-sdk')
const credentials = new AWS.SharedIniFileCredentials({profile: ''}) //
AWS.config.credentials = credentials
require('./s3/index.js')


