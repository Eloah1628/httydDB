const express = require("express");
const { Pool } = require("pg");
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
app.get("/Cavaleiro", (req, res, next) => {
    try {
        if (condition) {
            
            
            res.status(200).json({msg : "Listando..."})
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
})

app.get("/Cavaleiro/:id", (req, res, next) => {
    try {
        if (condition) {
            
            
            res.status(200).json({msg : "Listando por ID..."})
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
})

app.post("/Cavaleiro", async (req, res, next) => {
    const Genero = ["F", "f", "M", "m"];
    try {
        if (condition) {
            
        } else {
            
        }
    } catch (error) {
        
    }
    
})

app.put("/Cavaleiro/:id", (req, res, next) => {
    try {
        if (condition) {
            
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Algo deu errado na edição."})        
    }
})

app.delete("/Cavaleiro/:id", (req, res, next) => {
    try {
        if (condition) {


            res.status(200).json({msg : "Deletado com sucesso!"})  
        } else {
            
        }
    } catch (error) {
        res.status(400).json({msg : "Não encontrado!"})        
    }
})


//Dragão
app.get("/Dragao", (req, res, next) => {
    try {
        if (condition) {
            
            
            res.status(200).json({msg : "Listando..."})
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
})

app.get("/Dragao/:id", (req, res, next) => {
    try {
        if (condition) {
            
            
            res.status(200).json({msg : "Listando por ID..."})
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
})

app.post("/Dragao", (req, res, next) => {
    try {
        if (condition) {
            
        } else {
            
        }
    } catch (error) {
        res.status(400).json({msg :"Não foi possível cadastrar."})
    }
})

app.put("/Dragao/:id", (req, res, next) => {
    try {
        if (condition) {
            
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Algo deu errado na edição."})        
    }
})

app.delete("/Dragao/:id", (req, res, next) => {
    try {
        if (condition) {

            
            res.status(200).json({msg : "Deletado com sucesso!"})  
        } else {
            
        }
    } catch (error) {
        res.status(400).json({msg : "Não encontrado!"})        
    }
})

//Treinamento
app.get("/Treinamento", (req, res, next) => {
    try {
        if (condition) {
            
            
            res.status(200).json({msg : "Listando..."})
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
})

app.get("/Treinamento/:id", (req, res, next) => {
    try {
        if (condition) {
            
            
            res.status(200).json({msg : "Listando por ID..."})
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Não encontrado!"});        
    }
})

app.post("/Treinamento", (req, res, next) => {
    try {
        if (condition) {
            
        } else {
            
        }
    } catch (error) {
        res.status(400).json({msg :"Não foi possível cadastrar."})
    }
})

app.put("/Treinamento:id", () => {
    try {
        if (condition) {
            
        } else {
            
        }
    } catch (error) {
        res.status(404).json({msg : "Algo deu errado na edição."})        
    }
})

app.delete("/Treinamento/:id", (req, res, next) => {
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