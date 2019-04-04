// Referências (para intellisense)
///<reference path="../typings/react.d.ts" />
///<reference path="../typings/react-dom.d.ts" />

class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editar: false,
            textoEditado: props.value.description,
            done: false
        };
    }

    handleToggleEditingItem() {
        this.setState({ editar: !this.state.editar });
    }

    handleTextBoxChange(evt) {
        this.setState({ textoEditado: evt.target.value });
    }

    // ----------------------------------------------
    handleToggleDoneItem() {
        this.setState({ done: !this.state.done });
    }
    // ----------------------------------------------

    handleSave() {
        this.props.onEdited(this.state.textoEditado);
        this.handleToggleEditingItem();
    }

    render() {
        //
        if (this.state.editar === true) {
            //modo edição
            return React.createElement(
                "li",
                null,
                React.createElement("input", {
                    type: "text",
                    value: this.state.textoEditado,
                    onChange: (evt) => this.handleTextBoxChange(evt)
                }),
                // usam-se aspas quando é html
                // qd sao classes ou funcoes nao se usam aspas, porq elementos react podem ser classes ou funcoes
                React.createElement(
                    "button",
                    {
                        type: "button",
                        onClick: (evt) => this.handleSave()
                    },
                    "Guardar"
                ),
                React.createElement(
                    "button",
                    {
                        type: "button",
                        onClick: (evt) => this.handleToggleEditingItem()
                    },
                    "Cancelar"
                ),
                /*
                React.createElement(
                    "button",
                    {
                        type: "button",
                        onClick: (evt) => this.handleToggleDoneItem()
                    },
                    "Anular"
                )*/
            );

        } else {
            if (this.state.done === true) {
                //para concluir a tarefa
                return React.createElement(
                    "li",
                    { style: { textDecoration: "line-through" } },
                    this.props.value,
                    // usam-se aspas quando é html
                    // qd sao classes ou funcoes nao se usam aspas, porq elementos react podem ser classes ou funcoes
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            onClick: (evt) => this.handleToggleEditingItem()
                        },
                        "Editar"
                    ),
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            onClick: (evt) => this.props.onDelete()
                        },
                        "🗑️"

                    ),
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            onClick: (evt) => this.handleToggleDoneItem()
                        },
                        "👎"
                    )
                );
    
            } else

                //if(this.state.editar === true){}
                return React.createElement(
                    "li",
                    null,
                    this.props.value.description,
                    // usam-se aspas quando é html
                    // qd sao classes ou funcoes nao se usam aspas, porq elementos react podem ser classes ou funcoes
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            onClick: (evt) => this.handleToggleEditingItem()
                        },
                        "Editar"
                    ),
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            onClick: (evt) => this.props.onDelete()
                        },
                        "🗑️"

                    ),
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            onClick: (evt) => this.handleToggleDoneItem()
                        },
                        "👍"
                    )

                );
        }
    }
}





