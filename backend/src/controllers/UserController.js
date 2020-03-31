const connection = require('../database/connection')

module.exports = {
    async register(request, response) {
        const { nome, tags } = request.body;
        var {email, senha} = request.body;
        //Validações anti usuário
        email = email.trim().toLowerCase()
        senha = senha.trim().toLowerCase()

        //Testa se algum campo obrigatório não foi preenchido
        if (!email || !senha || !nome) {
            return response.status(400).json({ error: 'Algum campo não foi preenchido' })
        }
        //Testa se o usuário não existe antes do insert
        const exists = await connection('users').where('email', email).andWhere('senha', senha).select('*').first();
        if (exists) {
            return response.status(400).json({error: 'Usuário já existe'})
        }

        const [id] = await connection('users').insert({
            email, senha, nome
        })
        //Se o usuário foi inserido com sucesso, insere as tags
        if (id) {
            user_id = id
            tagsArray = tags.split(',')
            // TODO: não permitir inserir tags repetidas//Busca as tags que já existem previamente
            // const tagsExistentes = await connection('tags').whereIn('tag',tagsArray).select('id');
            // console.log(tagsExistentes)


            //Itera o mapa de tags recebido para inserir o id do usuário
            const tagsUser = tagsArray.map(t => ({ tag: t.trim(), user_id }))
            await connection('users_tags').insert(tagsUser)
        }
        return response.json({ id })
    },
    async login(request, response) {
        var { email, senha } = request.body;
        //Validações anti usuário
        email = email.trim().toLowerCase()
        senha = senha.trim().toLowerCase()
        const profile = await connection('users').where('email', email).andWhere('senha', senha).select('*').first();

        if (!profile) {
            return response.status(400).json({ error: 'Email ou senha inválido' })
        }
        return response.json(profile)
    }
}