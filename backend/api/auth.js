const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const Users = require('../models/Users');

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Dados incompletos')
        }
        const email = req.body.email.trim().toLowerCase()
        const password = req.body.password.trim().toLowerCase()
        const user = await Users.findOne({ email })
        // const user = await app.db('users')
        //     .whereRaw("LOWER(email) = LOWER(?)", req.body.email)
        //     .first()
        if (user) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    res.status(401).send('A senha informada é inválida!')
                    return//Forçando a saída, caso a senha seja inválida
                }
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }

                res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authSecret),
                })
            })
        } else {
            res.status(400).send('Email não encontrado')
        }
    }
    return { signin }
}