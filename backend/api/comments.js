var momentTz = require('moment-timezone');
const mongoose = require('mongoose');

const Users = require('../models/Users');
const Posts = require('../models/Posts');
const Posts_Comments = require('../models/Posts_Comments');

module.exports = app => {
    // const getOne = async (req, res) => {
    //     const { post } = req.params;
    //     const post = await Posts.findById(post)
    //         .catch(err => res.status(400).json(err))
    //     if (!post) {
    //         return res.status(400).send('Post não encontrado')
    //     }
    //     await post.populate('posts').populate('user').execPopulate()
    //     return res.json(post);
    // }

    const getTotalComments = async (req, res) => {
        const { post } = req.params;

        const user = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }

        const postOri = await Posts.findById(post)
            .catch(err => res.status(400).json(err))
        if (!postOri) {
            return res.status(401).send('Post inválido');
        }
        const count = await Posts_Comments.find({ post, user: { $nin: user.blocked } }).countDocuments()

        res.header('X-Total-Count', count)
        return res.json(count)
    }

    const index = async (req, res) => {
        const { user_id } = req.headers
        const { post } = req.params;
        //Páginação
        const qtdLoad = 5
        const { page = 1 } = req.query

        const user = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }

        const postOri = await Posts.findById(post)
            .catch(err => res.status(400).json(err))
        if (!postOri) {
            return res.status(401).send('Post inválido');
        }

        const count = await Posts_Comments.find({ post, user: { $nin: user.blocked } }).countDocuments()

        res.header('X-Total-Count', count)

        const comments = await Posts_Comments
            .aggregate([
                { $match: { post: postOri._id, user: { $nin: user.blocked } } },
                { $sort: { solvedPost: -1, postedIn: 1 } },
                {
                    "$addFields": {
                        "didILiked": {
                            "$in": [mongoose.Types.ObjectId(user_id), "$likes"]
                        }
                    }
                },
                { $skip: (page - 1) * qtdLoad },
                { $limit: qtdLoad },
                { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
                { $lookup: { from: 'users', localField: 'likes', foreignField: '_id', as: 'likes' } },
            ])
            .catch(err => { return res.status(400).json(err) })

        return res.json(comments)
    }

    const save = async (req, res) => {
        //const { filename } = req.file;
        const { user } = req.headers
        const { message } = req.body
        const { post } = req.params
        const userExiste = await Users.findById(user);
        if (!userExiste) {
            return res.status(401).send('Usuário inválido');
        }
        if (!post || !message) {
            return res.status(400).send('Algum campo não foi preenchido');
        }
        const comment = await Posts_Comments.create({
            post,
            user,
            postedIn: momentTz().tz("America/Sao_Paulo").format(),
            message,
            solvedPost: false,
        })
            .catch(err => res.status(400).json(err))
        if (userExiste.ranking === NaN || userExiste.ranking === undefined) {
            value = 3
        }
        else {
            value = userExiste.ranking + 3
        }
        const result = await Users.findByIdAndUpdate(user, { ranking: value })
        res.status(204).send()

    }

    const remove = async (req, res) => {
        const { post, comm } = req.params
        const { user_id } = req.headers

        const user = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }

        const commentToDelete = await Posts_Comments.findById(comm)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!commentToDelete) { res.status(400).send("Comentário não encontrado com o id: " + comm) }//Caso o id seja válido mas não exista vai cair aqui

        if (commentToDelete.post._id == post || commentToDelete.user == user_id) {//Se é o post certo e o dono do comentário deleta
            await Posts_Comments.deleteOne(commentToDelete)
                .catch(err => res.status(400).json(err))

            if (user.ranking === NaN || user.ranking === undefined) {
                value = 0
            }
            else {
                value = user.ranking - 3
            }
            const result = await Users.findByIdAndUpdate(user, { ranking: value })

            res.status(204).send()
        } else {//Se não, não tem permissão
            res.status(401).send(`Usuário ${user_id} não autorizado a deletar o comentário.`)
        }

    }

    const like = async (req, res) => {
        const { user_id } = req.headers;
        const { comm } = req.params;
        const user = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }
        const commToUpdate = await Posts_Comments.findById(comm)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!commToUpdate) {//Caso o id seja válido mas não exista vai cair aqui
            res.status(400).send("Comentário não encontrado com o id: " + req.params.comm)
        } else {
            if (commToUpdate.likes.find(u => u == user_id)) {//Descurtindo

                const index = commToUpdate.likes.indexOf(user_id);
                if (index > -1) {
                    commToUpdate.likes.splice(index, 1);
                }
                await commToUpdate.save()
                    .catch(err => res.status(400).json(err))
                res.status(201).send()
            }
            else {//Curtindo
                commToUpdate.likes.push(user.id)
                await commToUpdate.save()
                    .catch(err => res.status(400).json(err))

                res.status(201).send()
            }
        }
    }

    const solvePost = async (req, res) => {
        const { user_id } = req.headers;
        const { comm } = req.params;

        //Validação de usuário
        const user = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }

        //Busca do comentário
        const commentToUpdate = await Posts_Comments.findById(comm)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!commentToUpdate) {
            res.status(400).send("Comentário não encontrado com o id: " + req.params)
        } else {//Caso encontre o comentário, entra para as modificações
            //Validação de post
            const postToUpdate = await Posts.findById(commentToUpdate.post)
                .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
            if (!postToUpdate) {//Caso o id seja válido mas não exista vai cair aqui
                return res.status(400).send("Post não encontrado com o id: " + req.params)
            } else {
                if (postToUpdate.solved == true) {
                    return res.status(200).send("Post já solucionado por outro comentário")//Caso já esteja resolvido, envia uma requisição vazia
                }
            }

            if (commentToUpdate.solvedPost == true) {
                return res.status(204).send()//Caso já esteja resolvido, envia uma requisição vazia
            } else {
                //Soluciona o comentário
                commentToUpdate.solvedPost = true
                commentToUpdate.save()
                    .catch(err => res.status(400).json(err))
                //Soluciona o post
                postToUpdate.solved = true
                await postToUpdate.save()
                    .catch(err => res.status(400).json(err))

                if (user.ranking === NaN || user.ranking === undefined) {
                    value = 10
                }
                else {
                    value = user.ranking + 10
                }
                const result = await Users.findByIdAndUpdate(user, { ranking: value })
            }
            return res.status(201).send()
        }
    }

    return { index, getTotalComments, save, remove, like, solvePost }
}