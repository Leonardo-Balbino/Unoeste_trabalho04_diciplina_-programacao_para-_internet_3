import Evento from "../Model/evento.js";

export default class EventoControl{

 


    //post
    gravar(request, response){
        if (request.method == "POST" && request.is("application/json")){

            const dados = request.body;
            const nome = dados.nome;
            const horario = dados.horario;
            const local = dados.local;
            const preco = dados.preco;
            const quantidade = dados.quantidade;
            const descricao = dados.descricao;

            // nome, horario, local, preco, quantidade, descricao

            if (nome && horario && local && preco && quantidade && descricao) {
                const evento = new Evento(nome, horario, local, preco, quantidade, descricao)

                evento.incluir().then(() => {
                    response.status(201).json({
                    "status": true,
                    "mensagem": "Cliente incluído com sucesso!"
    
                    })
                }).catch((erro) => {
                    response.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao incluir o cliente: " + erro.message
                    });
                });
            }

           

        } else {
            response.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API"
            });
            
        }
    };

    //put/patch
    alterar(request, response){

        if ((request.method == "PUT" || request.method == "PATCH")
            && request.is("application/json")){


                const dados = request.body;
                const nome = dados.nome;
                const horario = dados.horario;
                const local = dados.local;
                const preco = dados.preco;
                const quantidade = dados.quantidade;
                const descricao = dados.descricao;
    
                // nome, horario, local, preco, quantidade, descricao
    
                if (nome && horario && local && preco && quantidade && descricao) {
                    const evento = new Evento(nome, horario, local, preco, quantidade, descricao)

                    evento.alterar().then(() => {
                        response.status(201).json({
                        "status": true,
                        "mensagem": "Cliente alterado com sucesso!"
        
                        })
                    }).catch((erro) => {
                        response.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao Alterar o cliente: " + erro.message
                        });
                    });
    
                    
                } else {
                    response.status(400).json({
                        "status": false,
                        "mensagem": "Requisição inválida! Informe todos os dados desse cliente"
                    });
                    


            }

        } else {
                response.status(405).json({
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API"
                });
                
            }
        };


    //dellet
    excluir(request, response){
        if (request.method == "DELETE" && request.is("application/json")){

            const dados = request.body;
            const nome =  dados.nome;
            

            // nome, horario, local, preco, quantidade, descricao

            if (nome) {
                const evento = new Evento(nome)

                evento.excluir().then(() => {
                    response.status(201).json({
                    "status": true,
                    "mensagem": "Cliente EXCLUIDO com sucesso!"
    
                    })
                }).catch((erro) => {
                    response.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao EXCLUIR o cliente: " + erro.message
                    });
                });
            }

           

        } else {
            response.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API"
            });
            
        }

    };

    //get
    consultar(request, response) {
        let termoBusca = request.params.termoBusca;
        if (!termoBusca) {
            termoBusca = "";
        }
        if (request.method == "GET") {
            const evento = new Evento();
            evento.consultar(termoBusca).then((evento) => {
                return response.status(200).json({
                    "status": true,
                    "lista evento": evento
                });
            }).catch((erro) => {
                response.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao EXCLUIR o cliente: " + erro.message
                });
            });
        }
    }
    

}
