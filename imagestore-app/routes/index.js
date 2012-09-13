/**
 * Renders the home page. 
 */
exports.index = function(req, res,imageDocs){
  res.render('index', { 
      title: 'Image Sandbox',
      imageDocs : imageDocs
    })
};