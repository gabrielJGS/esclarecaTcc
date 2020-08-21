const multer = require('multer');
const multerConfig = require('../config/multer');

module.exports = app => {
    //Login/Cadastro
    app.post('/signup', multer(multerConfig).single('file'), app.api.users.save)
    app.post('/signin', app.api.auth.signin)

    //Perfil
    app.route('/users/:id')
        .get(app.api.users.profile)
        .put(multer(multerConfig).single('file'), app.api.users.update)
        .patch(app.api.users.patch)

    //Enviar a foto de perfil
    app.post('/users/:id/photo', multer(multerConfig).single('file'), app.api.users.upload)
    //ranking
    app.get('/ranking', app.api.users.list)

    app.get('/users/:id/posts', app.api.posts.getByUser)//Posts do usuário
    app.get('/users/:id/posts/liked', app.api.posts.getByUser)//Posts curtidos pelo usuário

    //Posts
    app.route('/posts')
        //.all(app.config.passport.authenticate())
        .get(app.api.posts.index)
        .post(app.api.posts.save)
        .head(app.api.posts.getTotalPosts)

    //Busca dos posts
    app.post('/posts/search', app.api.posts.searchPost)//Posts do usuário

    app.route('/post/:post')//get de único post
        // .all(app.config.passport.authenticate())
        .get(app.api.posts.getOne)

    //Dar like no post
    app.post('/posts/:post/like', app.api.posts.like)

    //Comentários
    app.route('/posts/:post')
        // .all(app.config.passport.authenticate())
        .delete(app.api.posts.remove)//Deletar post
        .get(app.api.comments.index)
        .head(app.api.comments.getTotalComments)
        .post(app.api.comments.save)

    //Dar like no post
    app.post('/posts/:post/:comm/like', app.api.comments.like)

    //Deletar comentário
    app.route('/posts/:post/:comm')
        // .all(app.config.passport.authenticate())
        .delete(app.api.comments.remove)//Deletar comentário

    //Resolver o post
    app.route('/posts/:post/:comm/solve')
        // .all(app.config.passport.authenticate())
        .post(app.api.comments.solvePost)
    //Slacks
    app.route('/slacks')
        .get(app.api.slacks.index)
        .post(app.api.slacks.save)

    app.delete('/slacks/:slack', app.api.slacks.remove)
    app.post('/slacks/search', app.api.slacks.searchSlack)
}