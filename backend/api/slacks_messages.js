var momentTz = require('moment-timezone');
const mongoose = require('mongoose');

const Users = require('../models/Users');
const Slacks = require('../models/Slacks');
const Slacks_Messages = require('../models/Slacks_Messages');

module.exports = app => {
    const index = async(req, res) => {
        const { user } = req.headers
        const { slack } = req.params;
        //Páginação
        const qtdLoad = 5
        const { page = 1 } = req.query;

        const userExiste = await Users.findById(user);
        if (!userExiste) {
            return res.status(401).send('Usuário inválido');
        }

        const slackOri = await Slacks.findById(slack)
            .catch(err => res.status(400).json(err))
        if (!slackOri) {
            return res.status(401).send('Slack inválida');
        }

        const messages = await Slacks_Messages
            .aggregate([
                { $match: { slacks: slackOri._id } },
                { $sort: { postedIn: -1 } },
                { $skip: (page - 1) * qtdLoad },
                { $limit: qtdLoad },
                { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } }
            ])
            .catch(err => res.status(400).json(err))

        return res.json(messages)
    }
    const save = async(req, res) => {
        const { user } = req.headers
        const { message } = req.body
        const { slack } = req.params

        const userExiste = await Users.findById(user);
        if (!userExiste) {
            return res.status(401).send('Usuário inválido');
        }
        if (!slack || !message) {
            return res.status(400).send('Algum campo não foi preenchido');
        }

        const send = await Slacks_Messages.create({
            slack,
            user,
            postedIn: momentTz().tz("America/Sao_Paulo").format(),
            message
        })
            .catch(err => res.status(400).json(err))
            if (userExiste.ranking === NaN || userExiste.ranking === undefined){
                value = 3
            }
            else{
                value = userExiste.ranking + 3
            }
            const result = await Users.findByIdAndUpdate(user, { ranking: value })
        res.status(204).send()
    }
    const remove = async(req, res) => {
        const { user } = req.headers
        const { slack, comm } = req.params

        const userExiste = await Users.findById(user);

        if (!userExiste) {
            return res.status(401).send('Usuário inválido');
        }

        const messageToRemove = await Slacks_Messages.findById(comm)
            .catch(err => res.status(400).json(err))
        if(!messageToRemove){
            res.status(400).send("Mensagem não encontrada com o id: " + comm)
        }

        if (messageToRemove.slacks._id == slack || messageToRemove.user._id == user) {
            await Slacks_Messages.remove(messageToRemove)
                .catch(err => res.status(400).json(err))
            
            if (userExiste.ranking === NaN || userExiste.ranking === undefined){
                value = 0
            }
            else{
                value = userExiste.ranking - 3
            }
            const result = await userExistes.findByIdAndUpdate(user, { ranking: value })
            res.status(204).send()
        } 
        else {//Se não, não tem permissão
            res.status(401).send(`Usuário ${user} não autorizado a deletar o comentário.`)
        }
    }

    return { index, save, remove }
}