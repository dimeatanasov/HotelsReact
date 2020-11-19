import React, {Component} from "react";
import {Col, Navbar} from "react-bootstrap";

export default class Footer extends Component {
    render() {
        let fullYear =new Date().getFullYear();

        return(
            <Navbar fixed="bottom" bg="dark" variant="dark">
            <Col lg="12" className="text-center text-muted">
                <div>
                    {fullYear},
                    All Rights Reserved!
                </div>
            </Col>
            </Navbar>
        );
    }
}