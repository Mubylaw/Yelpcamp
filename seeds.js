var mongoose = require("mongoose");
var Campground = require ("./models/campground.js");
var Comment = require ("./models/comment.js");

var data = [
	{
		name: "the no picture capground",
		image: "https://www.michigan.org/sites/default/files/styles/15_6_desktop/public/camping-hero_0_0.jpg?itok=mgGs0-vw&timestamp=1520373602",
		description: "this campground has no picture, what were you expecting?"
	},
	{
		name: "the no picture capground",
		image: "https://www.michigan.org/sites/default/files/styles/15_6_desktop/public/camping-hero_0_0.jpg?itok=mgGs0-vw&timestamp=1520373602",
		description: "this campground has no picture, what were you expecting?"
	},
	{
		name: "the no picture capground",
		image: "https://www.michigan.org/sites/default/files/styles/15_6_desktop/public/camping-hero_0_0.jpg?itok=mgGs0-vw&timestamp=1520373602",
		description: "this campground has no picture, what were you expecting?"
	}
]


function seedDB() {
	Campground.deleteMany({}, function (err) {
		if (err) {
			console.log(err)
		}
		console.log("removed all campgrounds!")
		data.forEach(function (seed) {
			Campground.create(seed, function (err, newCamp) {
				if (err) {
					console.log(err)
				} else {
					console.log("added a campground")
					Comment.create({
						comment: "I really hope this works",
						author: "bob"
					}, function (err, comment) {
						if (err) {
							console.log(err)
						} else {
							newCamp.comments.push(comment);
							newCamp.save();
							console.log("added a new comment to the camp")
						}
					})
				}
			})
		})
	});
}

module.exports = seedDB;