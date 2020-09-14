const api = require('../../services/api')

//NOVO POST save
describe('POST_New', () =>{
    //Novo post válido dúvida
    it('Novo POST válido dúvida e retornar status 204', async () =>{
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

    //Novo post válido Conteudo
    it('Novo POST válido conteúdo e retornar status 204', async () =>{
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

    //Novo post iválido por id user inválido
    it('Novo POST iválido por id user inválido e retornar status 400', async () =>{
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

    //Novo post iválido por falta de campo ou em branco
    it('Novo POST iválido por falta de campo ou em branco e retornar status 400', async () =>{
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
    it('Listar post válido dúvida de acordo com usuário e retornar status 200', async () =>{
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

    it('Listar post válido conteúdo de acordo com usuário e retornar status 200', async () =>{
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
    it('Listar post pesquisa titulo válido dúvida de acordo com usuário e retornar status 200', async () =>{
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

    //Listar post válido de acordo com usuário e com pesquisa
    it('Listar post pesquisa titulo válido conteúdo de acordo com usuário e retornar status 200', async () =>{
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

    //Listar post válido de acordo com usuário e com pesquisa
    it('Listar post pesquisa dúvida descrição válido de acordo com usuário e retornar status 200', async () =>{
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

    it('Listar post pesquisa conteúdo descrição válido de acordo com usuário e retornar status 200', async () =>{
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

    //Listar post válido de acordo com usuário e com pesquisa
    it('Listar post pesquisa tags dúvida válido de acordo com usuário e retornar status 200', async () =>{
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

    //Listar post válido de acordo com usuário e com pesquisa
    it('Listar post pesquisa tags conteúdo válido de acordo com usuário e retornar status 200', async () =>{
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
    it('Listar post inválido por id inexistente e retornar 400', async () =>{
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
    it('Curtir POST válido e retornar status 204', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/like`, {
        }, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(204);
        })
    });

    //Descurtir post válido
    it('Descurtir POST válido e retornar status 201', async () =>{
        await api.post(`/posts/5f0ce863b9da0415546e3d66/like`, {
        }, {
            headers: { user_id:"5f0ce694a8119330ecc59fa9" }
        }).then(response =>{
            expect(response.status).toBe(201);
        })
    });

    //Curtir post inválido por id user inexistente
    it('Curtir POST inválido por id user inexistente e retornar status 400', async () =>{
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
    it('Curtir POST inválido por id post inexistente e retornar status 400', async () =>{
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
    it('Selecionar post invalido por id usuário inválido e retornar status 400', async () =>{
        await api.get(`/post/5f334200cb35e419787b2655`, {
            headers: { user_id:"1abc" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Selecionar post invalido por id post inválido
    it('Selecionar post invalido por id post inválido e retornar status 400', async () =>{
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
    it('DELETAR POST inválido por id usuário inexistente e retornar status 400', async () =>{
        await api.delete(`/posts/5f55906ab07b400017b9778d`, {
            headers: { user_id:"1abc" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Deletar post inválido por id post inexistente
    it('DELETAR POST inválido por id post inexistente e retornar status 400', async () =>{
        await api.delete(`/posts/1abc`, {
            headers: { user_id:"5f558f0fb07b400017b9778c" }
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Deletar post inválido por id usuário não ser o válido
    it('DELETAR POST inválido por id usuário não ser o válido e retornar status 401', async () =>{
        await api.delete(`/posts/5f55906ab07b400017b9778d`, {
            headers: { user_id:"5f4ed9968c83250017344f09" }
        }).then(response =>{
            expect(response.status).toBe(401);
        }).catch(error =>{
            expect(error.response.status).toBe(401);
        });
    });

    //Deletar post válido (TROCAR VALORES)
    it('DELETAR POST válido e retornar status 204', async () =>{
        await api.delete(`/posts/5f55906ab07b400017b9778d`, {
            headers: { user_id:"5f558f0fb07b400017b9778c" }
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
    it('Total post válido dúvida e retornar status 200', async () =>{
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
    it('Total post válido conteúdo e retornar status 200', async () =>{
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
    it('Total post válido com pesquisa dúvida e retornar status 200', async () =>{
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
    it('Total post válido pesquisa conteúdo e retornar status 200', async () =>{
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
    it('Total post inválido por id usuário inválido e retornar status 400', async () =>{
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
    it('Total post inválido por falta de parametro type inválido e retornar status 400', async () =>{
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