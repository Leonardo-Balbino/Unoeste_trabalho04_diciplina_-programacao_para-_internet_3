form.onsubmit = gravaEvento;
const eventoAPI = 'http://localhost:4000/evento';

function gravaEvento() {

    const parametros = [
        'evento.nome',
        'evento.horario',
        'evento.local',
        'evento.preco',
        'evento.quantidade',
        'evento.descricao'
    ];

        const eventoAPI = {

             nome: document.getElementById('nome').value,
             horario: document.getElementById('horario').value,
             local: document.getElementById('local').value,
             preco: document.getElementById('preco').value,
             quantidade: document.getElementById('quantidade').value,
             descricao: document.getElementById('descricao').value,

        }
        


    fetch(eventoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventoAPI)
    }).then((response) => {
        return response.json();
    }).then((responseApi) => {
        if (responseApi.status == true) {
            exibirMensagem(responseApi.mensagem, 'green');
        }
        else{
            exibirMensagem(responseApi.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });


}



function exibirTabelaEventos(listaEventos){
    if (listaEventos.length > 0) {
        const espacoTabela = document.getElementById('containerTabela');
        const tabela = document.createElement('table');
        tabela.classList="table table-striped table-hover";
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th>Nome</th
                <th>Horário</th>
                <th>Local</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Descrição</th>

                
            </tr>
        `;
        const corpo = document.createElement('tbody');
        for (const evento of listaEventos) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${evento.nome}</td>
                <td>${evento.horario}</td>
                <td>${evento.local}</td>
                <td>${evento.preco}</td>
                <td>${evento.quantidade}</td>
                <td>${evento.descricao}</td>
                <td>
                    <button onclick="selecionarEvento('${evento.nome}','${evento.horario}','${evento.local}','${evento.preco}','${evento.descricao}','EDITAR')">Alterar</button>
                    <button onclick="selecionarEvento('${evento.nome}','${evento.horario}','${evento.local}','${evento.preco}','${evento.descricao}','EXCLUIR')">Excluir</button>
                </td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(cabecalho);
        tabela.appendChild(corpo);
        espacoTabela.innerHTML="";
        espacoTabela.appendChild(tabela);
    }
    else{
        exibirMensagem('Nenhum evento encontrado.');
    }
}

function exibirMensagem(mensagem, cor = 'black') {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = "<p style='color: " + cor + ";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}


function excluirevento(){

    fetch(eventoAPI, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: document.getElementById('nome').value})
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}

function atualizarEvento(){

    const objetoEvento = {
        nome: document.getElementById('nome').value,
        horario: document.getElementById('horario').value,
        local: document.getElementById('local').value,
        preco: document.getElementById('preco').value,
        quantidade: document.getElementById('quantidade'),
        descricao: document.getElementById('descricao').value
    }

    fetch(eventoAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEvento)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
        }
        else{
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });

}