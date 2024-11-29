# Usar a imagem oficial do Node.js como base
FROM node:22.11.0

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de dependência package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código (todos os arquivos e pastas) para dentro do contêiner
COPY . .

# Expor a porta em que o app estará rodando 
EXPOSE 5000

# Definir o comando para rodar a aplicação
CMD ["npm", "start"]
