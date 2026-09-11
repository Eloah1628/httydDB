function VerificaLista(lista, valor) {
    return function (req, res, next) {
        const item = req.body[valor];
        if (!lista.includes(item)) {
            return res.status(400).json({msg : `${valor} inválido`});
        }
    }
}

module.exports = VerificaLista;