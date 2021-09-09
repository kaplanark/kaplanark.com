const mongoose = require('mongoose');
const pageSchema = new mongoose.Schema({
    title :{type:String ,required:"Cannot be empty"}
});

module.exports = mongoose.model('Page',pageSchema);