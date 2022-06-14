
const Recipe = require('../models/recipe')
// const Images = require('../models/images')
const multer = require('multer');
var path = require('path');

const Storage = multer.diskStorage({
    destination:'./public/images',
    fileName: (req,file,cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
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

    if(mimeType && extName) {
        return cb(null, true)
    } else {
        cb('Error: Images only')
    }
}


const index = async (req, res) => {
    let allMeals = await Recipe.find({})
    res.render('index', {allMeals})
}

function showMeal(req, res) {
    Recipe.findById(req.params.id).then((recipe) => {
        // recipe = {...recipe._doc,image:Buffer.from(recipe.image.data).toString('base64')}
        // console.log(recipe)

        // res.send(recipe.image)

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
                res.send('Please select a file')
            }
            
        } try {
            
            const newMeal = new Recipe({

                mealName: req.body.mealName,
                image: req.file.filename,
                notes: req.body.notes,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                protein: req.body.protein,
                fat: req.body.fat,
                carbs: req.body.carbs,
                calories: req.body.calories

            })
        
            newMeal.save(() => res.redirect('/mealPrep'), {title: "Meal Prep App"})


        // newMeal.image = img._id
        // newMeal.save().then(() => {console.log('New meal was saved!')
        // res.redirect('/mealPrep')
        
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
    await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/mealPrep`)
}

async function deleteMeal(req, res) {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/mealPrep');
}




module.exports = {
    index,
    showMeal,
    newMeal,
    createMeal,
    showEditMeal,
    editMeal,
    deleteMeal
}
