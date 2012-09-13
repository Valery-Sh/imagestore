//
//------------- ModgoDB ------------------------------
//
var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    img: {
        contentType: String,
        originalFileName : String, // original simple file name with extention
        fileName : String, // the name as in image store
        pos: {
            x : Number, 
            y : Number
        }  
    }
});

module.exports = mongoose.model('ImageModel', ImageSchema); 
