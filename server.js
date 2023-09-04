const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const fs = require('fs');
const path = require('path');




const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/todo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const PORT = 3000

//ROUTES

const todoAPI = require('./routes/todoAPI')
app.use('/API', todoAPI)

//ROUTES

app.listen(PORT, () => {

    console.log(`LISTENING TO PORT => ${PORT}`)

})
