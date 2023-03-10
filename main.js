///////////////////////
// Global Data
///////////////////////

const people = [
    {id: 1, name: 'HomeStyle', flavor: 'vanilla'},
    {id: 2, name: 'French', flavor: 'vanilla'},
    {id: 3, name: 'Italian', flavor: 'vanilla'},
    {id: 4, name: 'The Dracula', flavor: 'chocolate'},
    {id: 5, name: 'American', flavor: 'chocolate'},
    {id: 6, name: 'Sweet Caroline', flavor: 'strawberry'},
    {id: 7, name: 'Short Cakes', flavor: 'strawberry'},
    {id: 8, name: 'CC Continental', flavor: 'cookies n\' cream'},
    {id: 9, name: 'Cookie Monster', flavor: 'cookies n\' cream'},
    {id: 10, name: 'Oreos W/ Milk', flavor: 'cookies n\' cream'},
    {id: 11, name: 'The Railroad', flavor: 'rocky road'},
    {id: 12, name: 'Rock N\' Roll', flavor: 'rocky road'},
    {id: 13, name: 'The Elvis', flavor: 'rocky road'},
    {id: 14, name: 'MushMellow', flavor: 'rocky road'},
]

//document.querySelector takes a css selector and returns the first element that matches that selector
const mainDiv = document.querySelector("main") // returns the one main element in our html

//below we will add our form inputs to some global variables
const nameInput = document.querySelector('input[name="name"]') //selecting the input with name property "name"
const flavorInput = document.querySelector('input[name="flavor"]') //selecting the input with name property "name"
const createButton = document.querySelector("button#createitem") //select button with id "createitem"

//below we will add our update form inputs to some global variables
const updateName = document.querySelector('input[name="updateName"]') //selecting the input with name property "name"
const updateFlavor = document.querySelector('input[name="updateFlavor"]') //selecting the input with name property "name"
const updateFormButton = document.querySelector("button#updateitem") //select button with id "createitem"

///////////////////////
// Functions
///////////////////////

//define function for rendering current data to DOM, use this whenever data changes
const renderData = () => {
    //empty of the main div of any existing content
    mainDiv.innerHTML = ""

    //let us loop over the people array
    people.forEach((person, index) => {
        const personH1 = document.createElement("h1") // Creates new h1 element

        const buttonContainer = document.createElement("aside") //create aside to store update/delete buttons

        //Delete Button
        const deleteButton = document.createElement(`button`) //create delete button
        deleteButton.id = index
        deleteButton.innerText = "Delete" //make the delete button say "Delete"
        deleteButton.addEventListener("click", event => {
            people.splice(index, 1) //remove the element at the current index
            renderData() //re-render the updated data to the DOM
        })
        buttonContainer.appendChild(deleteButton) //apend the delete button

        //Update Button
        const updateButton = document.createElement(`button`) //create update button
        updateButton.id = index
        updateButton.innerText = "Update" //make the delete button say "Delete"
        updateButton.addEventListener("click", event => {
            updateName.value = person.name //set form to show current name
            updateFlavor.value = person.flavor //set form to show current age
            updateFormButton.setAttribute("toupdate", index) //custom attribute to use in the button event later
        })
        buttonContainer.appendChild(updateButton) //apend the delete button

        personH1.innerText = `${person.name} is ${person.flavor} ` //ads text to the h1
        mainDiv.appendChild(personH1) //append the h1 to the main element
        mainDiv.appendChild(buttonContainer) //append container of update and delete button
    })
}

const createData = () => {
    const name = nameInput.value //store value from name input into name variable
    const flavor = flavorInput.value //store value from age input into age variable
    const newPerson = { name, flavor } // create new person object
    people.push(newPerson) //push the new person object into the array
    renderData() //render the data again so it reflects the new data
}

const updateData = event => {
    const index = event.target.getAttribute("toupdate") //get index we stored via custom attribute
    const name = updateName.value //get value from form
    const flavor = updateFlavor.value //get value from form
    people[index] = { name, flavor } //replace existing object at that index with a new with updated values
    renderData() //update the DOM with the new data
}

////////////////////
// Main App Logic
////////////////////
renderData() //call the render data function for the initial rendering of the data
createButton.addEventListener("click", createData) //trigger create data function whenever createButton is clicked
updateFormButton.addEventListener("click", updateData) //trigger update data function when updateButton is clicked
