const express = require("express");
const { Pool } = require("pg");
const VerificaId = require("./middlewares/verificaId");
const app = express();
app.use(express.json());

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "seu_banco",
    password: "sua_senha",
    port: 5432
});

//Cavaleiro
app.get("/Cavaleiro", async (req, res) => {
    try {
        const ListaCavaleiros = await db.query("SELECT * FROM Cavaleiro");
        res.status(200).json(ListaCavaleiros);

    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
})

app.get("/Cavaleiro/:id", VerificaId("Cavaleiro"), async (req, res) => {

    try {
        const cavaleiro = await db.query("SELECT * FROM Dragao WHERE id = $1", [id]);
        res.status(200).json(cavaleiro);
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
})

app.post("/Cavaleiro", async (req, res) => {
    const {nome, sobrenome, idade, sexo, funcao} = req.body;
    GenerosAceitaveis = ['F', 'f', 'M', 'm'];

    try {
        if (!sexo in GenerosAceitaveis) {
            res.status(405).json({msg: "Sexo não identificado."});
        } else if(idade < 13 || idade > 80) {
            res.status(405).json({msg : "Você não tem idade para isso!"});
        } else {
            await db.query("INSERT INTO Cavaleiro(nome, sobrenome, idade, sexo, funcao) VALUES($1, $2, $3, $4, $5)", [nome, sobrenome, idade, sexo, funcao]);

            res.status(200).json({msg : "Cavaleiro adicionado com sucesso!"});
        }
    } catch (error) {
        res.status(400).json({msg :"Não foi possível cadastrar."})
    }
})

app.put("/Cavaleiro/:id", VerificaId("Cavaleiro"), async (req, res) => {
    const {nome, sobrenome, idade, sexo, funcao} = req.body;

    try {
        const cavaleiro = await db.query("UPDATE Cavaleiro SET name=$1, sobrenome=$2, idade=$3, sexo=$4, funcao=$5 WHERE id=$6", [nome, sobrenome, idade, sexo, funcao, id]);
    } catch (error) {
        res.status(404).json({msg : "Algo deu errado na edição."})        
    }
})

app.delete("/Cavaleiro/:id", VerificaId("Cavaleiro"), async (req, res) => {
    try {
        const cavaleiro = await db.query("DELETE * FROM Cavaleiro WHERE id = $1", [id]);
        
        res.status(200).json({msg : "Cavaleiro deletado com sucesso!"});
    } catch (error) {
        res.status(400).json({msg : "Não encontrado!"});       
    }
})


//Dragão
app.get("/Dragao", async (req, res) => {
    try {
        const [ListaDragoes] = await db.query("SELECT * FROM Dragao")
        res.status(200).json(ListaDragoes);

    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
})

app.get("/Dragao/:id", VerificaId("Dragao"), (req, res) => {
    try {
        res.status(200).json({msg : "Listando dragão por ID..."});
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
})

app.post("/Dragao", (req, res) => {
    tipo = ['Boulder', 'Mystery', 'Sharp', 'Stoker', 'Strike', 'Tidal', 'Tracker'];
    try {
        if (condition) {
            

            res.status(200).json({msg : "Dragão adicionado com sucesso!"})} else {
            
        }
    } catch (error) {
        res.status(400).json({msg :"Não foi possível cadastrar."})
    }
})

app.put("/Dragao/:id", VerificaId("Dragao"), (req, res) => {
    try {
        if (condition) {


            res.status(200).json({msg : "Dragão editado com sucesso!"})     
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Algo deu errado na edição."})        
    }
})

app.delete("/Dragao/:id", VerificaId("Dragao"), (req, res) => {
    try {
        if (condition) {

            
            res.status(200).json({msg : "Dragão deletado com sucesso!"})  
        } else {
            
        }
    } catch (error) {
        res.status(400).json({msg : "Não encontrado!"})        
    }
})

//Treinamento
app.get("/Treinamento", (req, res) => {
    try {
        if (condition) {
            
            
            res.status(200).json({msg : "Listando treinamentos disponíveis..."})
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
})

app.get("/Treinamento/:id", VerificaId("Treinamento"), (req, res) => {
    try {
        if (condition) {
            
            
            res.status(200).json({msg : "Listando treinamento por ID..."})
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Treinamento não encontrado!"});        
    }
})

app.post("/Treinamento", (req, res) => {
    try {
        if (condition) {
            

            res.status(200).json({msg : "Treinamento adicionado com sucesso!"})} else {
            
        }
    } catch (error) {
        res.status(400).json({msg :"Não foi possível cadastrar."})
    }
})

app.put("/Treinamento:id", VerificaId("Treinamento"), () => {
    try {
        if (condition) {


            res.status(200).json({msg : " editado com sucesso!"})     
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Algo deu errado na edição."})        
    }
})

app.delete("/Treinamento/:id", VerificaId("Treinamento"), (req, res) => {
    try {
        if (condition) {


            res.status(200).json({msg : "Deletado com sucesso!"})  
        } else {
            
        }
    } catch (error) {
        res.status(400).json({msg : "Não encontrado!"})        
    }
})


app.listen(3000, () => {
    console.log("Site funcionando em http://localhost:3000");
});