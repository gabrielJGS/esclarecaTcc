const connection = require('../database/connection')

module.exports = {
    async register(request, response){
        const { email, senha, nome, tags} = request.body;
        
        //Testa se algum campo obrigatório não foi preenchido
        if(!email||!senha||!nome){
            return response.status(400).json({error: 'Algum campo não foi preenchido'})
        }
        //Testa se o usuário não existe antes do insert
        const exists = await connection('users').where('email',email).andWhere('senha',senha).select('*').first();
        if(exists){
            //return response.status(400).json({error: 'Usuário já existe'})
        }

        const [id] = await connection('users').insert({
            email, senha, nome
        })
        //Se o usuário foi inserido com sucesso, insere as tags
        if(id){
            tagsArray = tags.split(',');
            user_id = id

            //Itera o mapa de tags recebido para inserir o id do usuário
            const tagsUser = tagsArray.map(t=>({tag:  t.trim(), user_id}))
            await connection('users_tags').insert(tagsUser)
        }
        return response.json({id})
    },
    async login(request, response){
        const {email, senha} = request.body;

        const profile = await connection('users').where('email',email).andWhere('senha',senha).select('*').first();

        if(!profile){
            return response.status(400).json({error: 'Email ou senha inválido'})
        }
        const id = profile['id']

        return response.json({id})
    }
}