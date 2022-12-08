const supertest = require('supertest');
const app = require('../index');
peticao = "";
token = "";

// para buscar todas as petições
describe('peticoes', () => {
  describe("Rotas petições", () => {
    describe('Para consultar todas as petições', () => {
      it("Deve retornar o status 200", async () => {
        await supertest(app)
          .get(`/api/peticoes`)
          .expect(200);
      })
    })
  })
});

// para autenticar o usuário
describe('authUser', () => {
  describe('Rotas petições', () => {
    describe('Para autentifcar o usuário', () => {
      it('Deve retornar o status 200', async () => {
        await supertest(app)
          .post(`/api/authUser`)
          .send({ email: 'bianca@gmail.com', senha: 'bianca' })
          .expect(200)
          .then((rest) => {
            token = rest.body;
          })
      })
    })
  })
});


// para inserir uma petição - NÃO sendo um usuário autenticado
describe('CRUD', () => {
  describe('Rotas petições', () => {
    describe('Para inserir uma petição - usuário não autenticado', () => {
      it('Deve retornar o status 401', async () => {
        await supertest(app)
          .post(`/api/peticoes`)
          .send({ titulo: 'Título para teste automatizado', descricao: 'Descrição para teste automatizado', autor: 'Autor para teste automatizado', fotoPeticao: 'fotoPeticao para teste automatizado' })
          .expect(401);
      });
    })
  })
});

// para editar uma petição que não existe (ID errado) - sendo um usuário autenticado
describe('CRUD', () => {
  describe('Rotas petições', () => {
    describe('Para editar uma petição que não existe - usuário autenticado', () => {
      it('Deve retornar o status 401', async () => {
        await supertest(app).put(`${`/api/peticoes`}/1234`).set('x-access-token', token)
          .send({ titulo: 'Título para teste automatizado 3', descricao: 'Descrição para teste automatizado', autor: 'Autor para teste automatizado', fotoPeticao: 'fotoPeticao para teste automatizado' })
          .expect(401);
      });
    });
  });
});


// para excluir uma petição que não existe (ID errado) - sendo um usuário autenticado
describe('CRUD', () => {
  describe('Rotas petições', () => {
    describe('Para excluir uma petição que não existe - usuário autenticado', () => {
      it('Deve retornar o status 401', async () => {
        await supertest(app)
          .delete(`${`/api/peticoes`}/1234`)
          .set('x-access-token', token)
          .expect(401);
      });
    });
  });
});

// para assinar uma petição que não existe (ID errado) - sendo um usuário autenticado
describe('signUser', () => {
  describe('Rotas petições', () => {
    describe('Para assinar uma petição que não existe - usuário autenticado', () => {
      it('Deve retornar o status 401', async () => {
        await supertest(app)
          .post(`${`/api/signPeticoes`}/1234`)
          .set('x-access-token', token)
          .expect(401);
      });
    });
  });
});

// para adicionar um comentário na petição - NÃO sendo um usuário autenticado
describe('Funcionalidade a mais', () => {
  describe('Rotas petições', () => {
    describe('Para adicionar um comentário na petição', () => {
      it('Deve retornar o status 200', async () => {
        await supertest(app)
          .post(`/api/addTopic/638cff4d777e8bc47b4486bb`)
          .send({ comentarios: 'Comentário teste' })
          .expect(200);
      });
    })
  })
});