import React from "react";
import classNames from "classnames";

export default class IrregularVerbs extends React.Component {

    constructor() {
        super();
        this.state = {
            text: ""
        }
    }

    componentWillMount() {
        this.props.loadIrrVerbs();
    }

    renderTable(verbs) {
        return (
            <table className="irrWordsTable table table-striped table-hover table-responsive">
            <thead>
            <tr>
                <th>Infinitive</th>
                <th>Past Simple</th>
                <th>Past Participle</th>
                <th>Перевод</th>
            </tr>
            </thead>
            <tbody>
            {verbs}
            </tbody>
        </table>);
    }

    generateTableContent() {
        return this.props.verbs
            .filter((word) => {
                return (word.inf + word.ps + word.pp + word.tr).indexOf(this.state.text) != -1
            })
            .map((word, id) => {
                return <tr key={id} onClick={() => this.props.loadDefinition(word.inf)}>
                    <td>{word.inf}</td>
                    <td>{word.ps}</td>
                    <td>{word.pp}</td>
                    <td>{word.tr}</td>
                </tr>
            });
    }

    render() {
        if (!this.props.verbs) {
            return <div>No content</div>
        }
        const verbsDom = this.generateTableContent();
        const isWordEmpty = this.state.text.length == 0;
        const newWordIconClassNames = classNames("glyphicon", {
            "glyphicon-remove-sign removeIcon": !isWordEmpty,
            "glyphicon-search": isWordEmpty
        });

        return (
            <div className="container">
                <div className="wordSearch">
                    <input type="text"
                           value={this.state.text}
                           onChange={(e) => this.setState({text: e.target.value})}
                           className="wordInput"
                           placeholder="Input your word..."/>
                    <span onClick={() => this.setState({text: ""})}
                          className={newWordIconClassNames}/>
                </div>

                {verbsDom.length > 0 && this.renderTable(verbsDom)}
                {verbsDom.length == 0 && <div>No matches...</div>}

            </div>
        );
    }
}