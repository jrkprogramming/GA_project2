
const Recipe = require('../models/recipe')
const User = require('../models/user')
const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination:'./public/images',
    fileName: (req,file,cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer ({
    storage:Storage,
    limits: {fileSize: 1000000000000},
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
    }).single('image')

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)

    if (mimeType && extName) {
        return cb(null, true)
    } else {
        cb('Error: Images only')
    }

}

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

function createMeal(req, res) {
    
    upload(req, res, (err) => {

        if (err) {

            console.log(err)

        } else {

            if(req.file == undefined) {
                res.send("Please include a photo of your meal!")
            }

        } 
        
        try { 

            const newMeal = new Recipe({

                mealName: req.body.mealName,
                image: req.file.filename,
                notes: req.body.notes,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                protein: req.body.protein,
                fat: req.body.fat,
                carbs: req.body.carbs,
                calories: req.body.calories,
                owner: req.user._id

            })
            newMeal.save(() => res.redirect('/mealPrep'), {title: "Meal Prep App"})
            
        } catch (err) {

        console.log(err)

        }

    })
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
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/mealPrep');
}



// --------------------------------

function addComment(req, res, next) {
    req.user.comment.push(req.body);
    req.user.save(function(err) {
      res.redirect('/mealPrep');
    });
  }

//   function deleteComment(req, res, next) {
//     Student.findOne({'facts._id': req.params.id}, function(err, student) {
//       student.facts.id(req.params.id).remove();
//       student.save(function(err) {
//         res.redirect('/students');
//       });
//     });
//   }

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = {
    index,
    showMeal,
    newMeal,
    createMeal,
    showEditMeal,
    editMeal,
    deleteMeal,
    addComment,
    isLoggedIn
}
