function VerificaId(tabela) {
    return async function (req, res, next) {
        const id = req.params.id;
        if (id < 1) {
            return res.status(400).json({msg: "ID inválido"});
        }
        try {
            const [resultado] = await db.query(`SELECT * FROM ${tabela} WHERE ID = ?`,
    [id]);
            if (resultado.length === 0) {
                return res.status(404).json({msg: "ID não encontrado"});
            }
            next();
        } catch (erro) {
            return res.status(500).json({msg: "Erro na verificação do ID"});
        }
    };
}

module.exports = VerificaId;