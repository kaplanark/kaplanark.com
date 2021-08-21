const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const expressSession = require("express-session");
const User = require("./models/userModels")
const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();


//routes import(oluşturduğumuz routes modüllerini import etme  !!!usign etmeyi unutma)
const indexRoutes = require("./routes/indexRoutes");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongose config
//const uri = 'mongodb://localhost/blog-app';
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true,useUnifiedTopology: true});

//app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//passport config
app.use(
  require("express-session")({
    secret: "güvenlik cümlemiz",
    resave: false,
    saveUninitialized: false,
  })
);
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
app.use(indexRoutes);
app.use(adminRoutes);
app.use(blogRoutes)

//start server
app.listen(PORT,(err)=>{
  if (err) {
    console.log(err);
  }
  console.log(`App started port: ${PORT}`);
});
