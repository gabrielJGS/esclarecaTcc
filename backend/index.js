const express = require('express')
const app = express()
const db = require('./config/db')
const consign = require('consign')

//consign().include('./config/passport.js').then('./config/middlewares.js').then('./api').then('./config/routes.js').into(app)
consign()
    .then('./api')//controllers
    
    .then('./config/middlewares.js')
    .then('./config/routes.js')//config das rotas
    .into(app)//inserir os then acima na variavel app

app.db = db
app.listen(3333, () => {
    console.log('backend log')
})
