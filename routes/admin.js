const express = require("express");
const User = require("../models/user");
const Blog = require("../models/blog");
const passport = require("passport");
const router = express.Router();

router.get("/admin", access, (req, res) => {
  res.render("admin/admin"); //, { adminActions: adminActions }
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

//files router
router.get("/admin/files", access, (req, res) => {
  req.flash("message", "Not possible yet");
  res.redirect('/admin');
});

//notes router
router.get("/admin/notes", access, (req, res) => {
  req.flash("message", "Not possible yet");
  res.redirect('/admin');
});

//notification router
router.get("/admin/notification", access, (req, res) => {
  req.flash("message", "Not possible yet");
  res.redirect('/admin');
});

//users router
router.get("/admin/users", access, (req, res) => {
  req.flash("message", "Not possible yet");
  res.redirect('/admin');
});

//settings router
router.get("/admin/settings", access, (req, res) => {
  req.flash("message", "Not possible yet");
  res.redirect('/admin');
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
