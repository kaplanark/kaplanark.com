const express = require("express");
const User = require("../models/userModels");
const Blog = require("../models/blogModels");
const passport = require("passport");
const router = express.Router();

let adminActions = [
  {
    actionId: 1,
    actionName: "changeHomeImage",
    displayName: "Change home image",
  },
  {
    actionId: 2,
    actionName: "changeHomeText",
    displayName: "Change home text",
  },
  {
    actionId: 3,
    actionName: "changeAboutImage",
    displayName: "Change about image",
  },
  {
    actionId: 4,
    actionName: "changeAbouText",
    displayName: "Change about text",
  },
  {
    actionId: 5,
    actionName: "addNewBlog",
    displayName: "Add new blog",
  },
  {
    actionId: 5,
    actionName: "listAllBlog",
    displayName: "List all blog",
  },
];
router.get("/admin", access, (req, res) => {
  res.render("admin/admin", { adminActions: adminActions });
});

//blog all send admin all page
router.get('/admin/all',access, (req,res)=>{
  Blog.find({},(err,found)=>{
      if(err){
          console.log(err);
      }else{
          res.render('blog/all',{found:found});
      }
  });
});
//signin page router
router.get("/signin", (req, res) => {
  res.render("admin/signin");
});
router.post("/signin",passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/signin",
  }),
  (req, res) => {}
);

//signup page router
router.get("/signup", access, (req, res) => {
  res.render("admin/signup");
});
router.post("/signup", access, (req, res) => {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/signup");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/");
    });
  });
});

//signout router
router.get("/signout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//middleware
function access(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/signin");
  }
}
module.exports = router;
