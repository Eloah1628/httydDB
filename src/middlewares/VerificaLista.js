const { Pool } = require("pg");
const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "seu_banco",
    password: "sua_senha",
    port: 5432
});

function VerificaLista(lista, valor) {
    return function (req, res, next) {
        const item = req.body[valor];
        if (!lista.includes(item)) {
            return res.status(400).json({msg : `${valor} inválido`});
        }
        next();
    }
}

module.exports = VerificaLista;
