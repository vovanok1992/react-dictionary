/**
 * Created by Vovan on 13.11.2016.
 */
import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import * as WordActions from '../actions/WordsActions';

export default class WordsTable extends React.Component {

    render() {
        if (this.props.words.length == 0) {
            return <div>No matches</div>;
        }

        const wordsElements = this.props.words.map((word) => {
            return <tr key={word.id}>
                <td onClick={(e)=>{WordActions.loadDefinition(e.target.innerHTML)}}>{word.en}</td>
                <td>{word.ru}</td>
            </tr>
        });

        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>English</th>
                    <th>Russian</th>
                </tr>
                </thead>
                <tbody>
                {wordsElements}
                </tbody>
            </Table>
        );
    }
}