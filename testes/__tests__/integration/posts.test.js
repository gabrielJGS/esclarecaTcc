const api = require('../../services/api')

//NOVO POST save
describe('POST_New', () =>{
    //Novo post válido dúvida
    it('Criar post válido de dúvida e retornar status 204', async () =>{
        await api.post(`/posts`, {
            title:"Jest", desc:"Teste Jest", tags:"NodeJS"
          }, {
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type: false 
            }
          }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });

    //Criar post válido Conteudo
    it('Criar post válido de conteúdo e retornar status 204', async () =>{
        await api.post(`/posts`, {
            title:"Jest", desc:"Teste Jest", tags:"NodeJS"
          }, {
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type: true 
            }
          }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });

    //Criar post iválido por id user inválido
    it('Criar post inválido por id usuário ser inválido e retornar status 400', async () =>{
        await api.post(`/posts`, {
            title:"Jest", desc:"Teste Jest", tags:"NodeJS"
          }, {
            headers: { 
                user_id:"1abc", 
                type: false 
            }
          }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Criar post iválido por falta de campo ou em branco
    it('Criar post inválido por falta de campo ou campo em branco e retornar status 400', async () =>{
        await api.post(`/posts`, {
            title:"", desc:"Teste Jest", tags:""
          }, {
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type: false
            }
          }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});

//LIST todos POST index
describe('POST_ListAll', () =>{
    //Listar post válido de acordo com usuário
    it('Listar posts válidos de dúvida de acordo com usuário e retornar status 200', async () =>{
        await api.get('/posts', {
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:false, 
                search_text: "",
                search_type: "" 
            },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    it('Listar post válido de conteúdo de acordo com usuário e retornar status 200', async () =>{
        await api.get('/posts', {
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:true, 
                search_text: "",
                search_type: "" 
            },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Listar post válido de acordo com usuário e com pesquisa
    it('Listar post com pesquisa por titulo válido de dúvida e retornar status 200', async () =>{
        await api.get('/posts', {
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:false, 
                search_text: "Como",
                search_type: "title" 
            },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Listar post válido e com pesquisa
    it('Listar post pesquisa por titulo válido de conteúdo e retornar status 200', async () =>{
        await api.get('/posts', {
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:true, 
                search_text: "Como",
                search_type: "title" 
            },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Listar post válido e com pesquisa
    it('Listar post pesquisa de dúvida por descrição válido e retornar status 200', async () =>{
        await api.get('/posts', {
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:false, 
                search_text: "Como",
                search_type: "desc" 
            },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    it('Listar post pesquisa de conteúdo por descrição válido e retornar status 200', async () =>{
        await api.get('/posts', {
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:true, 
                search_text: "Como",
                search_type: "desc" 
            },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Listar post válido e com pesquisa
    it('Listar post de pesquisa por tags de dúvida válido e retornar status 200', async () =>{
        await api.get('/posts', {
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:false, 
                search_text: "node",
                search_type: "tags" 
            },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Listar post válido e com pesquisa
    it('Listar post de pesquisa por tags de conteúdo válido e retornar status 200', async () =>{
        await api.get('/posts', {
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:true, 
                search_text: "node",
                search_type: "tags" 
            },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Listar post inválido de acordo com usuário e com pesquisa
    it('Listar post inválido por id usuário ser inexistente e retornar 400', async () =>{
        await api.get('/posts', {
            headers: { 
                user_id:"1ab", 
                type:true, 
                search_text: "node",
                search_type: "tags" 
            },
            params: { page:1 }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});

//CURTIR POST
describe('POST_LIKE', () =>{
    //Curtir post válido
    it('Curtir post válido e retornar status 204', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/like`, {
        }, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(204);
        })
    });

    //Descurtir post válido
    it('Descurtir post válido e retornar status 201', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/like`, {
        }, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(201);
        })
    });

    //Curtir post inválido por id user inexistente
    it('Curtir post inválido por id usuário ser inexistente e retornar status 400', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/like`, {
        }, {
            headers: { user_id:"1abc" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Curtir post inválido por id post inexistente
    it('Curtir post inválido por id post ser inexistente e retornar status 400', async () =>{
        await api.post(`/posts/1abc/like`, {
        }, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});

//Selecionar POST
describe('POST_SELECT', () =>{
    //Selecionar Post válido
    it('Selecionar post válido e retornar status 200', async () =>{
        await api.get(`/post/5f334200cb35e419787b2655`, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Selecionar post invalido por id usuário inválido
    it('Selecionar post inválido por id usuário ser inválido e retornar status 400', async () =>{
        await api.get(`/post/5f334200cb35e419787b2655`, {
            headers: { user_id:"1abc" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Selecionar post invalido por id post inválido
    it('Selecionar post inválido por id post ser inválido e retornar status 400', async () =>{
        await api.get(`/post/1abc`, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});

//DELETE POST
describe('POST_DELETE', () =>{
    //Deletar post inválido por id usuário inexistente
    it('Excluir post inválido por id usuário ser inexistente e retornar status 400', async () =>{
        await api.delete(`/posts/5f55906ab07b400017b9778d`, {
            headers: { user_id:"1abc" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Excluir post inválido por id post inexistente
    it('Excluir post inválido por id post ser inexistente e retornar status 400', async () =>{
        await api.delete(`/posts/1abc`, {
            headers: { user_id:"5f558f0fb07b400017b9778c" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Excluir post inválido por id usuário não ser o válido
    it('Excluir post inválido por id usuário não ser o mesmo id do usuário cadastrado no post e retornar status 401', async () =>{
        await api.delete(`/posts/5f614534f395951cd42e50c5`, {
            headers: { user_id:"5f35e2e48973d417809ddb70" }
        }).then(response =>{
            expect(response.status).toBe(401);
        }).catch(error =>{
            expect(error.response.status).toBe(401);
        });
    });

    //Excluir post válido (TROCAR VALORES)
    it('Excluir post válido e retornar status 204', async () =>{
        await api.delete(`/posts/5f614534f395951cd42e50c5`, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });
});

//TOTAL DE POSTS get total
describe('POST_TOTAL', () =>{
    //Retornar total de posts dúvida
    it('Retornar Quantidade Total de post válido de dúvida e retornar status 200', async () =>{
        await api.head('/posts', { 
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:false, 
                search_text: "", 
            } 
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });
    
    //Retornar total de posts conteúdo
    it('Retornar Quantidade Total post válido de conteúdo e retornar status 200', async () =>{
        await api.head('/posts', { 
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:true, 
                search_text: "", 
            } 
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Retornar total pesquisa de posts dúvida
    it('Retornar Quantidade Total post válido com pesquisa de dúvida e retornar status 200', async () =>{
        await api.head('/posts', { 
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:false, 
                search_text: "Como", 
            } 
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });
    
    //Retornar total de posts conteúdo
    it('Retornar quantidade total post válido com pesquisa de conteúdo e retornar status 200', async () =>{
        await api.head('/posts', { 
            headers: { 
                user_id:"5f0ce694a8119330ecc59fa9", 
                type:true, 
                search_text: "Quando", 
            } 
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Retornar total de posts invalido id usuário
    it('Retornar quantidade total post inválido por id usuário ser inválido e retornar status 400', async () =>{
        await api.head('/posts', { 
            headers: { 
                user_id:"1abc", 
                type:true, 
                search_text: "",
            } 
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Retornar total de posts invalido falta de parametro type
    it('Retornar quantidade total post inválido por falta de parâmetro "Type" ser inválido e retornar status 400', async () =>{
        await api.head('/posts', { 
            headers: { 
                user_id:"1abc",
                search_text: "",
            } 
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});