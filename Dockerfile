# Usar uma imagem base com Node.js
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Compilar o TypeScript
RUN npm run build

# Expôr a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]
