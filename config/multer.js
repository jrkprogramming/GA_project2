const multer = require('multer');
const path = require('path');

// const Storage = multer.diskStorage({
//     destination:'./public/images',
//     fileName: (req,file,cb) => {
//         cb(null, new Date().toISOString() + '-' + file.originalname)
//         // cb(null, file.originalname)
//     }
// })

// const upload = multer ({
//     storage:Storage,
//     limits: {fileSize: 1000000000000},
//     fileFilter: function(req, file, cb) {
//         checkFileType(file, cb)
//     }
//     }).single('image')

// function checkFileType(file, cb) {
//     const fileTypes = /jpeg|jpg|png|gif/
//     const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
//     const mimeType = fileTypes.test(file.mimetype)

//     if (mimeType && extName) {
//         return cb(null, true)
//     } else {
//         cb('Error: Images only')
//     }

// }

// module.exports = upload;


// ----------------------------------------------------------------

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true)
    }
})