require('dotenv').config()
console.log(process.env)
const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
})