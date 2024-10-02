import conectar from "./conect.js";
import Evento from "../Model/evento.js";
export default class EventDAO {

    

    constructor(){

        console.log("teste")
        this.init(); //iniciailizar o banco de dados
    }

    // #nome
    // #data
    // #horario
    // #local
    // #preco
    // #quantidade
    // #descricao

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS evento (
                pk INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(80) NOT NULL,
                horario VARCHAR(10) NOT NULL,
                local VARCHAR(100) NOT NULL,
                preco VARCHAR(20) NOT NULL,
                quantidade VARCHAR(10) NOT NULL,
                descricao VARCHAR(10) NOT NULL
            );`;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("O banco de dados não pode ser iniciado!");
            console.log(erro);
        }
    }

    async gravar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `INSERT INTO evento (nome, horario, local, preco, quantidade, descricao) 
                         VALUES (?, ?, ?, ?, ?, ?);`;
            const parametros = [
                evento.nome,
                evento.horario,
                evento.local,
                evento.preco,
                evento.quantidade,
                evento.descricao
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `UPDATE evento SET 
            nome = ?, 
            horario = ?, 
            local = ?, 
            preco = ?,
            quantidade = ?,
            descricao = ?`;
            const parametros = [
                evento.nome,
                evento.horario,
                evento.local,
                evento.preco,
                evento.quantidade,
                evento.descricao,
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    
    async excluir(nome) {
        const conexao = await conectar();
        const sql = `DELETE FROM evento WHERE nome = ?;`; // Altera a consulta para usar o nome
        const parametros = [nome];

        //console.log("Aqui", parametros);

        try {
            const [result] = await conexao.execute(sql, parametros);
            if (result.affectedRows === 0) {
                console.log("Nenhum evento encontrado para excluir.");
            } else {
                console.log("Evento excluído com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao excluir evento:", error);
        } finally {
            await global.poolConexoes.releaseConnection(conexao);
        }
    }
    

   
    async consultar(termoBusca) {
        let sql = "";
        let parametros = [];
        if (termoBusca) {
            sql = `SELECT * FROM evento WHERE nome = ? order by nome;`;
            parametros.push(termoBusca);
        } else {
            sql = `SELECT * FROM evento order by nome;`;
        }
    
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);

       
        const listaEventos = [];
    
        // Verificar se foram encontrados registros
        if (registros.length === 0) {
            console.log("Nenhum evento encontrado.");
            return listaEventos;
        }
    
        for (const registro of registros) {

            
            const evento = new Evento(
                registro.nome,
                registro.horario,
                registro.local,
                registro.preco,
                registro.quantidade,
                registro.descricao,
                registro.pk
            );
            listaEventos.push(evento);
        }
    
        await global.poolConexoes.releaseConnection(conexao);
        return listaEventos;
    }






}