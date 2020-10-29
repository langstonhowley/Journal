var express = require('express');
const dbConnection = require('../public/javascripts/db-connection');
var router = express.Router();
var debug = require('debug')('app:journal')

router.get('/', (req, res, next) => {
	dbConnection((db) => {
		if(!db.error){
			try {
				var limit = (req.query.limit && req.query.limit > 0) ? req.query.limit : Number.MAX_VALUE
				var searchText = req.query.search ? req.query.search : ' '
				var startDate = req.query.start ? new Date(req.query.start) : new Date('1970-01-01')
				var endDate = req.query.end ? new Date(req.query.end) : new Date()

				findObject = {}
				findObject.timestamp = { $gt: startDate, $lt: endDate}
				findObject.text = { $regex: searchText}//"/.*{0}.*/".replace("{0}", searchText)}

				debug(findObject)
				db.db.collection('entries').find(findObject,{projection: { _id: 0 }}).toArray((err,result) => {
					if(err) throw err;

					result = result.slice(0, Math.min(limit, result.length))
					debug(result)
					res.json(result)
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
});


module.exports = router;
