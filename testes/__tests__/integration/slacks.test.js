const api = require('../../services/api')

//NOVO SLACK
describe('Slack_New', () =>{
    it('Novo slack e retornar status 204', async () =>{
        const response = await api.post(`/slacks`, {
            nome: nomeModal, tag: tagModal, senha: privadoModal ? senhaModal : ''//Garantir que seja enviado sem senha caso o switch esteja desativado mas tenha texto preenchido
        }, {
            headers: { user_id }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//DELETE SLACK
describe('Slack_Del', () =>{
    it('Deletar slack e retornar status 204', async () =>{
        const response = await api.delete(`/slacks/${slackParam._id}`, {
            headers: { user_id }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//LISTAR TODOS SLACK
describe('Slack_ListAll', () =>{
    it('Listar todas slacks e retornar status 204', async () =>{
        const response = await api.get(`/slacks`, {
            headers: { user_id, search_text: searchText },
            params: { page }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//LISTAR SLACKS E MENSAGENS
describe('Slack_List', () =>{
    it('Listar slack e mensagem e retornar status 204', async () =>{
        const response = await api.get(`/slacks/${slack._id}`,
        {
            headers: { user_id },
            params: { page }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//NOVA MENSAGEM
describe('Slack_NewMessage', () =>{
    it('Nova mensagem e retornar status 204', async () =>{
        const response = await api.post(`/slacks/${slack._id}`, {
            slack_msg: messageText,
        }, {
            headers: { user_id },
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});

//DELETAR MENSAGEM
describe('Slack_DelMessage', () =>{
    it('Delete mensagem e retornar status 204', async () =>{
        const response = await api.delete(`/slacks/${slack._id}/${slack_msg}`, {
            headers: { user_id }
        })

        //console.log(""); 
        expect(response.status).toBe(204);
    });
});