
const Recipe = require('../models/recipe')
const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinary')
const upload = require('../config/multer');

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

}

function showEditMeal(req, res) {
    Recipe.findById(req.params.id).then((recipe) => {
      res.render('edit', {recipe})
    })
}

function showEditMealPhoto(req, res) {
    Recipe.findById(req.params.id).then((recipe) => {
        res.render('editMealPhoto', {recipe})
      })
}

async function editMeal(req, res) {

    try {
    
    let mealPrep = await Recipe.findById(req.params.id);
    
    const data = {
            mealName: req.body.mealName || mealPrep.mealName,
            image: mealPrep.image,
            cloudinary_id: mealPrep.cloudinary_id,
            notes: req.body.notes || mealPrep.notes,
            ingredients: req.body.ingredients || mealPrep.ingredients,
            instructions: req.body.instructions || mealPrep.instructions,
            protein: req.body.protein || mealPrep.protein,
            fat: req.body.fat || mealPrep.fat,
            carbs: req.body.carbs || mealPrep.carbs,
            calories: req.body.calories || mealPrep.calories,
            owner: req.user._id || mealPrep.owner
    }
    
    console.log(data)
    mealPrep = await Recipe.findByIdAndUpdate(req.params.id, data, {new:true});
    res.redirect(`/mealPrep`)
    } catch(err) {
        console.log(err)
    }

}

async function editMealPhoto(req, res) {

    try {

        let mealPrep = await Recipe.findById(req.params.id);

        await cloudinary.uploader.destroy(mealPrep.cloudinary_id)

        const result = await cloudinary.uploader.upload(req.file.path)
        
        const data = {

            mealName: req.body.mealName || mealPrep.mealName,
            image: result.secure_url || mealPrep.image,
            cloudinary_id: result.public_id || mealPrep.cloudinary_id,
            notes: req.body.notes || mealPrep.notes,
            ingredients: req.body.ingredients || mealPrep.ingredients,
            instructions: req.body.instructions || mealPrep.instructions,
            protein: req.body.protein || mealPrep.protein,
            fat: req.body.fat || mealPrep.fat,
            carbs: req.body.carbs || mealPrep.carbs,
            calories: req.body.calories || mealPrep.calories,
            owner: req.user._id || mealPrep.owner
        }

        mealPrep = await Recipe.findByIdAndUpdate(req.params.id, data, {new:true})

        res.redirect('/mealPrep')

    } catch (err) {
        console.log(err)
    }

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
    deleteMeal,
    editMealPhoto,
    showEditMealPhoto
    // addComment,
    // isLoggedIn
}
