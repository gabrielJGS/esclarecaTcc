const bcrypt = require('bcrypt-nodejs')
const Users = require('../models/Users');

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = async (req, res) => {
        const email = req.body.email.trim().toLowerCase()
        const tags = req.body.tags.trim().toLowerCase()

        const userExist = await Users.findOne({ email })
        if (userExist) {
            res.status(400).json(`${email} já foi cadastrado\nEsqueceu sua senha?`)
        } else {
            obterHash(req.body.password.trim().toLowerCase(), hash => {
                const user = Users.create({ name: req.body.name, email, password: hash, tags: tags.split(',').map(tag => tag.trim()) })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(400).json(err))
            })
        }
    }
    const update = (req, res) => {
        const { id } = req.params;

        const email = req.body.email.trim().toLowerCase()
        const tags = req.body.tags.trim().toLowerCase()

        obterHash(req.body.password.trim().toLowerCase(), hash => {
            const password = hash

            user = Users.findByIdAndUpdate(id, { name: req.body.name, email, password: hash, tags: tags.split(',').map(tag => tag.trim()) })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }
    const patch = (req, res) => {
        const { id } = req.params;
        const tags = req.body.tags.trim().toLowerCase()

        user = Users.findByIdAndUpdate(id, { tags: tags.split(',').map(tag => tag.trim()) })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))

    }

    const profile = async (req, res) => {
        const { id } = req.params;
        const user = await Users.findById(id)
            .catch(err => res.status(400).json(err))
        res.json(user)
    }
    return { save, update, patch, profile }
};