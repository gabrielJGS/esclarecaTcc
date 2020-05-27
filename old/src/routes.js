const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')

module.exports = app => {
    //Cadastrar perfil e logar
    app.post('/signup', UserController.register)
    app.post('/login', UserController.login)
    app.post('/forget', UserController.forget)

    app.route('/posts')
        .all(app.services.passport.authenticate())
        .post('/posts', PostController.create)
        .get('/posts', PostController.index)
}