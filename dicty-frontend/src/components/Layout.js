import React from 'react';

import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import LoadingOverlay from './LoadingOverlay'
import WordInfoPanel from './WordInfoPanel'

import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

import ApplicationStateStore from '../stores/ApplicationStateStore'
import DefinitionStore from '../stores/DefinitionStore'

import * as WordActions from '../actions/WordsActions';

export default class Layout extends React.Component {

    constructor() {
        super();
        this.state = {
            word: "",
            loading: ApplicationStateStore.isLoading(),
            wordInfo: [],
            showModalW: false
        };
    }

    componentWillMount() {
        this.setState({showModalW: false});
        ApplicationStateStore.on("change", () => {
            this.setState({
                loading: ApplicationStateStore.isLoading()
            });
        });

        DefinitionStore.on("change", () => {
           this.setState({
               wordInfo: DefinitionStore.getDefinitions(),
               showModalW: DefinitionStore.isDialogVisible(),
               selectedWord: DefinitionStore.getWord()
           });
        });
    }

    handleWordUpdated(word) {
        this.setState({
            word: word
        });
    }

    close() {
        WordActions.clearDefinition();
    }

    open() {
        this.setState({showModalW: true});
    }

    render() {

        return (
            <div className="pageBody">
                <Header/>
                <Content wordUpdated={this.handleWordUpdated.bind(this)}/>
                <Footer/>

                <Modal show={this.state.showModalW} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.selectedWord}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <WordInfoPanel info={this.state.wordInfo}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <LoadingOverlay enabled={this.state.loading}/>
            </div>

        );
    }
}