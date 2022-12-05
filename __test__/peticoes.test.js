const supertest = require('supertest');
const app = require('../index');
peticao = "";

// para buscar todas as petições
describe('peticao', () => {
  describe("Rotas petições", () => {
    describe('Consulta de todas as petições', () => {
      it("Deve retornar o status 200", async () => {
        await supertest(app)
          .get(`/api/peticoes`)
          .expect(200);
      })
    })
  })
});

// para inserir uma petição - sendo um usuário autenticado
describe('peticao', () => {
  describe("Rotas petições", () => {
    describe('Inserir uma petição sendo um usuário autenticado', () => {
      it("Deve retornar o status 200", async () => {
        await supertest(app)
          .post(`/api/peticoes`)
          .set('x-access-token', token = "")
          .send({ titulo: 'Título para teste automatizado', descricao: 'Descrição para teste automatizado', autor: 'Autor para teste automatizado', fotoPeticao: 'fotoPeticao para teste automatizado' })
          .expect(200);
      })
    })
  })
});

// para inserir uma petição - NÃO sendo um usuário autenticado
describe('peticao', () => {
  it('Deve retornar o status 401', async () => {
    await supertest(app)
      .post(api)
      .send({ titulo: 'Título para teste automatizado', descricao: 'Descrição para teste automatizado', autor: 'Autor para teste automatizado', fotoPeticao: 'fotoPeticao para teste automatizado' })
      .expect(401);
  });
});

// para editar uma petição - sendo um usuário autenticado
describe('peticao', () => {
  describe("Rotas petições", () => {
    describe('Editar uma petição sendo um usuário autenticado', () => {
      it("Deve retornar o status 200", async () => {
        await supertest(app)
          .put(`/api/peticoes` + peticao)
          .set('x-access-token', token = "")
          .send({ titulo: 'Título para teste automatizado', descricao: 'Descrição para teste automatizado', autor: 'Autor para teste automatizado', fotoPeticao: 'fotoPeticao para teste automatizado' })
          .expect(200);
      })
    })
  })
});

// para inserir uma petição - NÃO sendo um usuário autenticado
describe('peticoes', () => {
  it('Deve retornar o status 404', async () => {
    await supertest(app)
      .put(`${'/api/peticoes'}/638cff4d777e8bc47b4486bb`)
      .send({ titulo: 'Título para teste automatizado', descricao: 'Descrição para teste automatizado', autor: 'Autor para teste automatizado', fotoPeticao: 'fotoPeticao para teste automatizado' })
      .expect(404);
  });
});

// para excluir uma petição - sendo um usuário autenticado
describe('peticao', () => {
  describe("Rotas petições", () => {
    describe('Excluir uma petição sendo um usuário autenticado', () => {
      it("Deve retornar o status 200", async () => {
        await supertest(app)
          .delete(`${'/api/peticoes'}/` + peticao)
          .set('x-access-token', token = "")
          .expect(200);
      })
    })
  })
});

// para excluir uma petição - NÃO sendo um usuário autenticado
describe('peticoes', () => {
  it('Deve retornar o status 404', async () => {
    await supertest(app)
      .put(`${'/api/peticoes'}/638cff4d777e8bc47b4486bb`)
      .expect(404);
  });
});