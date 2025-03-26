// server.js

import express from 'express';
import dotenv from 'dotenv';
import db from './src/db/db.js'; // Importa a configuração do banco de dados
import contatoRoutes from './src/routes/contatoRoutes.js'; // Importa as rotas de contatos

// Ativa arquivo de configuração
dotenv.config();

const app = express();

app.use(express.json());

// Usa as rotas de contatos
app.use('/contatos', contatoRoutes); // Adiciona um prefixo '/contatos' às rotas

app.listen(process.env.APP_PORT, () =>
  console.log('AGENDA - API WEB executando')
);