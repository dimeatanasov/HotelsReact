import React, {Component} from "react";
import {Jumbotron} from "react-bootstrap";

export default class Welcome extends Component {
    render() {
        return (
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome to our hotel list!</h1>
                <p>
                    We hope you will find what you need! (:
                </p>
            </Jumbotron>
        );
    }
}