const express = require('express');
const router = express.Router();
const mealPrepCtrl = require('../controllers/recipeController')
const upload = require('../config/multer');

router.get('/mealPrep', mealPrepCtrl.index)

router.get('/mealPrep/new', mealPrepCtrl.newMeal)

router.get('/mealPrep/:id', mealPrepCtrl.showMeal)

router.get('/mealPrep/:id/edit', mealPrepCtrl.showEditMeal)

router.put('/mealPrep/:id', mealPrepCtrl.editMeal)

router.get('/mealPrep/:id/editMealPhoto', mealPrepCtrl.showEditMealPhoto)

router.put('/mealPrep/:id/editPhoto', upload.single("image"), mealPrepCtrl.editMealPhoto)

router.post('/mealPrep', upload.single('image'), mealPrepCtrl.createMeal)

router.delete('/mealPrep/:id', mealPrepCtrl.deleteMeal)

module.exports = router;