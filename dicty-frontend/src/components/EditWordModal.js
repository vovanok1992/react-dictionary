/**
 * Created by Vovan on 07.01.2017.
 */
import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

export default class EditWordModal extends React.Component {

    wordUpdated(field, value) {
        const clone = {...this.props.word};
        clone[field] = value;
        this.props.wordEdited(clone);
    }

    getEditForm() {
        if (this.props.word == null) {
            return null;
        }

        return (<div className="editWordFormContainer">
            <div className="input-group">
                <span className="input-group-addon editWordInputLabel" id="basic-addon1">En</span>
                <input value={this.props.word.en}
                       onChange={(e) => this.wordUpdated("en", e.target.value)}
                       type="text"
                       className="form-control"
                       placeholder="English word"/>
            </div>

            <div className="input-group">
                <span className="input-group-addon editWordInputLabel" id="basic-addon1">Ru</span>
                <input value={this.props.word.ru}
                       onChange={(e) => this.wordUpdated("ru", e.target.value)}
                       type="text"
                       className="form-control"
                       placeholder="Russian word"/>
            </div>

            <div className="input-group">
                <span className="input-group-addon editWordInputLabel" id="basic-addon1">Date</span>
                <input value={this.props.word.date}
                       onChange={(e) => this.wordUpdated("date", e.target.value)}
                       type="text"
                       className="form-control"
                       placeholder="date group"/>
            </div>
        </div>);
    }

    render() {
        return (
            <Modal show={this.props.word !== null} onHide={() => this.props.wordClicked(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit word</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.getEditForm()}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="info"
                            onClick={() => {
                                this.props.loadDefinition(this.props.word.en);
                                this.props.wordClicked(null);
                            }}>
                        <span className="glyphicon glyphicon-question-sign"/>&nbsp;
                        Definition</Button>
                    <Button bsStyle="danger"
                            onClick={() => {
                                if (confirm("Are you sure you want to delete word [" + this.props.word.en + "]")) {
                                    this.props.removeWordOnServer(this.props.word, this.props.token);
                                    this.props.wordClicked(null);
                                }
                            }}>
                        <span className="glyphicon glyphicon-remove"/>&nbsp;
                        Remove</Button>
                    <Button bsStyle="primary"
                            onClick={() => {
                                this.props.updateWordOnServer(this.props.word, this.props.token);
                                this.props.wordClicked(null);
                            }}>
                        <span className="glyphicon glyphicon-ok"/>&nbsp;
                        Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}