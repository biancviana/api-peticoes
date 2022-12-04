const Peticoes = require("../app/controllers/peticoesController")

module.exports = {
  getPeticoes: (app) => {
    console.log(`[Routes] get petições`)
    app.get('/api/peticoes', Peticoes.apiGetAllPeticoes); //rota pública, onde qualquer pessoa pode acessar
  },

  addPeticao: (app) => {
    console.log('[Routes] add petições')
    app.post('/api/peticoes', Peticoes.addPeticao); //rota segura, onde user autenticados vão poder acessar
  },

  deletePeticao: (app) => {
    console.log('[Routes] delete petições')
    app.delete('/api/peticoes/:id', Peticoes.deletePeticao); //rota segura, onde user autenticados vão poder acessar
  },

  updatePeticao: (app) => {
    console.log('[Routes] update petições')
    app.put('/api/peticoes/:id', Peticoes.updatePeticao); //rota segura, onde user autenticados vão poder acessar
  },

  authUser: (app) => {
    console.log('[Routes] auth user')
    app.post('/api/authUser', Peticoes.authUser);
  },

  signPeticao: (app) => {
    console.log('[Routes] sign petições')
    app.post('/api/signPeticoes/:id', Peticoes.signPeticao); //rota segura, onde user autenticados vão poder acessar
  },

  //funcionalidade "a mais"
  addTopic: (app) => {
    console.log('[Routes] add topic')
    app.post('/api/addTopic/:id', Peticoes.addTopic); //rota pública, onde qualquer pessoa pode deixar um comentário sobre a petição
  }
}