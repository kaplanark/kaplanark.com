const express = require("express");
const blogController = require("../controller/blog");
const router = express.Router();

router.get("/addnewblog", access, blogController.renderPage);

router.post("/addnewblog", access, blogController.newBlog);

router.get("/blogs/:blogid", blogController.seeBlog);

router.get("/delete/:blogid", access, blogController.deleteBlog);

router.get("/edit/:blogid", access, blogController.editBlog);

router.get("/archive", access, blogController.archiveBlog);

router.post("/updateblog", access, blogController.updateBlog);

router.get('/admin/all',access,blogController.allBlog);

//middleware
function access(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/signin");
  }
}

module.exports = router;
