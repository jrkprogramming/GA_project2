const AddIngredient = () => {

    let createIngredientField = document.createElement("input")
    createIngredientField.setAttribute("name", "ingredients");
    createIngredientField.setAttribute("type", "text")

    createIngredientField.setAttribute("class", "form-control")
    createIngredientField.setAttribute("placeholder", "Add 1 ingredient. To add another, click the 'ADD ANOTHER INGREDIENT' button.")


    createIngredientField.style.display = 'block'

    let ingredientInputList = document.querySelector(".ingredients")

    ingredientInputList.appendChild(createIngredientField)

}


const AddInstruction = () => {

        let createInstructionField = document.createElement("textarea")
        createInstructionField.setAttribute("name", "instructions");
        createInstructionField.setAttribute("type", "text")

        createInstructionField.setAttribute("class", "form-control")
        createInstructionField.setAttribute("placeholder", "Write the steps to your recipe. To add another step, click the 'ADD ANOTHER STEP' button.")

        createInstructionField.style.display = 'block'
    
        let instructionsInputList = document.querySelector(".instructions")
    
        instructionsInputList.appendChild(createInstructionField)
    
}

const editImage = () => {
    
    let editImage = document.createElement('input')
    editImage.setAttribute("name", "image")
    editImage.setAttribute("type", "file")
    editImage.setAttribute("class", "form-control form-control-lg")
    editImage.setAttribute("id", "formFileLg")

    let editImageField = document.querySelector("#imageBox")
    editImageField.appendChild(editImage)
}