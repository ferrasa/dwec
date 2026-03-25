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

//BUSCA UM CONTATO DADO UM ID
app.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const sql = 'SELECT * FROM contato WHERE id = ' + id;
        const contatos = await db.query(sql);
            
        res.status(200).send(contatos.rows);
    }
    catch(e){
        console.log(e);
        res.status(500).send({erro: 'Um erro ocorreu'});
    }    
    
});

app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const contatoAlterar = req.body;

    //Criar String e UPDATE
    //Ex.: UPDATE contato SET nome = $1, telefone $2 WHERE id = 1
    var sqlTEmp = ['UPDATE contato'];
    sqlTEmp.push('SET');

    const col = Object.keys(contatoAlterar);
    var temp = [];
    col.forEach((a, i) => {
        temp.push(a + ' = $' + (i + 1));
    });

    sqlTEmp.push(temp.join(', '));
    sqlTEmp.push('WHERE id = '+id+' RETURNING *');
    const sql = sqlTEmp.join(' ');

    //Obtem calores de atributos
    var atributos = col.map( (a) => {
        return contatoAlterar[a];
    });

    try{
        const r = await db.query(sql, atributos);
        res.status(200).send(r.rows);

    } catch (e){
        console.log(e);
        res.status(500).send({erro: 'Ocorreu um erro'});

    }
});

//REMOVE UM CONTATO
app.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try{
        const sql = 'DELETE FROM contato WHERE id = $1';
        const r = db.query(sql, [id]);
        res.status(200).send({mensagem: 'Contato removido'});
    }
    catch(e){
        console.log(e);
        res.status(500).send({erro: 'Um erro ocorreu'});
     }    

});

app.listen(process.env.APP_PORT, () => console.log('AGENDA - API WEB executando'));