import React from "react";

import * as WordActions from "../actions/WordsActions";

export default class IrregularVerbs extends React.Component {

    componentWillMount(){
        this.props.loadIrrVerbs();
    }

    render() {
        if(!this.props.verbs){
            return <div>No content</div>
        }

        const verbs = this.props.verbs.map((word, id) => {
            return <tr key={id} onClick={()=>{this.props.loadDefinition(word.inf)}}>
                <td>{word.inf}</td>
                <td>{word.ps}</td>
                <td>{word.pp}</td>
                <td>{word.tr}</td>
            </tr>
        });

        return (
            <div className="container">
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
                </table>

            </div>
        );
    }
}