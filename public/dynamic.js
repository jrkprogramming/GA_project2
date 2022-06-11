const AddIngredient = () => {

    let createIngredientField = document.createElement("input")
    createIngredientField.setAttribute("name", "ingredients");
    createIngredientField.setAttribute("type", "text")
    createIngredientField.style.display = 'block'

    let ingredientInputList = document.querySelector(".ingredients")

    ingredientInputList.appendChild(createIngredientField)

}


const AddInstruction = () => {

        let createInstructionField = document.createElement("textarea")
        createInstructionField.setAttribute("name", "instructions");
        createInstructionField.setAttribute("type", "text")
        createInstructionField.style.display = 'block'
    
        let instructionsInputList = document.querySelector(".instructions")
    
        instructionsInputList.appendChild(createInstructionField)
    
}