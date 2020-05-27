const express = require('express')
const app = express()
const db = require('../database/connection')
const consign = require('consign')

consign().include('./config/passport.js').then('./config/middlewares.js').then('./api').then('./config/routes.js').into(app)

app.db = db

app.listen(3000, () => {
    console.log('backend log')
})
