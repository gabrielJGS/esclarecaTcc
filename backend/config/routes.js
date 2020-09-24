const multer = require('multer');
const multerConfig = require('../config/multer');

module.exports = app => {
    //Login/Cadastro
    app.post('/signup', multer(multerConfig).single('file'), app.api.users.save)
    app.post('/signin', app.api.auth.signin)

    //Perfil
    app.route('/users/:id')
        .get(app.api.users.profile)
        .put(app.api.users.update)
        .patch(app.api.users.patch)

    //Enviar a foto de perfil
    app.post('/users/:id/photo', multer(multerConfig).single('file'), app.api.users.upload)
    
    //ranking
    app.get('/ranking', app.api.users.list)

    app.get('/users', app.api.users.index)//Pesquisar usuário
    app.get('/users/:id/posts', app.api.posts.getByUser)//Posts do usuário
    app.get('/users/:id/liked', app.api.posts.getLikesByUser)//Posts curtidos pelo usuário
    app.post('/users/:id/block', app.api.users.blockUser)//Bloquear usuário
    app.post('/users/:id/follow', app.api.users.followUser)//Seguir usuário
    app.post('/forget', app.api.users.forgotPassword)//esqueceu a senha
    app.post('/resetPass', app.api.users.resetPassword)//resetar senha

    //Posts
    app.route('/posts')
        //.all(app.config.passport.authenticate())
        .get(app.api.posts.index)
        .post(app.api.posts.save)
        .head(app.api.posts.getTotalPosts)

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

    //Slacks Messages
    app.route('/slacks/:slack')
        .get(app.api.slacks_messages.index)
        .post(app.api.slacks_messages.save)
    app.delete('/slacks/:slack/:slack_msg', app.api.slacks_messages.remove)
}