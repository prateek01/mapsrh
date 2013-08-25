var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ListingSchema = new Schema({
		externalid: {
			type: String,
			index: true
		},
		title : String,
		price : Number,
		bedrooms : String,
		currency : String,
		l : {
			type: {type:String},
			coordinates: []
		}
});

//ListingSchema.index({l.coordinates:'2d'});

var Listing = mongoose.model('Listing', ListingSchema);

module.exports.Listing = Listing;
module.exports.ListingSchema = ListingSchema;