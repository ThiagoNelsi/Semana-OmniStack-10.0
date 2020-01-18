const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const mongoCredentials = require('../credentials/mongodb.json')
const { username, password } = mongoCredentials

const app = express()

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-jcjhx.mongodb.net/week10?retryWrites=true&w=majority`, {
    useFindAndModify:false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(routes)

app.listen(3333)