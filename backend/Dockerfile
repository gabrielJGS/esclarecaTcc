# Imagem base
FROM node:10

# Configuração do usuário/permissões
WORKDIR /usr/src/app

# Instalação das dependências
COPY package*.json ./
RUN npm install
COPY ./models .
COPY ./config .
COPY ./api .
COPY ./node_modules .
COPY . .

EXPOSE 3333
# Copia dos arquivos do projeto

# Execução
CMD ["npm", "start"]