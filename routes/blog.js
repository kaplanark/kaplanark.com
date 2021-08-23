const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();

router.get("/addnewblog",access,(req, res) => {
  res.render("blog/new");
});
router.post("/addnewblog",access,(req, res) => {
  console.log(req.body.data);
  let title = req.body.data.title;
  let subtitle = req.body.data.subtitle;
  let image = req.body.data.image;
  let blog = req.body.data.blog;

  let addnewblog = {
    title: title,
    subtitle: subtitle,
    image: image,
    blog: blog,
  };

  Blog.create(addnewblog)
    .then((addnewblog) => {
      console.log(addnewblog);
      res.status(201).json(addnewblog);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
router.get('/blogs/:blogid', (req,res)=>{
    Blog.findById(req.params.blogid)
    .then((found)=>{
        res.render("blog/show",{found:found})
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    });
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
