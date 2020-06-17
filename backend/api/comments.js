var momentTz = require('moment-timezone');

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

    const index = async (req, res) => {
        const { post } = req.params;
        const postOri = await Posts.findById(post)
            .catch(err => res.status(400).json(err))
        if (!postOri) {
            return res.status(401).send('Post inválido');
        }
        const comments = await Posts_Comments.find({ post: postOri })
            .populate('user')
            .catch(err => res.status(400).json(err))
        return res.json(comments);
    }

    const save = async (req, res) => {
        //const { filename } = req.file;
        const { user, message } = req.body
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
        })
            .catch(err => res.status(400).json(err))
        res.status(204).send()

    }

    const remove = async (req, res) => {
        const { post, comm } = req.params
        const { user_id } = req.headers
        console.log(req.params)
        const commentToDelete = await Posts_Comments.findById(comm)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!commentToDelete) { res.status(400).send("Comentário não encontrado com o id: " + comm) }//Caso o id seja válido mas não exista vai cair aqui

        if (commentToDelete.post != post || commentToDelete.user == user_id) {//Se é o post certo e o dono do comentário deleta
            await Posts_Comments.deleteOne(commentToDelete)
                .catch(err => res.status(400).json(err))
            res.status(204).send()
        } else {//Se não, não tem permissão
            res.status(401).send(`Usuário ${user_id} não autorizado a deletar o post.`)
        }

    }

    const solvePost = async (req, res) => {
        const { user_id } = req.headers;
        const { comment } = req.params;

        const user = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }
        const commentToUpdate = await Posts_Comments.findById(comment)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!commentToUpdate) {
            res.status(400).send("Comentário não encontrado com o id: " + req.params)
        } else {//Caso encontre o comentário, entra para as modificações
            if (commentToUpdate.solvedPost == true) {
                res.status(204).send()//Caso já esteja resolvido, envia uma requisição vazia
            }
            commentToUpdate.solvedPost = true
            commentToUpdate.save()
                .catch(err => res.status(400).json(err))
            const postToUpdate = await Posts.findById(commentToUpdate.post)
                .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
            if (!postToUpdate) {//Caso o id seja válido mas não exista vai cair aqui
                res.status(400).send("Post não encontrado com o id: " + req.params)
            } else {
                if (postToUpdate.solved == true) {
                    res.status(204).send()//Caso já esteja resolvido, envia uma requisição vazia
                }
                else {
                    postToUpdate.solved = true
                    await postToUpdate.save()
                        .catch(err => res.status(400).json(err))

                    res.status(201).send()
                }
            }
        }
    }

    return { index, save, remove, solvePost }
}