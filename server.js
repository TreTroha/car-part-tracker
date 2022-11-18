const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'parts'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('parts').find().sort({likes: -1}).toArray()
    .then(data => { //Wherever we see data is actually our returned array of objects. 
        response.render('index.ejs', { info: data }) //Info is the name of all the data we are passing into the EJS
    })
    .catch(error => console.error(error))
})

app.post('/addPart', (request, response) => {
    db.collection('parts').insertOne({partName: request.body.partName,
    partPrice: request.body.partPrice, likes: 0})
    .then(result => {
        console.log('Part Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('parts').updateOne({partName: request.body.partNameS, partPrice: request.body.partPriceS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deletePart', (request, response) => {
    db.collection('parts').deleteOne({partName: request.body.partNameS})
    .then(result => {
        console.log('Part Deleted')
        response.json('Part Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})