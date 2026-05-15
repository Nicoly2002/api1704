const express = require('express');

const connectDatabase = require('./config/database');
const limiter = require("./config/security");
const Pessoa = require('./models/Pessoa');

const app = express();
const PORT = 3000;

app.use(limiter);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API REST em Node.js com Express.' });
});


// GET
app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await Pessoa.find();
    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao buscar pessoas.',
      erro: error.message,
    });
  }
});


// POST
app.post('/pessoas', async (req, res) => {
  try {
    const { nome, curso } = req.body;

    if (!nome || !curso) {
      return res.status(400).json({
        mensagem: 'Os campos nome e curso sao obrigatorios.',
      });
    }

    const novaPessoa = await Pessoa.create({ nome, curso });

    res.status(201).json(novaPessoa);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao cadastrar pessoa.',
      erro: error.message,
    });
  }
});
//put
app.put('/pessoas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, curso } = req.body;

    const pessoaAtualizada = await Pessoa.findByIdAndUpdate(
      id,
      { nome, curso },
      { new: true, runValidators: true }
    );

    if (!pessoaAtualizada) {
      return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
    }

    res.json(pessoaAtualizada);

  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao atualizar pessoa.',
      erro: error.message,
    });
  }
});
//delete
app.delete('/pessoas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const pessoaDeletada = await Pessoa.findByIdAndDelete(id);

    if (!pessoaDeletada) {
      return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
    }

    res.json({ mensagem: 'Pessoa removida com sucesso.' });

  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao deletar pessoa.',
      erro: error.message,
    });
  }
});



async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Nao foi possivel iniciar a aplicacao.', error.message);
  }
}

startServer()