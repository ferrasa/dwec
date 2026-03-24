import pg from 'pg';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pg;

const db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

const app = express();
app.use(express.json());

//RETONRA TODOS OS CONTATOS EXISTENTES
app.get('/', async (req, resp) => {
    const sql = 'SELECT * FROM  contato';
    try{
        const contatos = await db.query(sql);
        resp.status(200).send(contatos.rows);
    }
    catch(e){
        console.log(e);
        resp.status(500).send({erro: 'Um erro ocorreu'});
    }

});

//ADICIONA UM CONTATO
app.post('/', async (req, resp) => {
    
    try{
        const {nome, telefone, email, nota, ativo} = req.body;
        const values = [nome, telefone, email, nota, ativo];

        const sql = 'INSERT INTO contato(nome, telefone, email, nota, ativo) VALUES ($1, $2, $3, $4, $5)';

        const r = await db.query(sql, values);

        resp.status(201).send(r);
    }
    catch(e){
        console.log(e);
        resp.status(500).send({erro: 'Um erro ocorreu'});
    }

});

app.listen(process.env.APP_PORT, () => console.log('AGENDA - API WEB executando'));