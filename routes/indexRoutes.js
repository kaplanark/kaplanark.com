const express = require('express');
const Blog = require("../models/blogModels");
const router = express.Router();

//index page router
router.get('/', (req,res)=>{
    Blog.find({},(err,found)=>{
        if(err){
            console.log(err);
        }else{
            res.render('index',{found:found});
        }
    });
});
//resume page router
router.get('/resume', (req,res)=>{
    res.render('resume');
});

module.exports= router;