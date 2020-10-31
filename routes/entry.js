var express = require('express');
var router = express.Router();
var fs = require('fs');
const { ObjectID } = require('mongodb');
var debug = require('debug')('app:entry')
const dbConnection = require('../public/javascripts/db-connection');


router.get('/', (req, res, next) => {
	var id = req.query.id ? req.query.id : null
	debug('Query id: ' + id)

	if(id){
		dbConnection((db) => {
			if(!db.error){
				try {
					db.db.collection('entries').find({_id: ObjectID(id)}).toArray((err,result) => {
						if(err) throw err;

						debug(result)
						res.json(result)
					});

					//debug(entry)
					//res.send("Gotcha")
				} catch (error) {
					debug(error)
					next(error)
				}
			}
			else{
				debug(db.error)
				next(db.error)
			}
		})
	}
	else{
		var error = new Error('Requests for an entry must follow this format: http://localhost:3000/entry?{entry_id}')
		next(error)
	}

})

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
					next(db.error)
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
