    const express=require('express')
    const app = express();
    app.listen(9000, () => console.log("OK"));
    
    app.get('/',(req,res)=>{
        res.send("Luisa");
    })

    const getAllPessoas = async ()=>{
        const [query] = await connection
        .execute('select * from testepessoa.pessoa');
        return query; 
    }

    app.get('/pesspa/:id', async (req,res)=>{
        const {id} = req.params;
        const [query] = await connection.execute('select * from TestePessoa.Pessoa where id = ?', [id]);
        if(query.lenght === 0) return res.status(400).json({mensagem: 'Nao encontrado. '})
        return res.status(200).json(query);
        })

    app.post('/pessoa', async (req,res)=>{
        const {nome, email} = req.body
        const [query]= await connection.execute('insert into TestePessoa.Pessoa (nome,email) values (?,?)', [nome,email])
        return query
        })