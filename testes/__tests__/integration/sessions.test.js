const api = require('../../services/api')

describe('Authentication_Registro', () =>{
    it('Registrar usuário e retornar status 204', async () =>{
        const response = await api.post('/signup', {
            name:"Teste", email:"Jest@gmail.com", password:"123", tags:"VBA, Node"
        });

        //console.log("LLLLLLÇÇÇÇLLL");//vtnc carai de log 
        expect(response.status).toBe(204);
    });
});

describe('Authentication_Login', () =>{
    it('Logar usuário e retornar status 200', async () =>{
        const response = await api.post('/signin', {
            email:"Jest@gmail.com", password:"123"
        });

        //console.log("LLLLLLÇÇÇÇLLL");//vtnc carai de log 
        expect(response.status).toBe(200);
    });
});