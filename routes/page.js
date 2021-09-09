const express = require('express');
const Blog = require("../models/blog");
const Page = require("../models/page");
const router = express.Router();

//index page router
router.get('/', (req,res)=>{
    Blog.find({},(err,found)=>{
        if(err){
            console.log(err);
        }else{
            res.render('pages/index',{title:'page title',found:found});
        }
    });
});

module.exports= router;