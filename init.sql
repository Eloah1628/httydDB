/*
Relacionamento baseado em HTTYD;
            Tabelas:
1. Cavaleiro
2. Dragao
3. Treinamento
*/

CREATE TABLE IF NOT EXISTS Cavaleiro(
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(20) NOT NULL UNIQUE,
    Sobrenome VARCHAR(20) NOT NULL,
    Idade INTEGER NOT NULL CHECK (Idade BETWEEN 14 AND 80),
    Sexo CHAR(1) NOT NULL CHECK (Sexo IN ('F', 'f', 'M', 'm')),
    Funcao VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS Dragao(
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(20) NOT NULL UNIQUE,
    Especie VARCHAR(40) NOT NULL,
    Sexo CHAR(1) NOT NULL CHECK (Sexo IN ('F', 'f', 'M', 'm')),
    Tipo VARCHAR(20) NOT NULL CHECK (Tipo IN ('Boulder', 'Mystery', 'Sharp', 'Stoker', 'Strike', 'Tidal', 'Tracker')),
    TreinamentoID INTEGER,
    CavaleiroID INTEGER,

    /*FK*/
    CONSTRAINT FK_DragaoCavaleiro FOREIGN KEY (CavaleiroID) REFERENCES Cavaleiro(ID)
);

CREATE TABLE IF NOT EXISTS Treinamento(
    ID SERIAL PRIMARY KEY,
    Tipo VARCHAR(20) NOT NULL,
    QuemRealiza INTEGER NOT NULL,
    DragaoParticipante INTEGER NOT NULL,
    Tempo TIME NOT NULL,

    /*FK*/
    CONSTRAINT FK_TreinamentoCavaleiro FOREIGN KEY(QuemRealiza) REFERENCES Cavaleiro(ID),
    CONSTRAINT FK_TreinamentoDragao FOREIGN KEY(DragaoParticipante) REFERENCES Dragao(ID)
);

/*FK*/
ALTER TABLE Cavaleiro ADD COLUMN DragaoID INTEGER NOT NULL;
ALTER TABLE Cavaleiro ADD CONSTRAINT FK_CavaleiroPossuiDragao FOREIGN KEY(DragaoID) REFERENCES Dragao(ID);

/*JOIN's*/
SELECT Cavaleiro.Funcao, Treinamento.ID FROM Cavaleiro JOIN Treinamento ON Cavaleiro.Funcao = Treinamento.ID;

SELECT Dragao.CavaleiroID, Cavaleiro.ID FROM Dragao JOIN Cavaleiro ON Dragao.CavaleiroID = Cavaleiro.ID;
SELECT Dragao.TreinamentoID, Treinamento.ID FROM Dragao JOIN Treinamento ON Dragao.TreinamentoID = TreinamentoID;

SELECT Treinamento.QuemRealiza, Cavaleiro.ID FROM Treinamento JOIN Cavaleiro ON Treinamento.QuemRealiza = Cavaleiro.ID;
SELECT Treinamento.DragaoParticipante, Dragao.ID FROM Treinamento JOIN Dragao ON Treinamento.DragaoParticipante = Dragao.ID;