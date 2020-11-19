import React, {Component} from "react";
import {Card} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusCircle, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import MyToast from "./myToast";

export default class AddGuest extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.guestChange = this.guestChange.bind(this);
        this.guestSubmit = this.guestSubmit.bind(this);
        this.state.show = false;
    }

    initialState = {
        guestId: '',
        guestName:'',
        guestLastName:'',
        hotelId:'',
        idLicence:''
    };

    componentDidMount() {
        const guestId = +this.props.match.params.guestId;
        if(guestId){
            this.findHotelById(guestId);
        }
    }

    findGuestById = (guestId) =>{
        axios.get("http://localhost:8080/api/guests/"+guestId)
            .then(response => {
                if(response != null){
                    this.setState({
                        guestId: response.data.guestId,
                        guestName: response.data.guestName,
                        guestLastName: response.data.guestLastName,
                        hotelId: response.data.hotelId,
                        idLicence: response.data.idLicence
                    });
                }
            }).catch((error) =>{
            console.error("Error - " +error);
        });
    };

    guestSubmit = event => {
        event.preventDefault();

        const guest = {
            guestId: this.state.guestId,
            guestName: this.state.guestName,
            guestLastName: this.state.guestLastName,
            hotelId: this.state.hotelId,
            idLicence: this.state.idLicence
        };

        axios.post("http://localhost:8080/api/guests", guest)
            .then(response => {
                if(response.data != null){
                    this.setState({"show" : true});
                    setTimeout(() => this.setState({"show" : false}), 300);
                }else{
                    this.setState({"show" : false});
                }
            });

        this.setState(this.initialState);

    };

    resetValues = () => {
        this.setState(() => this.initialState);
    };

    guestChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    render() {

        const {guestId, guestName, guestLastName, hotelId, idLicence} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Book Updated Successfully." : "Book Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusCircle} />Add guest
                    </Card.Header>
                    <Form onReset={this.resetValues} onSubmit={this.guestSubmit} id="addGuestForm">
                        <Card.Body>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupGuestId">
                                    <Form.Label>Guest ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="guestId"
                                                  value={guestId}
                                                  onChange={this.guestChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter guest ID"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupGuestName">
                                    <Form.Label>Guest name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="guestName"
                                                  value={guestName}
                                                  onChange={this.guestChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter guest name"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupGuestLastName">
                                    <Form.Label>Guest last name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="guestLastName"
                                                  value={guestLastName}
                                                  onChange={this.guestChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter guest last name"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupHotelId">
                                    <Form.Label>Hotel ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="hotelId"
                                                  value={hotelId}
                                                  onChange={this.guestChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter hotel ID"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupIdLicence">
                                    <Form.Label>ID licence</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="idLicence"
                                                  value={idLicence}
                                                  onChange={this.guestChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter ID licence"/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="success" size="sm" type="submit">
                                <FontAwesomeIcon icon={faSave} />Submit
                            </Button>{' '}
                            <Button variant="info" size="sm" type="reset">
                                <FontAwesomeIcon icon={faUndo} />Reset
                            </Button>{' '}
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}