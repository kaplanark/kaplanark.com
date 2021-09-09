const express = require("express");
const adminConroller = require("../controller/admin");
const passport = require("passport");
const router = express.Router();

router.get("/admin", access, adminConroller.renderPage);
router.get("/signin", adminConroller.signIn);
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/signin",
  }),
  (req, res) => {}
);

//signup page router
router.get("/signup", access, (req, res) => {
  res.render("admin/signup");
});
router.post("/signup", access, adminConroller.signUp);

//signout router
router.get("/signout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//files router
router.get("/admin/files", access, adminConroller.getFlah);

//notes router
router.get("/admin/notes", access, adminConroller.getFlah);

//notification router
router.get("/admin/notification", access, adminConroller.getFlah);

//users router
router.get("/admin/users", access, adminConroller.getFlah);

//settings router
router.get("/admin/settings", access, adminConroller.getFlah);

//middleware
function access(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/signin");
  }
}
module.exports = router;
