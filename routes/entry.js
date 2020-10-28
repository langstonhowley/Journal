var express = require('express');
var router = express.Router();
var fs = require('fs');
var debug = require('debug')('app:entry')
const dbConnection = require('../public/javascripts/db-connection');


/* GET users listing. */
router.post('/file', function(req, res, next) {
	fileText = fs.readFileSync(req.body.file.path).toString().trim() 

	dbConnection((db) => {
		const journalEntries = db.collection('entries')

		journalEntries.insertOne({"text": fileText}).then((result) => {
			debug(result)
			res.send("Your file💾 was sent!");
		}).catch((error) => {
			debug(error)
			throw new Error('File not accepted into db')
		})
	})
}); 

router.post('/text', function(req, res, next) {
	text = req.body.text

	dbConnection((db) => {
		const journalEntries = db.collection('entries')

		journalEntries.insertOne({"text": text}).then((result) => {
			debug(result)
			res.send("Your file💾 was sent!");
		}).catch((error) => {
			debug(error)
			throw new Error('File not accepted into db')
		});
	});
}); 

module.exports = router;
