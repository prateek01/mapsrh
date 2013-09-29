var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Listing = require('../models/listing').Listing,
	async = require('async');

//var _=require('underscore');

var added=0;

function addItem(item, callback) {
	Listing.findOne({externalid:item.id},function(err,res){
		if(!res){
			new Listing({
				externalid : item.id,title : item.title,
				price : item.price.length > 0 ? parseFloat(item.price.substring(1)) : 0,
				currency : '$',
				l:
				{
					type:'Point',
					coordinates : [parseFloat(item.longitude), parseFloat(item.latitude)]
				}
			}).save(function(err){
				if(!err) ++added;
				callback(err);	
			});
		}
		else callback(null);
	});
}

function addItems(items, callback) {
	added=0;
	async.eachSeries(items, addItem, function(err) {
		callback(err,added);
	});
}

if(process.argv[2]==='run') {
	mongoose.connect('mongodb://localhost:27017/db');
	var file = JSON.parse(require('fs').readFileSync(process.argv[3],'utf-8'));
	addItems(file,function(error, added) {
		console.log('added %d records. error: %s',added, error);
	});
}

exports.addItems = addItems;



