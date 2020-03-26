const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        const { titulo, descricao, tags } = request.body;
        const { user_id } = request.headers;

        //Testa se algum campo obrigatório não foi preenchido
        if (!user_id) {
            return response.status(400).json({ error: 'Login inválido' })
        }
        //Testa se algum campo obrigatório não foi preenchido
        if (!titulo || !descricao || !tags) {
            return response.status(400).json({ error: 'Algum campo não foi preenchido' })
        }

        const [id] = await connection('posts').insert({
            titulo, descricao, user_id
        })
        //Se o usuário foi inserido com sucesso, insere as tags
        if (id) {
            tagsArray = tags.split(',');
            post_id = id

            //Itera o mapa de tags recebido para inserir o id do usuário
            const tagsUser = tagsArray.map(t => ({ tag: t.trim(), post_id }))
            await connection('posts_tags').insert(tagsUser)
        }
        return response.json({ id })
    },
    async index(request, response) {
        const { user_id } = request.headers;

        //Testa se algum campo obrigatório não foi preenchido
        if (!user_id) {
            return response.status(400).json({ error: 'Login inválido' })
        }
        //Recupera as tags do usuário e depois separa em uma string para usar no IN no select
        const tag = await connection('users_tags').where('user_id', user_id).select('tag')
        var tags = []
        tag.forEach(t => {
            //tags+=t.tag+", "
            tags.push(t.tag)
        });
        //tags = tags.substring(0, tags.length - 2)
        const teste = ['C#', 'visual studio']
        //Recupera os posts
        //select * from posts_tags where tag in ('c#', 'visual studio')
        console.log(tags)
        const posts_tags = await connection('posts_tags').whereIn('tag', teste).select('*');
        
        console.log(posts_tags)
    }
}