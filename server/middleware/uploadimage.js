const multer = require('multer');

/**
 * Save the pictures that get from the front end to back end 
 */

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./public/Images");  // Save to this path
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);  
    }
});

const upload = multer({ storage }); // Multer save the picture 

module.exports = upload;
