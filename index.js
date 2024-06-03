require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
// Adding middleware.
app.use(express.json());

const characters = require("./harrypotter.json")

//Get a sentence when the localhost is loaded.
app.get('/', function (req, res) {
  res.send('Hello and welcome to the world of Harry Potter!')
})

// List of characters from the Harry Potter body.
 app.get('/characters', (req, res)=> {
     res.send(characters)
 })

// Searching for a character based on ID.
app.get('/characters/:id', (req, res) => {
    const id = req.params.id;
    const character = characters.find((character)=>character.id == id)
    if (character == undefined) {
        res.status(404).send("The character you are looking for does not exist.")
    }
    else {
        res.send(character);
    }
})

// Creating a new character with a new ID.
const ids = characters.map((character) =>(character.id))
let maxId = Math.max(...ids);
app.post('/characters', (req, res) => {
    const character = characters.find((character) => character.name.toLowerCase() == req.body.name.toLowerCase())
    if (character != undefined) {
        res.status(409).send("The character already exists.");
    }
    else {
        maxId += 1;
        req.body.id = maxId;
        characters.push(req.body)
        res.status(201).send(req.body)
    }
})

// Deleting a character.
app.delete("/characters/:name", (req, res) => {
    const name = req.params.name.toLowerCase();
    const characterIndex = characters.findIndex((character) => character.name.toLowerCase() == name)
    if (characterIndex == -1) {
        res.status(404).send("The character does not exist.");
    }
    else {
        characters.splice(characterIndex, 1);
        res.sendStatus(204);
    }
})

//Terminal status.
app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
})