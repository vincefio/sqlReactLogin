const express = require('express')
const bodyParser = require('body-parser')
const PORT = 8080

//Initialize expres
const app = express()

//Database
const db = require('./db/index')

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Express app ROUTING */
app.use('/', require('./routes'))

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))