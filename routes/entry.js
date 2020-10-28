var express = require('express');
var router = express.Router();
var fs = require('fs');
var debug = require('debug')('app:entry')
const dbConnection = require('../public/javascripts/db-connection');


router.post('/file', function(req, res, next) {
	fs.readFile(req.body.file.path, {encoding:'utf-8'}, (err,data) => {
		if(err){
			debug(err)
			next(err)
		}
		else{
			dbConnection((db) => {
				if(!db.error){
					try {
						const journalEntries = db.db.collection('entries')
		
						journalEntries.insertOne({"text": data.trim(), "timestamp": new Date()}).then((result) => {
							debug(result)
							res.send("Your file 📑  was sent!\n" + JSON.stringify(result.ops));
						}).catch((error) => {
							throw new Error(error)
						})
					} catch (error) {
						debug(error)
						next(error)
					}
				}
				else{
					debug(db.error)
					next(error)
				}
			})
		}
	})
}); 

router.post('/text', function(req, res, next) {
	try {
		var text = req.body.text

		dbConnection((db) => {
			if(!db.error){
				const journalEntries = db.db.collection('entries')
	
				journalEntries.insertOne({"text": text, "timestamp": new Date()}).then((result) => {
					debug(result)
					res.send("Your text 🖊  was sent!\n" + JSON.stringify(result.ops));
				}).catch((error) => {
					throw new Error(error)
				})
			}
			else{
				throw new Error(db.error)
			}
		})
	} catch (error) {
		debug(error)
		next(error)
	}	
}); 

module.exports = router;
