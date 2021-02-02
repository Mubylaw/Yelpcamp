var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	flash = require("connect-flash"),
	seedDB = require("./seeds.js");	

var CampgroundRoutes = require("./routes/campground"),
	CommentsRoutes = require("./routes/comments"),
	indexRoutes = require("./routes/index");

// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser : true });
mongoose.set("useFindAndModify", false);

app.use(flash());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
	secret: "Allahu Akbar",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/campgrounds", CampgroundRoutes);
app.use("/campgrounds/:id/comments", CommentsRoutes);
app.use(indexRoutes);



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(10624, function () {
	console.log("the yelp camp server has started!");
});