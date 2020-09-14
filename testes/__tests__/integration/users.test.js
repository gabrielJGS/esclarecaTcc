const api = require('../../services/api')

//ATUALIZAR USUÁRIO
describe('Users_Put', () =>{
    //Atualizar válido
    it('Atualizar usuário válido e retornar status 204', async () =>{
        await api.put('users/5f5c15a0ed84b700175530c5', {
            name: "Reidner",
            email: "jest@gmail.com",
            tags: "vba,node",
            password:"123"
        }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });

    //Atualizar inválido (Campo faltando)
    it('Atualizar usuário inválido por falta de dado ou dado inválido e retornar status 500', async () =>{
        await api.put('users/5f5c15a0ed84b700175530c5', {
            name: "Reidner",
            email: "jest@gmail.com",
            tags: "vba,node",
        }).then(response =>{
            expect(response.status).toBe(500);
        }).catch(error =>{
            expect(error.response.status).toBe(500);
        });
    });

    //Atualizar inválido (ID inválido)
    it('Atualizar usuário inválido por id inexistente e retornar status 500', async () =>{
        await api.put('users/1abcd', {
            name: "Reidner",
            email: "jest@gmail.com",
            tags: "vba,node",
        }).then(response =>{
            expect(response.status).toBe(500);
        }).catch(error =>{
            expect(error.response.status).toBe(500);
        });
    });
});

//LISTAR USUÁRIO
describe('Users_List', () =>{
    //Listar usuário válido
    it('Listar usuário válido e retornar status 200', async () =>{
        await api.get('/users/5f5c15a0ed84b700175530c5', {}).then(response =>{
            expect(response.status).toBe(200);
        });
    });

    //Listar usuário inválido (id inexistente)
    it('Listar usuário inválido por id inexistente e retornar status 400', async () =>{
        await api.get('/users/1abcd', {}).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});

//LISTAR RANKING
describe('Users_Ranking', () =>{
    //Ranking Válido
    it('Listar ranking e retornar status 200', async () =>{
        await api.get('/ranking', {}).then(response =>{
            expect(response.status).toBe(200);
        })
    });
});

//LISTAR TODOS
describe('Users_All', () =>{
    //Listar Todos Válido
    it('Listar todos usuários e retornar status 200', async () =>{
        await api.get(`/users`, {
            headers: { search_text: "" },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        })
    });

    //Listar Todos Válido com pesquisa
    it('Listar todos usuários e retornar status 200', async () =>{
        await api.get(`/users`, {
            headers: { search_text: "Reidner" },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        })
    });
});

//LISTAR Bloqueados
describe('Users_ListBlocks', () =>{
    //Listar usuários bloqueados
    it('Listar bloqueados válido e retornar status 200', async () =>{
        await api.get(`/users/5f5c15a0ed84b700175530c5`, {}).then(response =>{
            expect(response.status).toBe(200);
        })
    });

    //Listar usuários bloqueados inválido por falta de id existente
    it('Listar bloqueados inválido por ID inexistente e retornar status 400', async () =>{
        await api.get(`/users/1abc`, {}).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});

//Bloquear usuário
describe('Users_Blocks', () =>{
    //Bloquear usuário Válido
    it('Bloquear usuário válido e retornar status 204', async () =>{
        await api.post(`/users/5f0ce694a8119330ecc59fa9/block`, {}, 
        { headers: { user_id: "5f5c15a0ed84b700175530c5" } }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });

    //Desbloquear usuário Válido
    it('Desbloquear usuário válido e retornar status 201', async () =>{
        await api.post(`/users/5f0ce694a8119330ecc59fa9/block`, {}, 
        { headers: { user_id: "5f5c15a0ed84b700175530c5" } }).then(response =>{
            expect(response.status).toBe(201);
        }).catch(error =>{
            expect(error.response.status).toBe(201);
        });
    });

    //Bloquear usuário inválido por ser o mesmo Usuário atual
    it('Bloquear usuário inválido por ser o mesmo usuário atual e retornar status 400', async () =>{
        await api.post(`/users/5f0ce694a8119330ecc59fa9/block`, {}, 
        { headers: { user_id: "5f0ce694a8119330ecc59fa9" } }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Bloquear usuário inválido por id a ser bloqueado inexistente
    it('Bloquear usuário inválido por id a ser bloqueado ser inexistente e retornar status 400', async () =>{
        await api.post(`/users/1abc/block`, {}, 
        { headers: { user_id: "5f5c15a0ed84b700175530c5" } }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Bloquear usuário inválido por ser o mesmo Usuário atual
    it('Bloquear usuário inválido por id ser user atual ser inexistente e retornar status 400', async () =>{
        await api.post(`/users/5f5c15a0ed84b700175530c5/block`, {}, 
        { headers: { user_id: "1abc" } }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});
