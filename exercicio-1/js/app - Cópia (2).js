// TODO alterado pelo Quintino, iniciado em 08-03-2019

// Referências (para intellisense)
///<reference path="../typings/react.d.ts" />
///<reference path="../typings/react-dom.d.ts" />
// TODO...

/**
* Formulário que vai adicionar um TODO.
*
* Componente principal da aplicação. Funciona como o "main()"
*/
//class principal - apresenta a aplicação de gestao de tarefas
//gerir a lista das tarefas, disponibilizando a funcionalidade de inserção e listagem (opercoes de CRUD)
// gere toda aplicacao, criar e apagar
class TodoApp extends React.Component {
    // A invocação do construtor "super" implica passsar as props
    // A props representa o valor inicial ou por defeito das propreidades quando
    // isto pode ser usado para inicializar o state do objecto
    constructor(props) {
        super(props);

        // o this.state tem de ser sempre um objecto
        // representa a ausencia de valor
        // se nao for definido, toma o valor de NULL
        this.state = {
            /**
            * Representa a lista das tarefas que será mostrada no ecrã
            * e com a qual o utilizador pode interagir.
            */
            listaTarefas: ["Regar as plantas", "Dar de comer ao gato", "Estudar TI2"]
        };
    }
    // retoma a interface a ser mostrada ao utilizador
    // tem o objetivo de mostrar qq coisa :)

    // define a interface de utilizador, dado um determinado state e props
    // qd é atualizado o valor do state (atraves do this.setstate()) ou props, o render(), é 
    // invocado automaticamente, permitindo atualizar o interface de utilizador
    render() {
        /*
        jsx - 
        <div>
            <input type = "text" id="txtTarefa"/>
            <button type = "button" onClick =(evt) => ....>
            </button>
            <ul>
            {listaLisAux}
            </ ul>
        </div>
        */
        // no exame da jsx e temos de fazer o react.createElement ou o inverso
        return React.createElement(
            "div",
            null,
            React.createElement("input", { type: "text", id: "txtTarefa" }),
            React.createElement(
                "button",
                {
                   type: "button",
                   onClick: (evt) => this.handleClick(evt)
                },
                "+"
            ),
            React.createElement(ListaTodos, {
                listaTarefas: this.state.listaTarefas,
                onDelete: (idx) => this.handleDelete(idx),
                onItemEdited: (idx, novoTexto) => this.handleItemEdited(idx, novoTexto)
                //React.createElement("li", null, "Regar as plantas"),
                //React.createElement("li", null, "Dar de comer ao gato"),
            })
        );
    }

    // adiciona uma tarefa à lista de tarefas
    // @param (*) evt Evento do clique. Pode ser omitido. Atraves do evento
    // que é passado por paramentro, é possivel aceder ao elemento que o lançou.
    // inicio de invencoes kintas
    // tentativa para apagar eventos
    handleClick(evt) {
        //alert('Click no add Quintino ganha juizo :)');
        let texto = document.getElementById("txtTarefa").value;

        // Arrays e Objects sao mutaveis. Como sao mutaveis (ex: adicionar elementos),
        // o javascript (e o react) não "sabem" quando o valor do array/objecto mudou, ou sequer o que mudou.
        // por isso, para simplificar a logica de atualizacao, criamos uma cópia do array, e alterarmos a cópia.
        // Como é um objecto diferente (atraves da logica do ==), a atualização do React mais simples.
        // Isto não se aplica a strings/numeros/booleanos

        let aux = this.state.listaTarefas.slice();

        aux.push(texto);

        //this.state.listaTarefas = aux; //nao funciona porque p todos os efeitos o array é o mesmo
        this.setState({
            //funcao vai atualizar as variaveis
            listaTarefas: aux
        });
    }

    // handleDeleteTodo(index) {
    //     let aux = this.state.listaTarefas.slice();
    //     // Apagar 1 elemento na posição especifica do array (posição "index")
    //     this.setState({ 
    //         listaTarefas: aux 
    //     });
    // }

    handleDelete(index) {
        let aux = this.state.listaTarefas.slice();
        // Remover um elemento (tarefa) na posicao index
        aux.splice(index, 1);

        this.setState({ listaTarefas: aux });
    }
    
    handleItemEdited(index, novoTexto) {
        let aux = this.state.listaTarefas.slice();

        aux[index] = novoTexto;

        this.setState({ listaTarefas: aux });
    }
}

// responsavel apenas por listar as tarefas que o utulizador tem para fazer
class ListaTodos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /**
             * 
             */
            editar: []
        };
    }

    render() {
        // Esta lista/array vai conter um <li /> por cada tarefa que está
        // em `this.props.listaTarefas`.
        let listaLisAux = [];

        for (let i = 0; i < this.props.listaTarefas.length; i++) {
            let tarefa = this.props.listaTarefas[i];

            listaLisAux.push(
                React.createElement(TodoItem, { 
                    value: tarefa, 
                    onDelete:() => this.props.onDelete(i),
                    onEdited: (novoTexto) => this.props.onItemEdited(i, novoTexto)
                })
            );
        }

        return React.createElement("ul", null, listaLisAux);
    }
}
// Iniciar a aplicacao
ReactDOM.render(
    React.createElement(TodoApp, null),
    document.getElementById("app")
);





