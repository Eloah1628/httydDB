const express = require("express");
const { Pool } = require("pg");
const VerificaId = require("./middlewares/verificaId");
const VerificaLista = require("./middlewares/VerificaLista");
const Documentacao = require("...")
const app = express();
app.use(express.json());

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "seu_banco",
    password: "sua_senha",
    port: 5432
});

//O que aparece no site principal
app.get("/", ){

}

//Variáveis conferidas
const GenerosAceitaveis = ['F', 'f', 'M', 'm'];
const TiposAceitaveis = ['Boulder', 'Mystery', 'Sharp', 'Stoker', 'Strike', 'Tidal', 'Tracker'];

//Cavaleiro
app.get("/Cavaleiro", async (req, res) => {
    try {
        const ListaCavaleiros = await db.query("SELECT * FROM Cavaleiro");
        res.status(200).json(ListaCavaleiros);

    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
});

app.get("/Cavaleiro/:id", VerificaId("Cavaleiro"), async (req, res) => {
    id = req.params.id;

    try {
        const cavaleiro = await db.query("SELECT * FROM Dragao WHERE id = $1", [id]);
        res.status(200).json(cavaleiro);
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
});

app.post("/Cavaleiro", VerificaLista(GenerosAceitaveis, "sexo"), async (req, res) => {
    const {nome, sobrenome, idade, sexo, funcao} = req.body;

    try { 
        if(idade < 13 || idade > 80) {
            res.status(405).json({msg : "Você não tem idade para isso!"});
        } else {
            await db.query("INSERT INTO Cavaleiro(nome, sobrenome, idade, sexo, funcao) VALUES($1, $2, $3, $4, $5)", [nome, sobrenome, idade, sexo, funcao]);
            res.status(200).json({msg : "Cavaleiro adicionado com sucesso!"});
        }
    } catch (error) {
        res.status(400).json({msg :"Não foi possível cadastrar."});
    }
});

app.put("/Cavaleiro/:id", VerificaId("Cavaleiro"), async (req, res) => {
    const {nome, sobrenome, idade, sexo, funcao} = req.body;
    id = req.params.id;
    try {
        const cavaleiro = await db.query("UPDATE Cavaleiro SET name=$1, sobrenome=$2, idade=$3, sexo=$4, funcao=$5 WHERE id=$6", [nome, sobrenome, idade, sexo, funcao, id]);
    } catch (error) {
        res.status(404).json({msg : "Algo deu errado na edição."});        
    }
});

app.delete("/Cavaleiro/:id", VerificaId("Cavaleiro"), async (req, res) => {
    id = req.params.id;
    try {
        const cavaleiro = await db.query("DELETE * FROM Cavaleiro WHERE id = $1", [id]);
        
        res.status(200).json({msg : "Cavaleiro deletado com sucesso!"});
    } catch (error) {
        res.status(400).json({msg : "Não encontrado!"});       
    }
});


//Dragão
app.get("/Dragao", async (req, res) => {
    try {
        const ListaDragao = await db.query("SELECT * FROM Dragao");
        res.status(200).json(ListaDragao);
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
});

app.get("/Dragao/:id", VerificaId("Dragao"), async (req, res) => {
    id = req.params.id;
    try {
        const dragao = await db.query("SELECT * FROM Dragao WHERE id = $1", [id]);
        res.status(200).json(dragao);
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
});

app.post("/Dragao", VerificaLista(GenerosAceitaveis, "sexo"), VerificaLista(TiposAceitaveis, "tipo"), async (req, res) => {
    const {nome, especie, sexo, tipo, treinamentoID, cavaleiroID} = req.body;
    try {
        await db.query("INSERT INTO Dragao(nome, especie, sexo, tipo, treinamentoID, cavaleiroID) VALUES($1, $2, $3, $4, $5, $6)", [nome, especie, sexo, tipo, treinamentoID, cavaleiroID]);
        res.status(200).json({msg : "Dragão adicionado com sucesso!"});
    } catch (error) {
        res.status(400).json({msg :"Não foi possível cadastrar."});
    }
});

app.put("/Dragao/:id", VerificaId("Dragao"), VerificaLista(GenerosAceitaveis, "sexo"), VerificaLista(TiposAceitaveis, "tipo"), async (req, res) => {
    const {nome, especie, sexo, tipo, treinamentoID, cavaleiroID} = req.body;
    id = req.params.id;
    try {
        await db.query("UPDATE Dragao SET nome=$1, especie=$2, sexo=$3, tipo=$4, treinamentoID=$5, cavaleiroID=$6 WHERE id=$7", [nome, especie, sexo, tipo, treinamentoID, cavaleiroID, id]);
        res.status(200).json({msg : "Dragão editado com sucesso!"});
    } catch (error) {
        res.status(404).json({msg : "Algo deu errado na edição."});        
    }
});

app.delete("/Dragao/:id", VerificaId("Dragao"), async (req, res) => {
    id = req.params.id;
    try {
        await db.query("DELETE FROM Dragao WHERE id=$1", [id]);
        res.status(200).json({msg : "Treinamento adicionado com sucesso!"});
    } catch (error) {
        res.status(400).json({msg : "Não encontrado!"});  
    }
});

//Treinamento
app.get("/Treinamento", async (req, res) => {
    try {
        const ListaTreinamento = await db.query("SELECT * FROM Treinamento");
        res.status(200).json(ListaTreinamento);
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
});

app.get("/Treinamento/:id", VerificaId("Treinamento"), async (req, res) => {
    id = req.params.id;
    try {
        const treinamento =  await db.query("SELECT * FROM Treinamento WHERE id = $1", [id]);      
        res.status(200).json(treinamento);
    } catch (error) {
        res.status(404).json({msg : "Treinamento não encontrado!"});        
    }
});

app.post("/Treinamento", async (req, res) => {
    const {tipo, quemrealiza, Dragaoparticipante, tempo} = req.body;
    try {
        await db.query("INSERT INTO Treinamento(tipo, quemrealiza, Dragaoparticipante, tempo) VALUES($1, $2, $3, $4)", [tipo, quemrealiza, Dragaoparticipante, tempo])
        res.status(200).json({msg : "Treinamento adicionado com sucesso!"});
    } catch (error) {
        res.status(400).json({msg :"Não foi possível cadastrar."});
    }
});

app.put("/Treinamento/:id", VerificaId("Treinamento"), async (req, res) => {
    const {tipo, quemrealiza, Dragaoparticipante, tempo} = req.body;
    id = req.params.id;
    try {
        await db.query ("UPDATE Treinamento SET tipo=$1, quemrealiza=$2, Dragaoparticipante=$3, tempo=$4 WHERE id=$5", [tipo, quemrealiza, Dragaoparticipante, tempo, id])
            res.status(200).json({msg : "Treinamento editado com sucesso!"});     
    } catch (error) {
        res.status(404).json({msg : "Algo deu errado na edição."});        
    }
});

app.delete("/Treinamento/:id", VerificaId("Treinamento"), async (req, res) => {
    id = req.params.id;
    try {
        await db.query("DELETE FROM Treinamento WHERE id=$1", [id])
            res.status(200).json({msg : "Deletado com sucesso!"}); 
    } catch (error) {
        res.status(400).json({msg : "Não encontrado!"});        
    }
});


app.listen(3000, () => {
    console.log("Site funcionando em http://localhost:3000");
});