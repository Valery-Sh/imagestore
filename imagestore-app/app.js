/**
 * Module dependencies.
 */
var express = require('express')
, http = require('http')
, path = require('path')
, routes = require('./routes')
, appconfig = require('./appconfig')
, fs = require('fs') 
, mongoose = require('mongoose');

var app = express();
//
// Configuration
//
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser({
        uploadDir: appconfig.uploadConfig.baseDir + appconfig.uploadConfig.path,
        keepExtensions: true
    }));    
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));  
    app.use(express.static(path.join(__dirname, 'public')));  
});

app.configure('development', function(){
    app.use(express.errorHandler({
        dumpExceptions: true, 
        showStack: true
    }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

//
//------------- ModgoDB ------------------------------
//
mongoose.connect('mongodb://localhost/uploadedImages'); 

//
// Maps routes/controllers
// 
appconfig.mapRoute(app, 'imagestore'); 
/**
 * The response contains the infomation of image count in
 * the database
 */
app.get('/c', function(req, res,next) {
    console.log(" COUNT IMAGES  ");

    console.log('mongo is open');

    ImageModel.count({},function(err,count) {
        console.log('before count old docs');
        if (err) throw err;
        console.log('count old docs');
        res.send("COUNT = " + count);
        
    });
});
/**
 * Removes all images from the database.
 */
app.get('/r', function(req, res,next) {
    console.log(" REMOVE IMAGES  ");
    ImageModel.remove(function (err) {
        if (err) throw err;
        res.send("CLEAR DONE");
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});