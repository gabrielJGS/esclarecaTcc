var momentTz = require('moment-timezone');
const mongoose = require('mongoose');

const Users = require('../models/Users');
const Slacks = require('../models/Slacks');
const Slacks_Messages = require('../models/Slacks_Messages');

module.exports = app => {
    const index = async (req, res) => {
        const { user_id } = req.headers
        const { slack } = req.params;
        //Páginação
        const qtdLoad = 5
        const { page = 1 } = req.query;

        const userExiste = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))
        if (!userExiste) {
            return res.status(401).send('Usuário inválido');
        }

        const slackOri = await Slacks.findById(slack)
            .catch(err => res.status(400).json(err))
        if (!slackOri) {
            return res.status(401).send('Slack inválida');
        }
        const count = await Slacks_Messages.find({ slack }).countDocuments()
        res.header('X-Total-Count', count)

        const messages = await Slacks_Messages
            .aggregate([
                { $match: { slack: slackOri._id, user: { $nin: userExiste.blocked } } },
                { $sort: { postedIn: 1 } },
                {
                    '$lookup': {
                        'from': 'users',
                        'let': { 'user': '$user' },
                        'pipeline': [
                            {
                                '$match': {
                                    '$expr': { '$eq': ['$_id', '$$user'] }
                                }
                            },
                            { '$project': { 'name': 1, 'url': 1, '_id': 1 } }
                        ],
                        'as': "user"
                    }
                },
                { $unwind: '$user' },
                { $skip: (page - 1) * qtdLoad },
                { $limit: qtdLoad }
            ])
            .catch(err => res.status(400).json(err))

        return res.json(messages)
    }
    const save = async (req, res) => {
        const { user_id } = req.headers
        const { slack_msg } = req.body
        const { slack } = req.params

        const userExiste = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))
        if (!userExiste) {
            return res.status(401).send('Usuário inválido');
        }
        const slackOri = await Slacks.findById(slack)
            .catch(err => res.status(400).json(err))
        if (!slackOri) {
            return res.status(401).send('Slack inválida');
        }

        if (slack_msg.trim() === '') {
            return res.status(400).send('A mensagem não pode ser vazia');
        }

        const send = await Slacks_Messages.create({
            slack,
            user: user_id,
            postedIn: momentTz().tz("America/Sao_Paulo").format(),
            message: slack_msg
        })
            .catch(err => res.status(400).json(err))
        const result = await Users.findByIdAndUpdate(user_id, { ranking: userExiste.ranking + 3 })
        res.status(204).send()
    }
    const remove = async (req, res) => {
        const { user_id } = req.headers
        const { slack, slack_msg } = req.params

        const userExiste = await Users.findById(user_id)
            .catch(err => res.status(400).json(err))
        if (!userExiste) {
            return res.status(401).send('Usuário inválido');
        }
        const slackOri = await Slacks.findById(slack)
            .catch(err => res.status(400).json(err))
        if (!slackOri) {
            return res.status(401).send('Slack inválida');
        }

        const messageToRemove = await Slacks_Messages.findById(slack_msg)
            .catch(err => res.status(400).json(err))
        if (!messageToRemove) {
            res.status(400).send("Mensagem não encontrada com o id: " + slack_msg)
        }

        if (messageToRemove.slack == slack && (messageToRemove.user == user_id || slackOri.user == user_id)) {
            await Slacks_Messages.remove(messageToRemove)
                .catch(err => res.status(400).json(err))

            const result = await Users.findByIdAndUpdate(user_id, { ranking: userExiste.ranking - 3 })
            res.status(204).send()
        }
        else {//Se não, não tem permissão
            res.status(401).send(`Usuário ${user_id} não autorizado a deletar o comentário.`)
        }
    }

    return { index, save, remove }
}