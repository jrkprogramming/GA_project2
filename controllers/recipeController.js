
const Recipe = require('../models/recipe')
const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinary')
const upload = require('../config/multer');

// const Storage = multer.diskStorage({
//     destination:'./public/images',
//     fileName: (req,file,cb) => {
//         // cb(null, new Date().toISOString() + '-' + file.originalname)
//         cb(null, file.originalname)
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

// const uploader = async (path) => await cloudinary.uploads(path, 'Images');

// const newPath = uploader(path);

// if (req.method === "POST") {
//   const urls = [];
//   const files = req.files;
//   for (const file of files) {
//     const {path} = file;
    // urls.push(newPath);
    // fs.unlinkSync(path)
//   }

//   res.status(200).json({
//     message: 'images uploaded successfully',
//     data: urls
//   })

// } else {
//   res.status(405).json({
//     err: `${req.method} method not allowed`

//   })
// }

const index = async (req, res) => {
    
    if (req.user) {
        let allMeals = await Recipe.find({}).populate('owner')
        res.render('index', {allMeals, user:req.user})
    } else {
        // Render error page
        res.redirect('/user/login')
    }
}

function showMeal(req, res) {
    Recipe.findById(req.params.id).populate('owner').then((recipe) => {
        res.render('showMeal', {recipe})
    })
}

function newMeal(req, res) {
    res.render('new')
}

async function createMeal(req, res) {

    
    // upload.single(req, res, async (err) => {
        
        
        // if (err) {
            
        //     console.log(err)
            
        // } else {
            
        //     if(req.file == undefined) {
        //         res.send('Please include a photo!')
        //     }
            
        // } 
        
        try { 
            
            const result = await cloudinary.uploader.upload(req.file.path)
            
            const newMeal = new Recipe({

                mealName: req.body.mealName,
                image: result.secure_url,
                cloudinary_id: result.public_id,
                notes: req.body.notes,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                protein: req.body.protein,
                fat: req.body.fat,
                carbs: req.body.carbs,
                calories: req.body.calories,
                owner: req.user._id

            })

               await newMeal.save(() => res.redirect('/mealPrep'))
            
        } catch (err) {

        console.log(err)

        }

    // })
}

function showEditMeal(req, res) {
    Recipe.findById(req.params.id).then((recipe) => {
      res.render('edit', {recipe})
    })
}

async function editMeal(req, res) {
    console.log(req.body)
    await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/mealPrep`)
}

async function deleteMeal(req, res) {
    
    try {
        let mealPrep = await Recipe.findById(req.params.id);
        await cloudinary.uploader.destroy(mealPrep.cloudinary_id)
        await mealPrep.remove()
        res.redirect('/mealPrep');
        
    } catch (err) {
        console.log(err)
    }
}






// --------------------------------

// function addComment(req, res, next) {
//     req.user.comment.push(req.body);
//     req.user.save(function(err) {
//       res.redirect('/mealPrep');
//     });
//   }

//   function deleteComment(req, res, next) {
//     Student.findOne({'facts._id': req.params.id}, function(err, student) {
//       student.facts.id(req.params.id).remove();
//       student.save(function(err) {
//         res.redirect('/students');
//       });
//     });
//   }

// function isLoggedIn(req, res, next) {
//   if ( req.isAuthenticated() ) return next();
//   res.redirect('/auth/google');
// }

module.exports = {
    index,
    showMeal,
    newMeal,
    createMeal,
    showEditMeal,
    editMeal,
    deleteMeal
    // addComment,
    // isLoggedIn
    // upload,
    // Storage,
    // checkFileType
}
