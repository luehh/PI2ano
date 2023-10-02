    const express=require('express')
    const app = express();
    app.use(express.urlencoded({ extended: true}));
    app.use(express.json())
    app.listen(9000, () => console.log("OK"));

    const mysql = require('mysql2/promise')
    const connection = mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: ''
    })
    
    app.get('/',(req,res)=>{
        res.send("Luisa");
    })

    const getAllPessoas = async ()=>{
        const [query] = await connection
        .execute('select * from testepessoa.pessoa');
        return query; 
    }
    
    app.get('/pessoa', async (req, res) => {
        const [query] = await connection.execute('SELECT * FROM TestePessoa.Pessoa');
        return res.status(200).json(query);
        });
    
    app.get('/pessoa/:id', async (req, res) => {
        const { id } = req.params;
        const [query] = await connection.execute('SELECT * FROM TestePessoa.Pessoa WHERE id = ?', [id]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });
    
    app.get('/pessoa/busca/:nome', async (req, res) => {
        const { nome } = req.params;
        const [query] = await connection.execute('SELECT * FROM TestePessoa.Pessoa WHERE nome LIKE ?', [`%${nome}%`]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });
    
    app.post('/pessoa', async (req, res) => {
        const { nome, email } = req.body;
        const [query] = await connection.execute('INSERT INTO TestePessoa.Pessoa (nome, email) VALUES (?, ?)', [nome, email]);
        return res.status(200).json(query);
        });
    
    app.put('/pessoa/:id', async (req, res) => {
        const { id } = req.params;
        const [query] = await connection.execute('UPDATE TestePessoa.Pessoa SET nome = ?, email = ? WHERE id = ?', [req.body.nome, req.body.email, id]);
        return res.status(200).json(query);
        });
    
    app.delete('/pessoa/:id', async (req, res) => {
        const { id } = req.params;
        const [query] = await connection.execute('DELETE FROM TestePessoa.Pessoa WHERE id = ?', [id]);
        return res.status(200).json(query);
        });
//doador

        
    const getAllDoadores = async ()=>{
        const [query] = await connection
        .execute('select * from doabit.doador');
        return query;
    }

    app.get('/doador', async (req, res) => {
        const [query] = await connection.execute('SELECT * FROM doabit.doador');
        return res.status(200).json(query);
        });

    app.get('/doador/:id_doador', async (req, res) => {
        const { id_doador } = req.params;
        const [query] = await connection.execute('SELECT * FROM doabit.doador WHERE id_doador = ?', [id_doador]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });

    app.get('/doador/busca/:nome', async (req, res) => {
        const { nome } = req.params;
        const [query] = await connection.execute('SELECT * FROM doabit.doador WHERE nome LIKE ?', [`%${nome}%`]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });

    app.post('/doador', async (req, res) => {
        const { nome, foto_perfil, usuario } = req.body;
        const [query] = await connection.execute('INSERT INTO doabit.doador (nome, foto_perfil, usuario) VALUES (?, ?, ?)', [nome, foto_perfil, usuario]);
        return res.status(200).json(query);
        });

    app.put('/doador/:id_doador', async (req, res) => {
        const { id_doador } = req.params;
        const [query] = await connection.execute('UPDATE doabit.doador SET nome = ?, foto_perfil = ?, usuario = ? WHERE id_doador = ?', [req.body.nome, req.body.foto_perfil, req.body.usuario, id_doador]);
        return res.status(200).json(query);
        });

    app.delete('/doador/:id_doador', async (req, res) => {
        const { id_doador } = req.params;
        const [query] = await connection.execute('DELETE FROM doabit.doador WHERE id_doador = ?', [id_doador]);
        return res.status(200).json(query);
        });

    // cartao

    const getAllCartoes = async ()=>{
        const [query] = await connection
        .execute('select * from doabit.cartao');
        return query;
    }

    app.get('/cartao', async (req, res) => {
        const [query] = await connection.execute('SELECT * FROM doabit.cartao');
        return res.status(200).json(query);
        });

    app.get('/cartao/:id_cartao', async (req, res) => {
        const { id_cartao } = req.params;
        const [query] = await connection.execute('SELECT * FROM doabit.cartao WHERE id_cartao = ?', [id_cartao]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });

    app.get('/cartao/busca/:nome', async (req, res) => {
        const { nome } = req.params;
        const [query] = await connection.execute('SELECT * FROM doabit.cartao WHERE nome LIKE ?', [`%${nome}%`]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });

    app.post('/cartao', async (req, res) => {
        const { nome, numero, validade, doador_id_doador } = req.body;
        const [query] = await connection.execute('INSERT INTO doabit.cartao (nome, numero, validade, doador_id_doador) VALUES (?, ?, ?, ?)', [nome, numero, validade, doador_id_doador]);
        return res.status(200).json(query);
        });

    app.put('/cartao/:id_cartao', async (req, res) => {
        const { id_cartao } = req.params;
        const [query] = await connection.execute('UPDATE doabit.cartao SET nome = ?, numero = ?, validade = ?, doador_id_doador = ? WHERE id_cartao = ?', [req.body.nome, req.body.numero, req.body.validade, req.doador_id_doador, id_cartao]);
        return res.status(200).json(query);
        });

    app.delete('/cartao/:id_cartao', async (req, res) => {
        const { id_cartao } = req.params;
        const [query] = await connection.execute('DELETE FROM doabit.cartao WHERE id_cartao = ?', [id_cartao]);
        return res.status(200).json(query);
        });

    // doacoes

    const getAllDoacoes = async ()=>{
        const [query] = await connection
        .execute('select * from doabit.doacao');
        return query;
    }

    app.get('/doacao', async (req, res) => {
        const [query] = await connection.execute('SELECT * FROM doabit.doacao');
        return res.status(200).json(query);
        });

    app.get('/doacao/:id_doacao', async (req, res) => {
        const { id_doacao } = req.params;
        const [query] = await connection.execute('SELECT * FROM doabit.doacao WHERE id_doacao = ?', [id_doacao]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });

    app.get('/doacao/busca/:valor', async (req, res) => {
        const { valor } = req.params;
        const [query] = await connection.execute('SELECT * FROM doabit.doacao WHERE valor LIKE ?', [`%${valor}%`]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });

    app.post('/doacao', async (req, res) => {
        const { valor, forma_pagamento, doador_id_doador, campanha_id_campanha } = req.body;
        const [query] = await connection.execute('INSERT INTO doabit.doacao (valor, forma_pagamento, doador_id_doador, campanha_id_campanha) VALUES (?, ?, ?, ?)', [valor, forma_pagamento, doador_id_doador, campanha_id_campanha]);
        return res.status(200).json(query);
        });

    app.put('/doacao/:id_doacao', async (req, res) => {
        const { id_doacao } = req.params;
        const [query] = await connection.execute('UPDATE doabit.doacao SET valor = ?, forma_pagamento = ?, doador_id_doador = ?, campanha_id_campanha =? WHERE id_doacao = ?', [req.body.valor, req.body.forma_pagamento, req.doador_id_doador, req.campanha_id_campanha, id_doacao]);
        return res.status(200).json(query);
        });

    app.delete('/doacao/:id_doacao', async (req, res) => {
        const { id_doacao } = req.params;
        const [query] = await connection.execute('DELETE FROM doabit.doacao WHERE id_doacao = ?', [id_doacao]);
        return res.status(200).json(query);
        });

    // campanha

    const getAllCampanhas = async ()=>{
        const [query] = await connection
        .execute('select * from doabit.campanha');
        return query;
    }

    app.get('/campanha', async (req, res) => {
        const [query] = await connection.execute('SELECT * FROM doabit.campanha');
        return res.status(200).json(query);
        });

    app.get('/campanha/:id_campanha', async (req, res) => {
        const { id_campanha } = req.params;
        const [query] = await connection.execute('SELECT * FROM doabit.campanha WHERE id_campanha = ?', [id_campanha]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });

    app.get('/campanha/busca/:titulo', async (req, res) => {
        const { titulo } = req.params;
        const [query] = await connection.execute('SELECT * FROM doabit.campanha WHERE titulo LIKE ?', [`%${titulo}%`]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });

    app.post('/campanha', async (req, res) => {
        const { titulo, descricao, meta, video, imagem, criador_campanha_id_criador } = req.body;
        const [query] = await connection.execute('INSERT INTO doabit.campanha (titulo, descricao, meta, video, imagem, criador_campanha_id_criador) VALUES (?, ?, ?, ?, ?, ?)', [titulo, descricao, meta, video, imagem, criador_campanha_id_criador]);
        return res.status(200).json(query);
        });

    app.put('/campanha/:id_campanha', async (req, res) => {
        const { id_campanha } = req.params;
        const [query] = await connection.execute('UPDATE doabit.campanha SET titulo = ?, descricao = ?, meta = ?, video = ?, imagem = ?, criador_campanha_id_criador = ? WHERE id_campanha = ?', [req.body.titulo, req.body.descricao, req.body.meta, req.body.video, req.body.imagem, req.criador_campanha_id_criador, id_campanha]);
        return res.status(200).json(query);
        });

    app.delete('/campanha/:id_campanha', async (req, res) => {
        const { id_campanha } = req.params;
        const [query] = await connection.execute('DELETE FROM doabit.campanha WHERE id_campanha = ?', [id_campanha]);
        return res.status(200).json(query);
        });

    // criador da campanha

    const getAllCriadores = async ()=>{
        const [query] = await connection
        .execute('select * from doabit.criador_campanha');
        return query;
    }

    app.get('/criador_campanha', async (req, res) => {
        const [query] = await connection.execute('SELECT * FROM doabit.criador_campanha');
        return res.status(200).json(query);
        });

    app.get('/criador_campanha/:id_criador', async (req, res) => {
        const { id_criador } = req.params;
        const [query] = await connection.execute('SELECT * FROM doabit.criador_campanha WHERE id_criador = ?', [id_criador]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });

    app.get('/criador_campanha/busca/:nome', async (req, res) => {
        const { nome } = req.params;
        const [query] = await connection.execute('SELECT * FROM doabit.criador_campanha WHERE nome LIKE ?', [`%${nome}%`]);
        if (query.length === 0) return res.status(400).json({ mensagem: 'Não encontrado.' });
        return res.status(200).json(query);
        });

    app.post('/criador_campanha', async (req, res) => {
        const { nome, foto_perfil } = req.body;
        const [query] = await connection.execute('INSERT INTO doabit.criador_campanha (nome, foto_perfil) VALUES (?, ?)', [nome, foto_perfil]);
        return res.status(200).json(query);
        });

    app.put('/criador_campanha/:id_campanha', async (req, res) => {
        const { id_criador } = req.params;
        const [query] = await connection.execute('UPDATE doabit.criador_campanha SET nome = ?, foto_perfil = ? WHERE id_criador = ?', [req.body.nome, req.body.foto_perfil, id_criador]);
        return res.status(200).json(query);
        });

    app.delete('/criador_campanha/:id_criador', async (req, res) => {
        const { id_criador } = req.params;
        const [query] = await connection.execute('DELETE FROM doabit.criador_campanha WHERE id_criador = ?', [id_criador]);
        return res.status(200).json(query);
        });