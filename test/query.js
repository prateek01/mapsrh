var Listing = require('../models/listing').Listing,
	mongoose=require('mongoose'),
	ListingSchema=require('../models/listing').ListingSchema,
	assert=require('assert');


mongoose.connect('mongodb://localhost/db');

var rect = [[-123.72665405273438,37.67729913640427],
 [-121.11190795898436,37.87268533717655 ]];

var req={};
req.query = {"curr":"37.541723,-123.072891,38.007934,-121.765517",
"prev":"37.658551,-122.746047,37.891657,-122.092361","zoom":"11"}
var box=req.query.curr.split(',',4);
var box2=req.query.prev.split(',',4);

var query = Listing.find({loc:{$near:[-122.494600, 37.860100], $maxDistance: 0.1}});
var query2=Listing.find({l:{$geoWithin:{$box:rect}}});


var poly = [ [ [parseFloat(box[1]), parseFloat(box[0])],
				   [parseFloat(box[3]), parseFloat(box[2])],
				   [parseFloat(box2[1]), parseFloat(box2[0])],
				   [parseFloat(box2[3]),parseFloat(box2[2])]]];

var poly2= [ [ [parseFloat(box[1]), parseFloat(box[0])],
				   [parseFloat(box[3]), parseFloat(box[2])]]];


Listing.find({ l :
      { $geoWithin :
           { $geometry :
                      { type : "box" ,
                        coordinates: poly2
                } } } }, function(err, listings) {
                	console.log(err? err:listings.length);
                });
