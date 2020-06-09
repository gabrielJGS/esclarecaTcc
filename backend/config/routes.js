module.exports = app => {
    //Login/Cadastro
    app.post('/signup', app.api.users.save)
    app.post('/signin', app.api.auth.signin)

    //Perfil
    app.route('/users/:id')
        .get(app.api.users.profile)
        .put(app.api.users.update)
        .patch(app.api.users.patch)

    //Posts
    app.route('/posts')
        //.all(app.config.passport.authenticate())
        .get(app.api.posts.index)
        .post(app.api.posts.save)
        .head(app.api.posts.getTotalPosts)

    app.route('/post/:post')//get de único post
        // .all(app.config.passport.authenticate())
        .get(app.api.posts.getOne)

    //Like no post
    app.post('/posts/:post/like', app.api.posts.like)

    //Comentários
    app.route('/posts/:post')
        // .all(app.config.passport.authenticate())
        .delete(app.api.posts.remove)//Deletar post
        .get(app.api.comments.index)
        .post(app.api.comments.save)

    app.route('/posts/:post/:comm')
        // .all(app.config.passport.authenticate())
        .delete(app.api.comments.remove)//Deletar comentário
}