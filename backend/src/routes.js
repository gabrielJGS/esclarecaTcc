const express = require('express')

const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')

const routes = express.Router()

//Cadastrar perfil e logar
routes.post('/signup', UserController.register)
routes.post('/login', UserController.login)

routes.post('/posts', PostController.create)
routes.get('/posts', PostController.index)


module.exports = routes