// src/controllers/contatoController.js

import db from '../db/db.js';

// Função auxiliar para lidar com erros
const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).send({ erro: 'Um erro ocorreu' });
};

const getAllContatos = async (req, res) => {
  try {
    const sql = 'SELECT * FROM contatos';
    const contatos = await db.query(sql);
    res.status(200).send(contatos.rows);
  } catch (e) {
    handleServerError(res, e);
  }
};

const getContatoById = async (req, res) => {
  const id = req.params.id;
  try {
    const sql = 'SELECT * FROM contatos WHERE id = $1';
    const contatos = await db.query(sql, [id]);

    if (contatos.rows.length === 0) {
      return res.status(404).send({ erro: 'Contato não encontrado' });
    }
    res.status(200).send(contatos.rows);
  } catch (e) {
    handleServerError(res, e);
  }
};

const createContato = async (req, res) => {
  try {
    const { nome, telefone, email, nota, ativo } = req.body;
    const values = [nome, telefone, email, nota, ativo];
    const sql =
      'INSERT INTO contatos(nome, telefone, email, nota, ativo) VALUES ($1, $2, $3, $4, $5) RETURNING *'; // Adiciona RETURNING * para retornar o contato criado

    const r = await db.query(sql, values);
    res.status(201).send(r.rows[0]); // Envia o contato criado
  } catch (e) {
    handleServerError(res, e);
  }
};

const updateContato = async (req, res) => {
  const id = req.params.id;
  const contatoAlterar = req.body;

  const col = Object.keys(contatoAlterar);

  if (col.length === 0) {
    return res.status(400).send({ erro: 'Nenhum dado para atualizar' });
  }

  const sqlTemp = ['UPDATE contatos', 'SET'];
  const temp = col.map((c, i) => `${c} = $${i + 1}`);
  sqlTemp.push(temp.join(', '));
  sqlTemp.push('WHERE id = $id RETURNING *'); // Usar um placeholder nomeado para o ID
  const sql = sqlTemp.join(' ');

  const atributos = col.map((c) => contatoAlterar[c]);

  try {
    const r = await db.query(sql, [...atributos, { id }]);
    if (r.rows.length === 0) {
      return res.status(404).send({ erro: 'Contato não encontrado' });
    }
    res.status(200).send(r.rows[0]);
  } catch (e) {
    handleServerError(res, e);
  }
};

const deleteContato = async (req, res) => {
  const id = req.params.id;

  try {
    const sql = 'DELETE FROM contatos WHERE id = $1 RETURNING *'; // Adiciona RETURNING * para retornar o contato deletado
    const r = await db.query(sql, [id]);

    if (r.rows.length === 0) {
      return res.status(404).send({ erro: 'Contato não encontrado' });
    }
    res.status(200).send({ mensagem: 'Contato removido', contato: r.rows[0] }); // Envia o contato deletado
  } catch (e) {
    handleServerError(res, e);
  }
};

export default {
  getAllContatos,
  getContatoById,
  createContato,
  updateContato,
  deleteContato,
};