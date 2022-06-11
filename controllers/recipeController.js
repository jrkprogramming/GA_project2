
const Recipe = require('../models/recipe')
const Images = require('../models/images')
const multer = require('multer');

const Storage = multer.diskStorage({
    destination:'./public/images',
    fileName: (req,file,cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage:Storage
}).single('image')

const index = async (req, res) => {
    let allMeals = await Recipe.find({})
    res.render('index', {allMeals})
}

function showMeal(req, res) {
    Recipe.findById(req.params.id).populate('image').then((recipe) => {
        recipe = {...recipe._doc,image:Buffer.from(recipe.image.data).toString('base64')}
        // console.log(recipe)

        // res.send(recipe.image)

        res.render('showMeal', {recipe})
    })
}

function newMeal(req, res) {
    res.render('new')
}

function createMeal(req, res) {
    
    upload(req, res, err => {

        
        let newMeal = new Recipe(req.body)
        
        console.log(req.file)

        if (err) {
            console.log(err)
        } else {
            const newImage = new Images({
                name: req.body.name,
                image: {
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save().then(img => {
                
                newMeal.image = img._id
                newMeal.save().then(() => {console.log('New meal was saved!')
                res.redirect('/mealPrep')
            })
            
            
        });
        
        console.log(req.file)

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
