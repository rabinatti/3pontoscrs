require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==========================================
// CONFIGURAÇÃO DE UPLOAD (MULTER)
// ==========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `logo_${req.params.id}_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ==========================================
// 1. AUTENTICAÇÃO (CADASTRO E LOGIN)
// ==========================================
app.post('/api/auth/cadastrar', async (req, res) => {
  const {
    nomeUsuario,
    emailUsuario,
    senhaUsuario,
    celularUsuario,
    cpfCnpjUsuario,
    tipoUsuario,
  } = req.body;

  if (!nomeUsuario || !emailUsuario || !senhaUsuario) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
  }

  try {
    const [existente] = await pool.execute(
      'SELECT idUsuario FROM usuario WHERE emailUsuario = ?',
      [emailUsuario]
    );

    if (existente.length > 0) {
      return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senhaUsuario, 10);

    const [resultado] = await pool.execute(
      `INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, celularUsuario, cpfCnpjUsuario, tipoUsuario)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nomeUsuario,
        emailUsuario,
        senhaHash,
        celularUsuario || null,
        cpfCnpjUsuario || null,
        tipoUsuario || 'cliente',
      ]
    );

    res.status(201).json({
      idUsuario: resultado.insertId,
      nomeUsuario,
      emailUsuario,
      celularUsuario: celularUsuario || null,
      cpfCnpjUsuario: cpfCnpjUsuario || null,
      tipoUsuario: tipoUsuario || 'cliente',
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { emailUsuario, senhaUsuario } = req.body;

  if (!emailUsuario || !senhaUsuario) {
    return res.status(400).json({ message: 'Informe e-mail e senha.' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM usuario WHERE emailUsuario = ?',
      [emailUsuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senhaUsuario, usuario.senhaUsuario);

    if (!senhaValida) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    delete usuario.senhaUsuario;
    res.json(usuario);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
});

// ==========================================
// 2. PRESTADORES E EDIÇÃO DE PERFIL
// ==========================================
app.get('/api/prestadores', async (req, res) => {
  const { categoria, busca } = req.query;

  try {
    let sql = `
      SELECT p.*, u.celularUsuario
      FROM prestador p
      LEFT JOIN usuario u ON u.idUsuario = p.idUsuario
      WHERE 1=1
    `;
    const params = [];

    if (categoria && categoria !== 'Todas') {
      sql += ' AND p.categoriaServico = ?';
      params.push(categoria);
    }

    if (busca) {
      sql += ' AND (p.nomeFantasiaPrestador LIKE ? OR p.categoriaServico LIKE ? OR p.descricaoPrestador LIKE ?)';
      params.push(`%${busca}%`, `%${busca}%`, `%${busca}%`);
    }

    const [rows] = await pool.execute(sql, params);
    res.json(rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: 'Erro ao listar prestadores.' });
  }
});

app.put('/api/prestadores/:id', async (req, res) => {
  const { id } = req.params;
  const { descricaoPrestador, categoriaServico } = req.body;

  try {
    await pool.execute(
      'UPDATE prestador SET descricaoPrestador = ?, categoriaServico = ? WHERE idUsuario = ?',
      [descricaoPrestador ?? '', categoriaServico ?? 'Serviços Gerais', id]
    );
    res.json({ message: 'Perfil atualizado com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: 'Erro ao atualizar perfil do prestador.' });
  }
});

app.post('/api/prestadores/:id/logo', upload.single('logotipo'), async (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: 'Nenhuma imagem enviada.' });
  }

  const logotipoUrlPrestador = `/uploads/${req.file.filename}`;

  try {
    await pool.execute(
      'UPDATE prestador SET logotipoUrlPrestador = ? WHERE idUsuario = ?',
      [logotipoUrlPrestador, id]
    );
    res.json({ logotipoUrlPrestador });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: 'Erro ao salvar logotipo no banco.' });
  }
});

// ==========================================
// 3. PACOTES E ASSINATURAS
// ==========================================
app.get('/api/pacotes', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM pacote');
    res.json(rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: 'Erro ao listar pacotes.' });
  }
});

app.post('/api/assinaturas/simular', async (req, res) => {
  const {
    idUsuario,
    idPacote,
    nomeFantasiaPrestador,
    categoriaServico,
    descricaoPrestador,
  } = req.body;

  if (!idUsuario || !idPacote) {
    return res.status(400).json({ message: 'Usuário e pacote são obrigatórios.' });
  }

  try {
    const [prestadoresExistentes] = await pool.execute(
      'SELECT idPrestador FROM prestador WHERE idUsuario = ?',
      [idUsuario]
    );

    let idPrestador;

    if (prestadoresExistentes.length > 0) {
      idPrestador = prestadoresExistentes[0].idPrestador;
      await pool.execute(
        `UPDATE prestador
         SET nomeFantasiaPrestador = COALESCE(?, nomeFantasiaPrestador),
             categoriaServico = COALESCE(?, categoriaServico),
             descricaoPrestador = COALESCE(?, descricaoPrestador)
         WHERE idPrestador = ?`,
        [nomeFantasiaPrestador || null, categoriaServico || null, descricaoPrestador || null, idPrestador]
      );
    } else {
      const [usuarioRows] = await pool.execute(
        'SELECT nomeUsuario FROM usuario WHERE idUsuario = ?',
        [idUsuario]
      );
      const nomePadrao = usuarioRows[0]?.nomeUsuario || 'Prestador';

      const [novoPrestador] = await pool.execute(
        `INSERT INTO prestador (idUsuario, nomeFantasiaPrestador, categoriaServico, descricaoPrestador)
         VALUES (?, ?, ?, ?)`,
        [
          idUsuario,
          nomeFantasiaPrestador || nomePadrao,
          categoriaServico || 'Serviços Gerais',
          descricaoPrestador || '',
        ]
      );
      idPrestador = novoPrestador.insertId;
    }

    await pool.execute(
      `INSERT INTO assinatura (idPrestador, idPacote, dataInicioAssinatura, statusAssinatura)
       VALUES (?, ?, CURDATE(), 'ativa')`,
      [idPrestador, idPacote]
    );

    await pool.execute(
      "UPDATE usuario SET tipoUsuario = 'prestador' WHERE idUsuario = ?",
      [idUsuario]
    );

    res.status(201).json({
      message: 'Assinatura ativada com sucesso!',
      idPrestador,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: 'Erro ao processar assinatura.' });
  }
});

// ==========================================
// 4. PEDIDOS / SOLICITAÇÕES
// ==========================================
app.get('/api/pedidos', async (req, res) => {
  const { idUsuario } = req.query;

  try {
    let sql = 'SELECT * FROM pedido';
    const params = [];

    if (idUsuario) {
      sql += ' WHERE idUsuario = ?';
      params.push(idUsuario);
    }

    const [rows] = await pool.execute(sql, params);
    res.json(rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: 'Erro ao listar pedidos.' });
  }
});

app.post('/api/pedidos', async (req, res) => {
  const { idUsuario, idPrestador, descricaoPedido, statusPedido } = req.body;

  try {
    const [resultado] = await pool.execute(
      `INSERT INTO pedido (idUsuario, idPrestador, descricaoPedido, statusPedido)
       VALUES (?, ?, ?, ?)`,
      [idUsuario, idPrestador, descricaoPedido || '', statusPedido || 'pendente']
    );
    res.status(201).json({ idPedido: resultado.insertId });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: 'Erro ao criar pedido.' });
  }
});

// ==========================================
// INICIALIZAÇÃO DO SERVIDOR
// ==========================================
app.listen(PORT, () => {
  console.log(`Servidor PredialLink rodando na porta ${PORT}`);
});