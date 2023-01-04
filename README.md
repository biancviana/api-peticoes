# api-peticoes
Desenvolvimento de uma API para registro e assinatura de petições para a disciplina de DSW, utilizando MongoDB como banco de dados e Vercel para deployment.
* Você pode acessar aqui: https://api-peticoes.vercel.app/api/peticoes

<br>

## 🚨 Rotas implementadas na API:

### Pode ser acessada por qualquer pessoa:
  * [ROTA PÚBLICA] Consulta de petições - GET '/api/peticoes'
  * [ROTA PÚBLICA] Adicionar comentário na petição por ID - POST '/api/addTopic/:id' *(funcionalidade a mais)*
```  
{
    "comentario": "Ótima causa, ganhou minha assinatura!"
}
```
  
### Para adicionar, editar, deletar e até assinar uma petição, o usuário precisa estar autenticado, utilizando JWT:
#### Ao realizar o login (abaixo), é gerado um token. Esse token, passado na header, irá possibilitar que as rotas seguras sejam acessadas.
  * [ROTA SEGURA] Autenticar um usuário - POST '/api/authUser'
 

```
{  
    "email":"bianca@gmail.com",
    
    "senha": "bianca"    
}
```
ou 
```
{  
    "email":"joao@gmail.com",
    
    "senha": "joao"    
}
```
* Para acessar as rotas seguras, passe o token que foi gerado na header. Dessa forma:

![image](https://user-images.githubusercontent.com/49793932/206210561-f79f655c-539f-441c-aaf7-417f6f5edbe5.png)

* Para todas as rotas que exigem autenticação, é preciso passar a KEY **x-access-token** na header, junto com o token gerado.
* Feito isso, é só clicar em "SEND" e brincar.

  
  
 ### Agora sim, depois de autenticado, é possível acessar as seguintes rotas seguras:  
  * [ROTA SEGURA] Adicionar uma petição - POST '/api/peticoes'
  ```
 {
    "titulo":"Título da petição",
    "descricao": "Descrição da petição",
    "autor": "Autor da petição",
    "fotoPeticao": "Foto da petição" 
}
```
  
  
  * [ROTA SEGURA] Editar uma petição por ID - PUT '/api/peticoes/:id'
``` 
{
    "titulo":"Título alterado",
    "descricao": "Descrição alterada",
    "fotoPeticao": "Foto alterada" 
}
```
  
  * [ROTA SEGURA] Deletar uma petição por ID - DELETE '/api/peticoes/:id'
  * [ROTA SEGURA] Assinar uma petição por ID - POST '/api/signPeticoes/:id'
  
```  
{
    "assinatura":"bianca@gmail.com"
}
```  
ou
```  
{
    "assinatura":"joao@gmail.com"
}
```
