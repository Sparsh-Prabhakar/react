require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()

app.use(bodyParser.json())  // always in this order
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 
    'mongodb+srv://admin:passwordpassword@cluster0-dhpo7.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// console.log(test)
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
    
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
})

app.listen(3000, () => {
    console.log('Listening to port 3000')
})