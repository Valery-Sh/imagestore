exports.mapRoute = function(app, prefix) { 
    
   var prefixObj = require('./controllers/' + prefix); 
   
   prefix = '/' + prefix; 
   
   // Update an image position as a result of Drag/Drop
   app.put(prefix + '/updateImage', prefixObj.updateImage); 
   
   // Load an image by a browser request
   app.get(prefix + '/loadImage/*', prefixObj.loadImage);
   
   // Shows start page
   app.get('/', prefixObj.index);
   
   // Uploads a single file
   app.post(prefix + '/uploadImage', prefixObj.uploadImage);
   
   app.get('/clear', prefixObj.clear);
   
   app.get('/count', prefixObj.count);

};

exports.middleware = function mid(baseDir,path) { 
     var uploadConfig = {baseDir : baseDir, path :path }
     return function mid(req, res, next) {
        req.uploadConfig = uploadConfig; 
        next(); 
     }
} 
