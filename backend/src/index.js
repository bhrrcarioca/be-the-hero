const express = require('express'); // importa o pacote express
const cors = require('cors'); // importa o cors
const routes = require('./routes') // importa o arquivo routes.js

const app = express(); // cria a varíavel que armazazena a aplicação

app.use(cors()); // usa o cors
app.use(express.json());// permite o express ler json no corpo da requisição
app.use(routes); // usando o arquivo routes

app.listen(3333); // vai escutar a porta 3333


