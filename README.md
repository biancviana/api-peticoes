# api-peticoes
Desenvolvimento de uma API para registro e assinatura de petições para a disciplina de DSW, utilizando MongoDB como banco de dados e Heroku para deployment.

<br>

## 🚨 Rotas implementadas na API:

### Pode ser acessada por qualquer pessoa:
  * [ROTA PÚBLICA] Consulta de petições - GET '/api/peticoes'
  * [ROTA PÚBLICA] Adicionar comentário na petição por ID - POST '/api/addTopic/:id'
  
### Para adicionar, editar, deletar e até assinar uma petição, o usuário precisa estar autenticado, utilizando JWT:
#### Ao realizar o login, é gerado um token. Esse token, passado na header, irá possibilitar que as rotas seguras sejam acessadas.
  * [ROTA SEGURA] Autenticar um usuário - POST '/api/authUser'
  
  
 ### Agora sim, depois de autenticado, é possível acessar as seguintes rotas seguras:  
  * [ROTA SEGURA] Adicionar uma petição - POST '/api/peticoes'
  * [ROTA SEGURA] Editar uma petição por ID - PUT '/api/peticoes/:id'
  * [ROTA SEGURA] Deletar uma petição por ID - DELETE '/api/peticoes/:id'
  * [ROTA SEGURA] Assinar uma petição por ID - POST '/api/signPeticoes/:id'
