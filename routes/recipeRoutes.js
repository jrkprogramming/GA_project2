const express = require('express');
const router = express.Router();
const mealPrepCtrl = require('../controllers/recipeController')
const multer = require('multer');

const Storage = multer.diskStorage({
    destination:'./public/images',
    fileName: (req,file,cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage:Storage
})

router.get('/mealPrep', mealPrepCtrl.index)

router.get('/mealPrep/new', mealPrepCtrl.newMeal)

router.get('/mealPrep/:id', mealPrepCtrl.showMeal)

router.get('/mealPrep/:id/edit', mealPrepCtrl.showEditMeal)

router.put('/mealPrep/:id', mealPrepCtrl.editMeal)

router.post('/mealPrep', mealPrepCtrl.createMeal)

// router.post('/mealPrep/new', upload.single('image'), mealPrepCtrl.uploadImage)

router.delete('/mealPrep/:id', mealPrepCtrl.deleteMeal)

module.exports = router;