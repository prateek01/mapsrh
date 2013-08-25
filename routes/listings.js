var Listing = require('../models/listing').Listing;
var DataLoader = require('../test/dataloader'),
	fs=require('fs');

exports.list = function(req, res){
  res.send("respond with a resource");
};

var logs=[];
var listingsf = function(req,res) {
	var box=[];
	if(req.query.curr && (box=req.query.curr.split(',',4)).length==4) {
		var rect=[[parseFloat(box[1]), parseFloat(box[0])],[parseFloat(box[3]),parseFloat(box[2])]];
		Listing.find({l:{$geoWithin:{$box:rect}}},function(err,listings){ 
			logs.push(('rect:'+rect)+ ' ' + (err?err:'read '+listings.length));
			console.log(err?err:'read '+listings.length);
			res.send(listings);
		});
	}
	else res.send(400,'must limit');
};

exports.logs=function(req,res) {
	res.send(logs);
};

exports.listings = listingsf;

exports.polylistings = function(req,res) {
	if((req.query.prev || 'undefined')==='undefined') {
		listingsf(req,res);
		return;
	}

	console.log(JSON.stringify(req.query));

	var box=req.query.curr.split(',',4);
	//var outer=[[parseFloat(box[1]), parseFloat(box[0])],[parseFloat(box[3]),parseFloat(box[2])]];
	var box2=req.query.prev.split(',',4);
	//var box2= "37.658551,-122.746047,37.891657,-122.092361".split(',');
	//var inner=[[parseFloat(box[1]), parseFloat(box[0])],[parseFloat(box[3]),parseFloat(box[2])]];
	var poly = [ [ [parseFloat(box[1]), parseFloat(box[0])],
				   [parseFloat(box[3]), parseFloat(box[2])],
				   [parseFloat(box2[1]), parseFloat(box2[0])],
				   [parseFloat(box2[3]),parseFloat(box2[2])]]];

	console.log(poly);
	Listing.find({ l :
                  { $geoWithin :
                    { $geometry :
                      { type : "Polygon" ,
                        coordinates: [[ [parseFloat(box[1]), parseFloat(box[0])], [parseFloat(box[3]), parseFloat(box[2])] ]]
                } } } }, function(err, listings) {
                	console.log(err? err:listings.length);
                	res.send(listings);
                });

};

exports.addListings = function(req,res) {
	var file = JSON.parse(require('fs').readFileSync('test/data.json','utf-8'));
	DataLoader.loadFromFile(file);
	res.send('added %s items',DataLoader.added);
};

exports.deleteAllListings=function(req,res){
	console.log(req.query);
	if(req.query.key==='a9c041f3-45fd-486c-b928-d44b1be7448e') {
		Listing.count({}, function(err,count) {
			Listing.remove({},function(err2,res2){
				res.send('removed listings. count: '+count);
			});	
		});
	}
	else res.send(400,'bad request');
};

exports.uploadListings=function(req,res) {
	if(req.files.filedata) {
		try{
			var data = JSON.parse(fs.readFileSync(req.files.filedata.path));
			DataLoader.addItems(data,function(err,count){
				res.send(require('util').format('input data:%d , added %d, error:%s',data.length,count,err));
			});
		}catch(e) {
			res.send(404,e.message);
		}
	} 
	else res.send('nothing to upload');
};

exports.getAll=function(req,res){
	Listing.find(function(err,listings){
			console.log(err);
			res.send(listings);
		});
};