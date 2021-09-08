const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();

//add new blog
router.get("/addnewblog",access,(req, res) => {
  res.render("blog/new");
});
router.post("/addnewblog",access,(req, res) => {
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
        res.render("pages/show",{found:found})
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    });
});

//remove blog
router.get('/delete/:blogid',access,(req,res)=>{  
  Blog.deleteOne({_id: req.params.blogid}, (err, post)=>{
      if(err){
        res.send(err);
      }else{
        req.flash("success", "Transaction successful");
        res.redirect('/admin/all');
      };  
  });
});

//edit blog
router.get('/edit/:blogid',access,(req,res)=>{
  Blog.findById(req.params.blogid)
    .then((found)=>{
        res.render("blog/edit",{found:found})
    })
    .catch((err)=>{
        res.send(err);
    });
});

router.get('/archive',access,(req,res)=>{
  req.flash("message", "Not possible yet");
  res.redirect('/admin/all');
});

router.post("/updateblog",access,(req, res) => {
  let id = req.body.data.id;
  let title = req.body.data.title;
  let subtitle = req.body.data.subtitle;
  let image = req.body.data.image;
  let date = req.body.data.date;
  let blog = req.body.data.blog;
  let updateblog = {
    title: title,
    subtitle: subtitle,
    image: image,
    date: date,
    blog: blog
  };
  Blog.updateOne({_id: id},updateblog)
    .then((updateblog) => {
      res.status(201).json(updateblog);
    })
    .catch((err) => {
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
