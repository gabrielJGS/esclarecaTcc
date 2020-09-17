const api = require('../../services/api')

//REGISTRAR USUÁRIO
describe('Authentication_Registro', () => {
    //Registro válido  
    it('Registrar usuário válido e retornar status 204', async () =>{
        await api.post('/signup', {
            name:"Teste", email:"reidnerTeste@gmail.com", password:"123", tags:"VBA, Node"
        }).then(response =>{
            expect(response.status).toBe(204);
        }).catch(error =>{
            expect(error.response.status).toBe(204);
        });
    });

    //Registro inválido (dados faltando)
    it('Registrar usuário inválido por falta de dado ou dado inválido e retornar status 400', async () =>{
        await api.post('/signup', {
            name:"Teste", email:"Jest@gmail.com", tags:"VBA, Node"
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Registro inválido (email existente)  
    it('Registrar usuário inválido por e-mail já estar existente no banco e retornar status 400', async () =>{
        await api.post('/signup', {
            name:"Teste", email:"Jest@gmail.com", password:"123", tags:"VBA, Node"
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });
});

//LOGIN USUÁRIO
describe('Authentication_Login', () =>{
    //Logar usuário válido
    it('Logar usuário válido e retornar status 200', async () =>{
        await api.post('/signin', {
            email:"Jest@gmail.com", password:"123"
        }).then(response =>{
            expect(response.status).toBe(200);
        }).catch(error =>{
            expect(error.response.status).toBe(200);
        });
    });

    //Logar usuário inválido (dados inválidos)
    it('Logar usuário inválido por dado inválido ou incompleto e retornar status 400', async () =>{
        await api.post('/signin', {
            email:"Jest@gmail.com", 
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Logar usuário inválido (email inválido)
    it('Logar usuário inválido por e-mail não constar no banco e retornar status 400', async () =>{
        await api.post('/signin', {
            email:"JestTeste1234@gmail.com", password:"123"
        }).then(response =>{
            expect(response.status).toBe(400);
        }).catch(error =>{
            expect(error.response.status).toBe(400);
        });
    });

    //Logar usuário inválido (senha inválida)
    it('Logar usuário inválido por senha inválida e retornar status 401', async () =>{
        await api.post('/signin', {
            email:"Jest@gmail.com", password:"1234"
        }).then(response =>{
            expect(response.status).toBe(401);
        }).catch(error =>{
            expect(error.response.status).toBe(401);
        });
    });
});


//PRONTO