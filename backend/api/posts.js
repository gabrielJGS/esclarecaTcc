const Users = require('../models/Users');
const Posts = require('../models/Posts');

module.exports = app => {
    const getOne = async (req, res) => {
        const { post } = req.params;
        const resPost = await Posts.findById(post)
            .catch(err => res.status(400).json(err))
        if (!resPost) {
            return res.status(400).send('Post não encontrado')
        }
        await resPost.populate('likes').populate('user').execPopulate()
        return res.json(resPost);
    }

    const index = async (req, res) => {
        const { user_id } = req.headers;
        const user = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }
        const posts = await Posts.find({ tags: { $in: user.tags } })
            .populate('user')
            .populate('likes')
            .catch(err => res.status(400).json(err))
        //console.log( await Posts.find({ }))
        //await posts[0].populate('posts').populate('user').execPopulate()
        return res.json(posts);
    }

    const save = async (req, res) => {
        //const { filename } = req.file;
        let { title, desc, tags } = req.body;
        const { user_id, type } = req.headers;
        title.trim()
        desc.trim()
        tags.trim()

        const user = await Users.findById(user_id);
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }
        if (!title || !desc || !tags || typeof (type) !== "boolean") {
            return res.status(400).send('Algum campo não foi preenchido');
        }
        const post = await Posts.create({
            title,
            desc,
            tags: tags.split(',').map(tag => tag.trim()),
            type,
            closed: false,
            user: user_id,
        })
            .catch(err => res.status(400).json(err))
        res.status(204).send()

    }

    const remove = async (req, res) => {
        const { user_id } = req.headers;
        const { post } = req.params;
        const postToBeRemoved = await Posts.findById(req.params)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!postToBeRemoved) { res.status(400).send("Post não encontrado com o id: " + req.params) }//Caso o id seja válido mas não exista vai cair aqui

        if (postToBeRemoved.user == user_id) {//Se é o dono post deleta
            await Posts.deleteOne(post)
                .catch(err => res.status(400).json(err))
            res.status(204).send()
        } else {//Se não, não tem permissão
            res.status(401).send(`Usuário ${user_id} não autorizado a deletar o post.`)
        }

    }

    const like = async (req, res) => {
        const { user_id } = req.headers;
        const { post } = req.params;

        const user = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }
        const postToUpdate = await Posts.findById(post)
            .catch(err => res.status(400).json(err))//Caso o id seja inválido vai cair aqui
        if (!postToUpdate) {//Caso o id seja válido mas não exista vai cair aqui
            res.status(400).send("Post não encontrado com o id: " + req.params)
        } else {
            if (postToUpdate.likes.find(u => u == user_id)) {
                res.status(204).send()
            }
            else {
                postToUpdate.likes.push(user.id)
                await postToUpdate.save()
                    .catch(err => res.status(400).json(err))

                res.status(201).send()
            }
        }

    }

    return { index, save, remove, getOne, like }
}