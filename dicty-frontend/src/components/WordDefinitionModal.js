/**
 * Created by Vovan on 06.12.2016.
 */
import React from "react";
import WordInfoPanel from "./WordInfoPanel";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

export default class Layout extends React.Component {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.closeHandler.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.selectedWord}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WordInfoPanel info={this.props.wordInfo}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeHandler.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}