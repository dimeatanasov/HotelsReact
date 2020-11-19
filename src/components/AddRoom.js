import React, {Component} from "react";
import {Card} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default class AddRoom extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.roomChange = this.roomChange.bind(this);
        this.submitRoom = this.submitRoom.bind(this);
        this.state.show = false;
    }

    initialState = {
        roomId:'',
        roomNumber:'',
        typeOfRoom:'',
        roomPrice:'',
        hotelId:''
    }

    submitRoom = event => {
        event.preventDefault();

        const room = {
            roomId: this.state.roomId,
            roomNumber: this.state.roomNumber,
            typeOfRoom: this.state.typeOfRoom,
            roomPrice: this.state.roomPrice,
            hotelId: this.state.hotelId
        };

        axios.post("http://localhost:8080/api/rooms", room)
            .then(response => {
                if(response.data != null){
                    this.setState({"show" : true});
                    setTimeout(() => this.setState({"show" : false}), 300);
                }else{
                    this.setState({"show" : false});
                }
            });

        this.setState(this.initialState);

    }

    resetValues = () => {
        this.setState(() => this.initialState);
    }

    roomChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {

        const {roomId, roomNumber, typeOfRoom, roomPrice, hotelId} = this.state;

        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusCircle} />Add room
                    </Card.Header>
                    <Form onReset={this.resetValues} onSubmit={this.submitHotel} id="addRoomForm">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupRoomId">
                                    <Form.Label>Room ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="roomId"
                                                  value={roomId}
                                                  onChange={this.roomChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter room Id"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupRoomNumber">
                                    <Form.Label>Room Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="roomNumber"
                                                  value={roomNumber}
                                                  onChange={this.roomChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter room number"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupTypeOfRoom">
                                    <Form.Label>Type of room</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="typeOfRoom"
                                                  value={typeOfRoom}
                                                  onChange={this.roomChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter type of room"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupRoomPrice">
                                    <Form.Label>Room price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="roomPrice"
                                                  value={roomPrice}
                                                  onChange={this.roomChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter room price"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupRoomHotelId">
                                    <Form.Label>Hotel ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="hotelId"
                                                  value={hotelId}
                                                  onChange={this.roomChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter hotel ID"/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="success" size="sm" type="submit">
                                <FontAwesomeIcon icon={faSave} />Submit
                            </Button>{' '}
                            <Button variant="info" size="sm" type="reset">
                                <FontAwesomeIcon icon={faUndo} />Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}