const express = require('express')
const app = express()
const { DB_URI, PORT } = require('./configurations/config')
const mongoose = require('mongoose')
const recordRouter = require('./routes/recordRoute')

app.use(express.json());

app.get('/', (request, response) => {
    response.send('Hello from app.js!')
})

mongoose.connect(DB_URI)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully!'))

app.use('/api/v1/records', recordRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})