import EventDAO from "../Dao/EventoDAO.js"

export default class Evento {
    //atributos Privados

    #nome
    #horario
    #local
    #preco
    #quantidade
    #descricao
    

    constructor(nome, horario, local, preco, quantidade, descricao) {
        this.#nome = nome;
        this.#horario = horario;
        this.#local = local;
        this.#preco = preco;
        this.#quantidade = quantidade;
        this.#descricao = descricao;
        

    }

    get nome(){
        return this.#nome;
    }

    set nome(newNome){
        this.#nome = newNome;
    }



    get horario(){
        return this.#horario;
    }

    set horario(newHorario){
        this.#horario = newHorario;
    }

    get local(){
        return this.#local;
    }

    set local(newLocal){
        this.#local = newLocal;
    }

    get preco(){
        return this.#preco;
    }

    set preco(newPreco){
        this.#preco = newPreco;
    }

    get quantidade(){
        return this.#quantidade;
    }

    set quantidade(newQuantidade){
        this.#quantidade = newQuantidade;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(newDescricao){
        this.#descricao = newDescricao;
    }



    // editorText() {
    //     return `
    //     Nome: ${this.nome} \n
    //     Horario: ${this.horario} \n
    //     Local: ${this.local} \n
    //     Preco: ${this.preco} \n
    //     Quantidade: ${this.quantidade} \n
    //     Descricao: ${this.descricao}`
    // }

    toJSON(){
        return {
        nome: this. #nome,
        horario: this. #horario,
        local: this.#local,
        preco: this.#preco,
        quantidade: this.#quantidade,
        descricao: this.#descricao
        }
    }



    async incluir(){
        const eventDAO = new EventDAO();
        await eventDAO.gravar(this);
    }

    async alterar(){
        const eventDAO = new EventDAO();
        await eventDAO.alterar(this);
    }

    async excluir() {
        const eventDAO = new EventDAO();
        await eventDAO.excluir(this.nome); 
    }

    async consultar(termoBusca){
        const eventDAO = new EventDAO();
        return await eventDAO.consultar(termoBusca);
    }

}

