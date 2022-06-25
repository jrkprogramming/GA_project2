const mongoose = require('mongoose')
const path = require('path')
const Schema = mongoose.Schema


const recipeSchema = new Schema ({
	mealName: String,
	image: String,
	cloudinary_id: String,
    notes: String,
    ingredients: [String],
	instructions: [String],
	protein: Number,
	fat: Number,
	carbs: Number,
	calories: Number,
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
})




module.exports = mongoose.model('Recipe', recipeSchema)