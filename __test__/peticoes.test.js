const supertest = require('supertest');
const app = require('../index');

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

// para inserir uma petição
describe('peticao', () => {
  describe("Rotas petições", () => {
    describe('Inserir uma petição sendo um usuário autenticado', () => {
      it("Deve retornar o status 200", async () => {
        await supertest(app)
          .post(`/api/peticoes`)
          .set('x-access-token', token="")
          .send({ titulo: 'Título para teste automatizado', descricao: 'Descrição para teste automatizado', autor: 'Autor para teste automatizado', fotoPeticao: 'fotoPeticao para teste automatizado' })
          .expect(200);
      })
    })
  })
});

// para editar uma petição
describe('peticao', () => {
  describe("Rotas petições", () => {
    describe('Editar uma petição sendo um usuário autenticado', () => {
      it("Deve retornar o status 200", async () => {
        await supertest(app)
          .post(`/api/peticoes`)
          .set('x-access-token', token="")
          .send({ titulo: 'Título para teste automatizado', descricao: 'Descrição para teste automatizado', autor: 'Autor para teste automatizado', fotoPeticao: 'fotoPeticao para teste automatizado' })
          .expect(200);
      })
    })
  })
});