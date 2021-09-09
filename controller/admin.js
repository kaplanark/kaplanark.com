const User = require("../models/user");
//rendering
const renderPage = async (req, res, next) => {
  res.render("admin/admin");
};

//sign in
const signIn = async (req, res, next) => {
  res.render("admin/signin");
};

//sign up
const signUp = async (req, res, next) => {
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
};

//getFlash
const getFlah = async (req, res, next) => {
  req.flash("message", "Not possible yet");
  res.redirect("/admin");
};

module.exports = {
  renderPage,
  signIn,
  signUp,
  getFlah,
};
