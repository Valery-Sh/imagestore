var ImageModel = require('../models/imagestore.js'); 
var routes = require('../routes'); 
/**
 * Excecutes when a browser tries to load the image 
 * specified by the img tag.
 */
exports.load= function(req, res,next) {
    var fileName = req.params[0];
    ImageModel.findOne({
        'img.fileName': fileName
    }, 
    function (err, doc) {      
        if (err) {
            console.log("Cannot load an Image")
            return next(err);
        }
        res.contentType(doc.img.contentType);
        res.sendfile(req.uploadConfig.baseDir + req.uploadConfig.path + "/" + doc.img.fileName);
    });
};
/**
 * Updates image position.
 */
exports.update= function(req, res,next) {
    
    ImageModel.findById(req.param('imageId'), function(err, doc) {
        
        if (!doc) {
            return next(new Error('Could not load img Document'));
        }
        else {
            doc.img.pos.x = req.param('imagePosX');
            doc.img.pos.y = req.param('imagePosY');

            doc.save(function(err) {
                if (err)
                    console.log('error')
                else
                    console.log('success')
            });
            res.contentType('text/plain');
            res.send({
                path: "Image UPDATED"
            });            
        }
    });    
};

/**
 * Excecutes as a wellcome page
 */
exports.index = function(req, res,next) {
    ImageModel.find({},function(err,imageDocs) {
        routes.index(req,res,imageDocs);    
    } );
};
/**
 * Excecutes when an image is to be uploaded.
 */
exports.upload = function(req, res,next) {
    var idx = Math.max(req.files.imageFile.path.lastIndexOf('/'),req.files.imageFile.path.lastIndexOf('\\'));

    var model = new ImageModel;
    model.img.fileName = req.files.imageFile.path.slice(++idx);
    model.img.contentType = req.files.imageFile.type;
    model.img.pos.x = 0;
    model.img.pos.y = 0;

    model.save(function (err, doc) {
        if (err) throw err;

        res.contentType('text/plain');
        
        res.send(JSON.stringify({
            id : "id_" + doc.id,
            left: doc.img.pos.x,
            top: doc.img.pos.y,
            srcAttr : '/imagestore' + '/load/' + doc.img.fileName
        }));
    });

};
/**
 * The response contains the infomation of image count in
 * the database
 */
exports.count = function(req, res,next) {
    console.log(" COUNT   " + req.uploadConfig.baseDir);
    
    console.log(" COUNT IMAGES  ");

    console.log('mongo is open');

    ImageModel.count({},function(err,count) {
        console.log('before count old docs');
        if (err) throw err;
        console.log('count old docs');
        res.send("COUNT = " + count);
        
    });
};
/**
 * Removes all images from the database.
 */
exports.clear = function(req, res,next) {    
    console.log(" REMOVE IMAGES  ");
    ImageModel.remove(function (err) {
        if (err) throw err;
        res.send("CLEAR DONE");
    });
};
