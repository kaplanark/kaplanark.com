const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();

//add new blog
router.get("/addnewblog",access,(req, res) => {
  res.render("blog/new");
});
router.post("/addnewblog",access,(req, res) => {
  console.log(req.body.data);
  let title = req.body.data.title;
  let subtitle = req.body.data.subtitle;
  let image = req.body.data.image;
  let date = req.body.data.date;
  let blog = req.body.data.blog;

  let addnewblog = {
    title: title,
    subtitle: subtitle,
    image: image,
    date:date,
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

//remove blog
router.get('/delete/:blogid',access,(req,res)=>{  
  Blog.deleteOne({_id: req.params.blogid}, (err, post)=>{
      if (err)
          res.send(err);
      res.redirect('/admin/all',)
  });
});

//edit blog
router.get('/edit/:blogid',access,(req,res)=>{
  Blog.findById(req.params.blogid)
    .then((found)=>{
        res.render("blog/edit",{found:found})
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    });
});

// router.post("/updateblog/:blogid",access,(req, res) => {
//   console.log(req.body.newdata);
//   let title = req.body.newdatadata.title;
//   let subtitle = req.body.newdata.subtitle;
//   let image = req.body.newdata.image;
//   let date = req.body.newdata.date;
//   let blog = req.body.newdata.blog;

//   let updateblog = {
//     title: title,
//     subtitle: subtitle,
//     image: image,
//     date:date,
//     blog: blog,
//   };
//   Blog.updateOne({_id: req.params.blogid},updateblog)
//     .then((updateblog) => {
//       console.log(updateblog);
//       res.status(201).json(updateblog);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send(err);
//     });
// });

//middleware
function access(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/signin");
    }
  }

module.exports = router;
