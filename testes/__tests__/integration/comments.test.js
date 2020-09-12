const api = require('../../services/api')

//NOVO COMENTÁRIO
describe('Comen_New', () =>{
    it('Novo comentário e retornar status 204', async () =>{
        const response = await api.post(`/posts/${post._id}`, {
            message: commentText,
        }, {
            headers: { user: user_id },
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//LISTAR COMENTÁRIOS
describe('Comen_List', () =>{
    it('Listar comentário e retornar status 204', async () =>{
        const response = await api.get(`/posts/${post._id}`,
        {
            headers: { user_id },
            params: { page }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//CURTIR COMENTÁRIO
describe('Comen_Like', () =>{
    it('Curtir comentário e retornar status 204', async () =>{
        const response = await api.post(`/posts/${post._id}/${commId}/like`, {
        }, {
            headers: { user_id }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//DELETAR COMENTÁRIO
describe('Comen_Del', () =>{
    it('Deletar comentário e retornar status 204', async () =>{
        const response = await api.delete(`/posts/${post._id}/${commId}`, {
            headers: { user_id }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});