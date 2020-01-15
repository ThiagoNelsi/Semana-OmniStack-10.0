const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

mongoose.connect('mongodb+srv://<user>:<password>@cluster0-jcjhx.mongodb.net/week10?retryWrites=true&w=majority', {
    useFindAndModify:false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(3333)