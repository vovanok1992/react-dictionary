import React from "react";

import * as WordActions from "../actions/WordsActions";
import IrregularVerbsStore from "../stores/IrregularVerbsStore"

export default class IrregularVerbs extends React.Component {

    constructor(){
        super();

        this.state = {
            verbs:[]
        };

        this.handleWordsChange = () => {
            this.setState({verbs: IrregularVerbsStore.getVerbs()})
        }
    }

    componentWillMount(){
        WordActions.loadIrrVerbs();
        IrregularVerbsStore.on("change", this.handleWordsChange);
    }

    componentWillUnmount(){
        IrregularVerbsStore.removeListener("change", this.handleWordsChange);
    }


    render() {
        const verbs = this.state.verbs.map((word, id) => {
            return <tr key={id}>
                <td>{word.inf}</td>
                <td>{word.ps}</td>
                <td>{word.pp}</td>
                <td>{word.tr}</td>
            </tr>
        });

        return (
            <div className="container">
                <table className="table table-striped table-hover">
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
                </table>

            </div>
        );
    }
}