
const Recipe = require('../models/recipe')

const index = async (req, res) => {
    let allMeals = await Recipe.find({})
    res.render('index', {allMeals})
}

function showMeal(req, res) {
    Recipe.findById(req.params.id).then((recipe) => {
        res.render('showMeal', {recipe})
    })
}

function newMeal(req, res) {
    res.render('new')
}

function createMeal(req, res) {
    let newMeal = new Recipe(req.body)
    newMeal.save(() => console.log('New meal was saved!'));
    res.redirect('/mealPrep')
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
