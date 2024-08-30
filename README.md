Este é um projeto Node.js com TypeScript que oferece uma API para gerenciamento de medições de consumo de água e gás. A API permite realizar upload de imagens de medições, confirmar medições e listar medições por cliente.

ESTRUTURA DO PROJETO:

├── dist/                # Arquivos compilados (após build)
├── node_modules/        # Dependências do projeto
├── src/                 # Código fonte
│   ├── models/          # Módulos de banco de dados
│   │   └── measure.ts   # Funções para manipular as medições no banco de dados
│   ├── routes/          # Rotas da API
│   │   ├── confirm.ts   # Rota para confirmação de medições
│   │   ├── list.ts      # Rota para listar medições
│   │   └── upload.ts    # Rota para upload de medições
│   ├── utils/           # Utilitários do projeto
│   │   └── validators.ts# Funções de validação
│   └── index.ts         # Arquivo principal do servidor Express
├── .dockerignore        # Arquivos a serem ignorados pelo Docker
├── .env                 # Arquivo de configuração de variáveis de ambiente
├── database.db          # Banco de dados SQLite
├── docker-compose.yml   # Configuração do Docker Compose
├── Dockerfile           # Configuração do Docker
├── package-lock.json    # Lockfile do npm
├── package.json         # Dependências e scripts do projeto
├── tsconfig.json        # Configurações do TypeScript

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

