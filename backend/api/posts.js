var momentTz = require('moment-timezone');
const mongoose = require('mongoose');

const Users = require('../models/Users');
const Posts = require('../models/Posts');

module.exports = app => {
    const getOne = async (req, res) => {
        const { post } = req.params
        const { user_id } = req.headers

        const user = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }

        const posts = await Posts
            .aggregate([
                { $match: { _id: mongoose.Types.ObjectId(post) } },
                { $sort: { postedIn: -1 } },
                {
                    "$addFields": {
                        "didILiked": {
                            "$in": [mongoose.Types.ObjectId(user._id), "$likes"]
                        }
                    }
                },
                { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
                { $lookup: { from: 'users', localField: 'likes', foreignField: '_id', as: 'likes' } },
            ])
            .catch(err => res.status(400).json(err))

        return res.json(posts)
    }
    const getByUser = async (req, res) => {
        const { id } = req.params;
        const { type } = req.headers;
        if (id == undefined) {
            return res.status(401).send('Usuário inválido');
        }
        const typeSearch = type == 'false' ? false : true
        //Páginação
        const qtdLoad = 5
        const { page = 1 } = req.query

        const user = await Users.findById(id)
            .catch(err => res.status(400).json(err))
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }

        const count = await Posts.find({ user: user._id, type: typeSearch }).countDocuments()
        res.header('X-Total-Count', count)

        const posts = await Posts
            .aggregate([
                { $match: { user: user._id, type: typeSearch } },
                { $sort: { postedIn: -1 } },
                {
                    $lookup: {
                        from: 'posts_comments',
                        let: { postId: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$$postId", "$post"] } } },
                            { $count: "count" }
                        ],
                        as: 'commentsCount'
                    }
                },
                {
                    "$addFields": {
                        "didILiked": {
                            "$in": [mongoose.Types.ObjectId(user._id), "$likes"]
                        },
                        "commentsCount": { "$ifNull": [{ "$arrayElemAt": ["$commentsCount.count", 0] }, 0] }
                    }
                },
                { $skip: (page - 1) * qtdLoad },
                { $limit: qtdLoad },
                { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
                { $lookup: { from: 'users', localField: 'likes', foreignField: '_id', as: 'likes' } },
            ])
            .catch(err => res.status(400).json(err))

        return res.json(posts)
    }

    const getLikesByUser = async (req, res) => {
        const { id } = req.params;
        const { type } = req.headers;
        const typeSearch = type == 'false' ? false : true

        //Páginação
        const qtdLoad = 5
        const { page = 1 } = req.query

        const user = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }

        const posts = await Posts
            .aggregate([
                { $match: { likes: { $in: id }, type: typeSearch } },
                { $sort: { postedIn: -1 } },
                {
                    $lookup: {
                        from: 'posts_comments',
                        let: { postId: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$$postId", "$post"] } } },
                            { $count: "count" }
                        ],
                        as: 'commentsCount'
                    }
                },
                {
                    "$addFields": {
                        "didILiked": {
                            "$in": [mongoose.Types.ObjectId(id), "$likes"]
                        },
                        "commentsCount": { "$ifNull": [{ "$arrayElemAt": ["$commentsCount.count", 0] }, 0] }
                    }
                },
                { $skip: (page - 1) * qtdLoad },
                { $limit: qtdLoad },
                { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
                { $lookup: { from: 'users', localField: 'likes', foreignField: '_id', as: 'likes' } },
            ])
            .catch(err => res.status(400).json(err))

        return res.json(posts)
    }

    const searchPost = async (req, res) => {
        //const { user_id } = req.headers
        const { searchText } = req.body
        //const resPost = await Posts.find({ "desc": /.*searchText.*/ })//{'name': {'$regex': 'sometext'}}
        const resPost = await Posts.find({ 'desc': { '$regex': searchText } })
            .populate('user')
            .populate('likes')
            .catch(err => res.status(400).json(err))
        if (!resPost) {
            return res.status(400).send('Nenhum post encontrado com o texto informado')
        }
        return res.json(resPost);
    }
    const getTotalPosts = async (req, res) => {
        const { user_id, type, search_text } = req.headers;
        const typeSearch = type == 'false' ? false : true
        const user = await Users.findById(user_id)
            .catch(err => res.status(400).send(err))
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }
        const count = await Posts.find({ tags: { $in: search_text != "" ? search_text.split(',') : user.tags }, type: typeSearch }).countDocuments()
        res.header('X-Total-Count', count)
        return res.json(count)
        // return res.json(count)
    }

    const index = async (req, res) => {
        const { user_id, type, search_text } = req.headers;
        const typeSearch = type == 'false' ? false : true

        //Páginação
        const qtdLoad = 5
        const { page = 1 } = req.query

        const user = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }
        const posts = await Posts
            .aggregate([
                { $match: { tags: { $in: search_text != "" ? search_text.split(',') : user.tags }, type: typeSearch } },
                { $sort: { postedIn: -1 } },
                {
                    $lookup: {
                        from: 'posts_comments',
                        let: { postId: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$$postId", "$post"] } } },
                            { $count: "count" }
                        ],
                        as: 'commentsCount'
                    }
                },
                {
                    "$addFields": {
                        "didILiked": {
                            "$in": [mongoose.Types.ObjectId(user_id), "$likes"]
                        },
                        "commentsCount": { "$ifNull": [{ "$arrayElemAt": ["$commentsCount.count", 0] }, 0] }
                    }
                },
                { $skip: (page - 1) * qtdLoad },
                { $limit: qtdLoad },
                { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
                { $lookup: { from: 'users', localField: 'likes', foreignField: '_id', as: 'likes' } },
            ])
            .catch(err => res.status(400).json(err))

        return res.json(posts)
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
        const valid = !title || !desc || !tags || (type != true || type != false)
        valid == false ? res.status(400).send('Algum campo não foi preenchido') : null
        const post = await Posts.create({
            title,
            desc,
            postedIn: momentTz().tz("America/Sao_Paulo").format(),
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
        const postToBeRemoved = await Posts.findById(post)
            .catch(err => { return res.status(400).json(err) })//Caso o id seja inválido vai cair aqui
        if (!postToBeRemoved) { return res.status(400).send("Post não encontrado com o id: " + post) }//Caso o id seja válido mas não exista vai cair aqui
        if (postToBeRemoved.user == user_id) {//Se é o dono post deleta
            await Posts.deleteOne(postToBeRemoved)
                .catch(err => { return res.status(400).json(err) })
            return res.status(204).send()
        } else {//Se não, não tem permissão
            return res.status(401).send(`Usuário ${user_id} não autorizado a deletar o post.`)
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
            if (postToUpdate.likes.find(u => u == user_id)) {//Descurtindo
                const index = postToUpdate.likes.indexOf(user_id);
                if (index > -1) {
                    postToUpdate.likes.splice(index, 1);
                }
                await postToUpdate.save()
                    .catch(err => res.status(400).json(err))
                res.status(201).send()
            }
            else {//Curtindo
                postToUpdate.likes.push(user.id)
                await postToUpdate.save()
                    .catch(err => res.status(400).json(err))

                res.status(201).send()
            }
        }
    }

    return { index, save, remove, getOne, getTotalPosts, like, getByUser, getLikesByUser, searchPost }
}