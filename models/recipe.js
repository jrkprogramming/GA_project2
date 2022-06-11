const mongoose = require('mongoose')
const Schema = mongoose.Schema


const recipeSchema = new Schema ({
	mealName: String,
    // Use Multr to upload images
	image: {
		ref:'Images',
		type: Schema.Types.ObjectId
	},
    notes: String,
    ingredients: [String],
    // instructions should be in an ordered list
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