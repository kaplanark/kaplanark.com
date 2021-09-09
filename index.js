const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const parser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./models/user")
const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();


//routes import(!usign)
const page = require("./routes/page");
const admin = require("./routes/admin");
const blog= require("./routes/blog");

//mongose config
mongoose.connect(process.env.DATABASE_URL,{
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
},function(err){
  if(err){
    return console.log(err);
  }else{
    console.log("Mongoose connetcion");
  }
});

//app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use('/styles',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/styles',express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use('/styles',express.static(__dirname + '/styles'));
app.use('/scripts',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/scripts',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/scripts',express.static(__dirname + '/scripts'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

//passport config
app.use(
  session({
    cookie: { maxAge: 60000 * 60 }, //one hour
    secret: "tank destroyer",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.errors = req.flash("error");
  res.locals.message = req.flash("message");
  res.locals.info = req.flash("info");
  next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//share current user info within all routes
app.use((req,res,next)=>{
  res.locals.currentUser=req.user;
  next();
});

//routes using
app.use(page);
app.use(admin);
app.use(blog)

//start server
app.listen(PORT,(err)=>{
  if (err) {
    console.log(err);
  }else{
    console.log(`App started port: ${PORT}`);
  }
});
