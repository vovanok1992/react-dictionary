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

export default class Layout extends React.Component {

    constructor() {
        super();
        this.state = {
            word: "",
            loading: ApplicationStateStore.isLoading(),
            wordInfo: [],
            showModalW: false,
            headerScrolled: false
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
                showModalW: true,
                selectedWord: DefinitionStore.getWord()
            });
        });
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(e) {
        var scrolledHeight = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolledHeight > 50 && !this.state.headerScrolled) {
            this.setState({headerScrolled: true});
        } else if (scrolledHeight <= 50 && this.state.headerScrolled) {
            this.setState({headerScrolled: false});
        }
    }

    handleWordUpdated(word) {
        this.setState({
            word: word
        });
    }

    close() {
        this.setState({showModalW: false})
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

                <LoadingOverlay enabled={this.state.loading} stick={this.state.headerScrolled}/>
            </div>
        );
    }
}