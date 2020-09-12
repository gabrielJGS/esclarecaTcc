const api = require('../../services/api')

describe('Users_Put', () =>{
    it('Atualizar usuário e retornar status 204', async () =>{
        const response = await api.put('users/5f5c15a0ed84b700175530c5', {
            name: "Reidner",
            email: "jest@gmail.com",
            tags: "vba,node",
            password:"123"
          })

        //console.log("LLLLLLÇÇÇÇLLL");//vtnc carai de log 
        expect(response.status).toBe(204);
    });
});