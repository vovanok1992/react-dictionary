import React from "react";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";

import {hashHistory} from "react-router";

export default class Header extends React.Component {
    render() {

        window.hashHistory = hashHistory;

        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <div className="logo">
                            <img className="logoIcon" src="static/icon.png" alt=""/>
                            <a className="logoText"
                               href="https://github.com/vovanok1992/react-dictionary/tree/master/dicty-frontend">ReactDictionary</a>
                        </div>

                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={2} onClick={() => {
                            location.href = "https://www.engvid.com/"
                        }}>EngVid</NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#" onClick={()=>{hashHistory.push("learn")}}>
                            Irregular Verbs
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}