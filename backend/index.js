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
