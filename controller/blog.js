const Blog = require("../models/blog");
//render page
const renderPage = async (req,res) => {
  res.render("blog/new");
};
//new
const newBlog = async (req,res) => {
  let title = req.body.data.title;
  let subtitle = req.body.data.subtitle;
  let image = req.body.data.image;
  let date = req.body.data.date;
  let blog = req.body.data.blog;

  let addnewblog = {
    title: title,
    subtitle: subtitle,
    image: image,
    date: date,
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
};
//see
const seeBlog = async (req,res) => {
  Blog.findById(req.params.blogid)
    .then((found) => {
      res.render("pages/show", {found: found });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};
//all
const allBlog = async (req,res) => {
  Blog.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.render("blog/all", { found: found });
    }
  });
};
//delete
const deleteBlog = async (req,res) => {
  Blog.deleteOne({ _id: req.params.blogid }, (err, post) => {
    if (err) {
      res.send(err);
    } else {
      req.flash("success", "Transaction successful");
      res.redirect("/admin/all");
    }
  });
};
//edit
const editBlog = async (req,res) => {
  Blog.findById(req.params.blogid)
    .then((found) => {
      res.render("blog/edit", { found: found });
    })
    .catch((err) => {
      res.send(err);
    });
};

const archiveBlog = async (req,res) => {
  req.flash("message", "Not possible yet");
  res.redirect("/admin/all");
};
//update
const updateBlog = async (req,res) => {
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
    blog: blog,
  };
  Blog.updateOne({ _id: id }, updateblog)
    .then((updateblog) => {
      res.status(201).json(updateblog);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

module.exports = {
  renderPage,
  newBlog,
  seeBlog,
  deleteBlog,
  editBlog,
  archiveBlog,
  updateBlog,
  allBlog,
};
