const mongo = require('mongodb').MongoClient
const debug = require('debug')('app:db-connection')
require('dotenv').config()

module.exports = function (_callback) {
    mongo.connect(process.env.DB_URL, {useUnifiedTopology: true},(err, client) => {
        if(err) return debug('Error on connection to DB:\n' + err)
        debug('Connected to db!')
        
        _callback(client.db())
    })   
}
