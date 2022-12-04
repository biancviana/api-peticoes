const app = require('./config/server');
const routes = require('./app/routes');

routes.getPeticoes(app);
routes.addPeticao(app);
routes.deletePeticao(app);
routes.updatePeticao(app);
routes.authUser(app);
routes.signPeticao(app);
routes.addTopic(app);

module.exports = app; //para os testes funcionarem