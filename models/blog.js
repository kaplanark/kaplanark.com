const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title :{type:String, required:'Cannot be empty'},
    subtitle :{type:String, required:'Cannot be empty'},
    image :{type:String, required:'Cannot be empty'},
    blog :{type:String, required:'Cannot be empty'},
    date :{type:Date, default:Date.now}
});

module.exports = mongoose.model('Blog',blogSchema);