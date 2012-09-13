exports.uploadConfig = {
    baseDir : __dirname,
    path: '/upload/images'
}

exports.mapRoute = function(app, prefix) { 
    
   var prefixObj = require('./controllers/' + prefix); 
   
   prefix = '/' + prefix; 
   
   // Update an image position as a result of Drag/Drop
   app.put(prefix + '/update', prefixObj.update); 
   
   // Load an image by a browser request
   app.get(prefix + '/load/*', prefixObj.load);
   
   // Shows start page
   app.get('/', prefixObj.index);
   
   // Uploads a single file
   app.post(prefix + '/upload', prefixObj.upload);

};
