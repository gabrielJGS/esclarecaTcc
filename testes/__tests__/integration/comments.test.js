const api = require('../../services/api')

//NOVO COMENTÁRIO
describe('Comen_New', () =>{
    //Novo comentário válido
    it('Novo comentário válido e retornar status 204', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66`, {
            message: "Jest",
        }, {
            headers: { user: "5f0ce694a8119330ecc59fa9" },
        }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });

    //Novo comentário inválido id usuário inválido
    it('Novo comentário inválido id usuário inválido e retornar status 400', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66`, {
            message: "Jest",
        }, {
            headers: { user: "1abc" },
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Novo comentário inválido id post inválido
    it('Novo comentário inválido id post inválido e retornar status 400', async () =>{
        await api.post(`/posts/1abc`, {
            message: "Jest",
        }, {
            headers: { user: "5f0ce694a8119330ecc59fa9" },
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Novo comentário inválido campos inválidos
    it('Novo comentário inválido campos inválidos e retornar status 400', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66`, {
        }, {
            headers: { user: "5f0ce694a8119330ecc59fa9" },
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});

//LISTAR COMENTÁRIOS
describe('Comen_List', () =>{
    //Listar comentários válido
    it('Listar comentário válido e retornar status 200', async () =>{
        await api.get(`/posts/5f0ce863b9da0415546e3d66`,
        {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Listar comentários inválido id post inválido
    it('Listar comentário inválido id post inválido e retornar status 400', async () =>{
        await api.get(`/posts/1abc`,
        {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Listar comentários inválido id user
    it('Listar comentário inválido id user inválido e retornar status 400', async () =>{
        await api.get(`/posts/5f0ce863b9da0415546e3d66`,
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

//CURTIR COMENTÁRIO
describe('Comen_Like', () =>{
    //Curtir comentário válido
    it('Curtir comentário válido e retornar status 204', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/5f0ce980b9da0415546e3d67/like`, {
        }, {
            headers: { user_id:"5f35e2e48973d417809ddb70" }
        }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });

    //Descurtir comentário válido
    it('Descurtir comentário válido e retornar status 201', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/5f0ce980b9da0415546e3d67/like`, {
        }, {
            headers: { user_id:"5f35e2e48973d417809ddb70" }
        }).then(response =>{
            expect(response.status).toBe(201);
        }).catch(error =>{
            expect(error.response.status).toBe(201);
        });
    });

    //Curtir comentário inválido por id user inválido
    it('Curtir comentário inválido por id user inválido e retornar status 400', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/5f0ce980b9da0415546e3d67/like`, {
        }, {
            headers: { user_id:"1abc" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Curtir comentário inválido por id comentario inválido
    it('Curtir comentário inválido por id comentario inválido e retornar status 400', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/1abc/like`, {
        }, {
            headers: { user_id:"5f35e2e48973d417809ddb70" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});

//DELETAR COMENTÁRIO
describe('Comen_Del', () =>{
    //Deletar comentário inválido id usuario invalido
    it('Deletar comentário inválido id usuario invalido e retornar status 400', async () =>{
        await api.delete(`/posts/5f3dc259cfd4c831b84efad4/5f516e713e13661348e5bc9e`, {
            headers: { user_id:"1abc" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Deletar comentário inválido id comentario invalido
    it('Deletar comentário inválido id comentario invalido e retornar status 400', async () =>{
        await api.delete(`/posts/5f3dc259cfd4c831b84efad4/1abc`, {
            headers: { user_id:"5f35e2e48973d417809ddb70" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Deletar comentário inválido id usuario não pode deletar
    it('Deletar comentário inválido id usuario não pode deletar e retornar status 400', async () =>{
        await api.delete(`/posts/5f3dc259cfd4c831b84efad4/5f516e713e13661348e5bc9e`, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Deletar comentário válido (ALTERAR VALORES)
    it('Deletar comentário válido e retornar status 204', async () =>{
        await api.delete(`/posts/5f0ce863b9da0415546e3d66/5f5e3d4c31fdfa1f74eef2a8`, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });
});

//RESOLVER COMENTARIO
describe('Comen_Resolv', () =>{
    //Resolver comentário válido (ALTERAR VALORES)
    it('Resolver comentário válido e retornar status 201', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/5f0ce980b9da0415546e3d67/solve`, {}, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(201);
        }).catch(error =>{
            expect(error.response.status).toBe(201);
        });
    });

    //Resolver comentário inválido por id usuario inválido
    it('Resolver comentário inválido por id usuario inválido e retornar status 400', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/5f0ce980b9da0415546e3d67/solve`, {}, {
            headers: { user_id:"1abc" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Resolver comentário inválido por id comentario inválido
    it('Resolver comentário inválido por id comentario inválido e retornar status 400', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/1abc/solve`, {}, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Resolver comentário inválido por id post inválido
    it('Resolver comentário inválido por id post inválido e retornar status 404', async () =>{
        await api.post(`/posts//5f0ce980b9da0415546e3d67/solve`, {}, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(404);
        }).catch(error =>{
            expect(error.response.status).toBe(404);
        });
    });

    //Resolver comentário post ja solucionado
    it('Resolver comentário post solucionado e retornar status 200', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/5f0ce980b9da0415546e3d67/solve`, {}, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Resolver comentário post ja solucionado
    it('Resolver comentário post ja solucionado e retornar status 200', async () =>{
        await api.post(`/posts/1/5f0ce980b9da0415546e3d67/solve`, {}, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });
});