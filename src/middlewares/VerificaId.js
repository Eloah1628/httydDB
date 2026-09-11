const { Pool } = require("pg");
const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "seu_banco",
    password: "sua_senha",
    port: 5432
});

function VerificaId(tabela) {
    return async function (req, res, next) {
        const id = req.params.id;

        if (!/^\d+$/.test(id) || Number(id) < 1) {
            return res.status(400).json({msg : "ID inválido"});
        } else {
            try {
            const resultado = await db.query(`SELECT * FROM ${tabela} WHERE ID = $1`, [id]);
            if (resultado.rows.length === 0) {
                return res.status(404).json({msg : "ID não encontrado"});
            }
            } catch (erro) {
                return res.status(500).json({msg : "Erro na verificação do ID"});
            } next();
        }
    }
}

module.exports = VerificaId;
