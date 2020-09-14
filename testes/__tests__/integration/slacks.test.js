const api = require('../../services/api')

//NOVO SLACK
describe('Slack_New', () =>{
    //Criar slack válido
    it('Novo slack válido e retornar status 204', async () =>{
        await api.post(`/slacks`, {
            nome: "Jest", tag: "NodeJS", senha: ''//Garantir que seja enviado sem senha caso o switch esteja desativado mas tenha texto preenchido
        }, {
            headers: { user_id: "5f5c15a0ed84b700175530c5" }
        }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });
    
    //Criar slack inválido por possuir campos em branco
    it('Novo slack inválido por possuir campos em branco e retornar status 400', async () =>{
        await api.post(`/slacks`, {
            nome: "", tag: "NodeJS", senha: ''//Garantir que seja enviado sem senha caso o switch esteja desativado mas tenha texto preenchido
        }, {
            headers: { user_id: "5f5c15a0ed84b700175530c5" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Criar slack inválido por possuir id usuário inválido
    it('Novo slack inválido por possuir id usuário inválido e retornar status 400', async () =>{
        await api.post(`/slacks`, {
            nome: "Jest", tag: "NodeJS", senha: ''//Garantir que seja enviado sem senha caso o switch esteja desativado mas tenha texto preenchido
        }, {
            headers: { user_id: "1abc" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});

//DELETE SLACK
describe('Slack_Del', () =>{
    
    //Deletar slack inválido por possuir id slack inexistente
    it('Deletar slack inválido por possuir id slack inexistente e retornar status 400', async () =>{
        await api.delete(`/slacks/1abc`, {
            headers: { user_id: "5f35e2e48973d417809ddb70"}
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Deletar slack inválido por possuir id usuario inexistente
    it('Deletar slack inválido por possuir id usuario inexistente e retornar status 400', async () =>{
        await api.delete(`/slacks/5f45a55ad06a0111ec49ef7a`, {
            headers: { user_id: "1abc"}
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Deletar slack inválido por possuir id usuario ser diferente do cadastrado no slack
    it('Deletar slack inválido por possuir id usuario inexistente e retornar status 401', async () =>{
        await api.delete(`/slacks/5f45a55ad06a0111ec49ef7a`, {
            headers: { user_id: "5f0ce694a8119330ecc59fa9"}
        }).then(response =>{
            expect(response.status).toBe(401);
        }).catch(error =>{
            expect(error.response.status).toBe(401);
        });
    });

    //Deletar slack válido
    it('Deletar slack válido e retornar status 204', async () =>{
        await api.delete(`/slacks/5f5e14b89ac46218e0fe8586`, {
            headers: { user_id: "5f5c15a0ed84b700175530c5"}
        }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });
});

//LISTAR TODOS SLACK
describe('Slack_ListAll', () =>{
    //Listar slacks válido
    it('Listar todas slacks válido e retornar status 200', async () =>{
        await api.get(`/slacks`, {
            headers: { user_id:"5f35e2e48973d417809ddb70", search_text: "" },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Listar slacks válido pesquisa
    it('Listar todas slacks válido pesquisa texto e retornar status 200', async () =>{
        await api.get(`/slacks`, {
            headers: { user_id:"5f35e2e48973d417809ddb70", search_text: "Jest" },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Listar slacks inválido por id ser inválido
    it('Listar todas slacks inválido por id ser inválido e retornar status 400', async () =>{
        await api.get(`/slacks`, {
            headers: { user_id: "1abc", search_text: "" },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Listar slacks inválido por id falta de parâmetro
    it('Listar todas slacks inválido por falta de parâmetro e retornar status 401', async () =>{
        await api.get(`/slacks`, {
            headers: { search_text: "" },
        }).then(response =>{
            expect(response.status).toBe(401);
        }).catch(error =>{
            expect(error.response.status).toBe(401);
        });
    });
});

//LISTAR SLACKS E MENSAGENS
describe('Slack_List', () =>{
    //Listar slack válido 
    it('Listar slack válido e mensagem e retornar status 200', async () =>{
        await api.get(`/slacks/5f402d44489b622b3c506b55`,
        {
            headers: { user_id:"5f35e2e48973d417809ddb70" },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Listar slack inválido por id slack ser inexistente
    it('Listar slack inválido id slack ser inexistente e mensagem e retornar status 400', async () =>{
        await api.get(`/slacks/1abc`,
        {
            headers: { user_id:"5f35e2e48973d417809ddb70" },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Listar slack inválido por id user ser inexistente
    it('Listar slack inválido id user ser inexistente e mensagem e retornar status 400', async () =>{
        await api.get(`/slacks/5f402d44489b622b3c506b55`,
        {
            headers: { user_id:"1abc" },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});

//NOVA MENSAGEM
describe('Slack_NewMessage', () =>{
    //Nova mensagem Válido
    it('Nova mensagem válido e retornar status 204', async () =>{
        await api.post(`/slacks/5f402d44489b622b3c506b55`, {
            slack_msg: "oi",
        }, {
            headers: { user_id:"5f35e2e48973d417809ddb70" },
        }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });

    //Nova mensagem inválido por id slack ser inexistente
    it('Nova mensagem inválido por id slack ser inexistente e retornar status 400', async () =>{
        await api.post(`/slacks/1abc`, {
            slack_msg: "oi",
        }, {
            headers: { user_id:"5f35e2e48973d417809ddb70" },
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Nova mensagem inválido por id user ser inexistente
    it('Nova mensagem inválido por id user ser inexistente e retornar status 400', async () =>{
        await api.post(`/slacks/5f402d44489b622b3c506b55`, {
            slack_msg: "oi",
        }, {
            headers: { user_id: "1abc" },
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Nova mensagem inválido por mensagem vazia
    it('Nova mensagem inválido por por mensagem vazia e retornar status 400', async () =>{
        await api.post(`/slacks/5f402d44489b622b3c506b55`, {
            slack_msg: "",
        }, {
            headers: { user_id:"5f35e2e48973d417809ddb70" },
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Nova mensagem inválido por falta de parametro
    it('Nova mensagem inválido por falta de parametro e retornar status 401', async () =>{
        await api.post(`/slacks/5f402d44489b622b3c506b55`, {}, {}).then(response =>{
            expect(response.status).toBe(401);
        }).catch(error =>{
            expect(error.response.status).toBe(401);
        });
    });
});

//DELETAR MENSAGEM
describe('Slack_DelMessage', () =>{
    //Deletar mensagem inválido por id slack inexistente
    it('Delete mensagem inválido por id slack inexistente e retornar status 400', async () =>{
        await api.delete(`/slacks/1abc/5f46f05e42988f06b0eb680c`, {
            headers: { user_id:"5f35e2e48973d417809ddb70" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Deletar mensagem inválido por id mensagem inexistente
    it('Delete mensagem inválido por id mensagem inexistente e retornar status 401', async () =>{
        await api.delete(`/slacks/5f4706b3ebe82f1f9cd86a08/1abc`, {
            headers: { user_id:"5f35e2e48973d417809ddb70" }
        }).then(response =>{
            expect(response.status).toBe(401);
        }).catch(error =>{
            expect(error.response.status).toBe(401);
        });
    });

    //Deletar mensagem inválido por id usuário inexistente
    it('Delete mensagem inválido por id usuário inexistente e retornar status 400', async () =>{
        await api.delete(`/slacks/5f4706b3ebe82f1f9cd86a08/5f46f05e42988f06b0eb680c`, {
            headers: { user_id:"1abc" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Deletar mensagem inválido por id usuário ser diferente do cadastrado na mensagem
    it('Delete mensagem inválido por id usuário ser diferente do cadastrado na mensagem e retornar status 401', async () =>{
        await api.delete(`/slacks/5f4706b3ebe82f1f9cd86a08/5f46f05e42988f06b0eb680c`, {
            headers: { user_id:"5f5c15a0ed84b700175530c5" }
        }).then(response =>{
            expect(response.status).toBe(401);
        }).catch(error =>{
            expect(error.response.status).toBe(401);
        });
    });

    //Deletar mensagem válido
    it('Delete mensagem válido e retornar status 204', async () =>{
        await api.delete(`/slacks/5f402d44489b622b3c506b55/5f5e14b99ac46218e0fe8588`, {
            headers: { user_id:"5f35e2e48973d417809ddb70" }
        }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });
});