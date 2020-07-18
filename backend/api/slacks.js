var momentTz = require('moment-timezone');
const mongoose = require('mongoose');

const Users = require('../models/Users');
const Slacks = require('../models/Slacks');

module.exports = app => {
    const index = async(req, res) => {
        
    }
    const save = async(req, res) => {
        let { title } = req.body;
        const { user_id } = req.headers;
        title.trim()

        const user = await Users.findById(user_id);
        if (!user) {
            return res.status(401).send('Usuário inválido');
        }

        const valid = !title
        valid == false ? res.status(400).send('Algum campo não foi preenchido') : null
        const slack = await Slacks.create({
            title,
            postedIn: momentTz().tz("America/Sao_Paulo").format(),
            user: user_id,
        })
            .catch(err => res.status(400).json(err))
            if (user.ranking === NaN || user.ranking === undefined){
                value = 5
            }
            else{
                value = user.ranking + 5
            }
            const result = await Users.findByIdAndUpdate(user_id, { ranking: value })
        res.status(204).send()
    }
    const remove = async(req, res) => {
        const { user_id } = req.headers;
        const { slack } = req.params;

        const user = await Users.findById(user_id)

        const slackRemove = await Slacks.findById(slack)
            .catch(err => { return res.status(400).json(err) })//Caso o id seja inválido vai cair aqui
        
        if (!slackRemove) { return res.status(400).send("Slack não encontrado com o id: " + slack) }//Caso o id seja válido mas não exista vai cair aqui
        if (slackRemove.user == user_id) {//Se é o dono post deleta
            await Slacks.deleteOne(slackRemove)
            if (user.ranking === NaN || user.ranking === undefined){
                value = 0
            }
            else{
                value = user.ranking - 5
            }
            const result = await Users.findByIdAndUpdate(user_id, { ranking: value })
                .catch(err => { return res.status(400).json(err) })
            return res.status(204).send()
        } else {//Se não, não tem permissão
            return res.status(401).send(`Usuário ${user_id} não autorizado a deletar o post.`)
        }
    }
    const searchSlack = async(req, res) => {
        
    }

    return { index, save, remove, searchSlack }
}