
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
    
    app.use(appconfig.middleware(__dirname,"/upload/images"));
    app.use(express.bodyParser({
        uploadDir: __dirname + "/upload/images",
        keepExtensions: true
    }));    

    app.use(express.methodOverride());
    app.use(app.router);
    
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
mongoose.connect('mongodb://localhost/imagestore'); 

//
// Maps routes/controllers
// 
appconfig.mapRoute(app, 'imagestore'); 

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});