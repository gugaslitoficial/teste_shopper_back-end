Este é um projeto Node.js com TypeScript que oferece uma API para gerenciamento de medições de consumo de água e gás. A API permite realizar upload de imagens de medições, confirmar medições e listar medições por cliente.

ESTRUTURA DO PROJETO:

![image](https://github.com/user-attachments/assets/f9c72e9a-c288-4e27-a6c6-4c57a89a4709)


FUNCIONALIDADES:

- Upload de Medições: Envia uma imagem de medição para processamento.
- Confirmação de Medições: Confirma uma medição previamente enviada.
- Listagem de Medições: Lista todas as medições de um cliente, com opção de filtro por tipo de medição (água/gás).

TECNOLOGIAS UTILIZADAS:

- Node.js: Plataforma de desenvolvimento.
- TypeScript: Superset de JavaScript para tipagem estática.
- Express: Framework para construção de APIs.
- SQLite: Banco de dados utilizado para armazenar as medições.
- Axios: Cliente HTTP para integrar com a API externa.
- Docker: Para containerização do ambiente de desenvolvimento.

INSTALAÇÃO:

Clone o repositório:
git clone https://github.com/seu-usuario/api-medicoes.git

Instale as dependências:
npm install

Configure as variáveis de ambiente:
Renomeie o arquivo .env.example para .env e preencha as variáveis necessárias.

Compile o projeto TypeScript:
npm run build


EXECUÇÃO:

Para executar o projeto, utilize o Docker Compose:
docker-compose up

OBS.: A API estará disponível em http://localhost:3000.


ENDPOINTS:

- Upload de Medições:
  POST /upload
    Envia uma imagem de medição para processamento.

- Confirmação de Medições:
  PATCH /confirm
    Confirma uma medição previamente enviada.

- Listagem de Medições:
  GET /list
    Lista todas as medições de um cliente.

CONTRIBUIÇÕES:

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

LICENÇA:

Este projeto está licenciado sob a licença MIT.

