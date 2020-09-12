const api = require('../../services/api')

//NOVO POST
describe('POST_New', () =>{
    it('Novo POST e retornar status 204', async () =>{
        const response = await api.post(`/posts`, {
            title, desc, tags
          }, {
            headers: { user_id, type }
          })    

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//LIST POST
describe('POST_ListAll', () =>{
    it('Listar todos POSTs e retornar status 204', async () =>{
        const response = await api.get('/posts', {
            headers: { user_id, type, search_text: searchText, search_type: searchType },
            params: { page }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//CURTIR POST
describe('POST_LIKE', () =>{
    it('Curtir POST e retornar status 204', async () =>{
        const response = await api.post(`/posts/${postId}/like`, {
        }, {
            headers: { user_id }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//LISTAR POST
describe('POST_LIST', () =>{
    it('LISTAR POST e retornar status 204', async () =>{
        const response = await api.get(`/post/${post._id}`, {
            headers: { user_id }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//DELETE POST
describe('POST_DELETE', () =>{
    it('DELETAR POST e retornar status 204', async () =>{
        const response = await api.delete(`/posts/${post._id}`, {
            headers: { user_id }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//ESCLARECER POST
describe('POST_RESOLVE', () =>{
    it('ESCLARECER POST e retornar status 204', async () =>{
        const response = await api.post(`/posts/${post._id}/${commId}/solve`, {}, {
            headers: { user_id }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});