import React, {Component} from "react";
import {Card} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusCircle, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import MyToast from "./myToast";

export default class AddReservations extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.reservationChange = this.reservationChange.bind(this);
        this.submitReservation = this.submitReservation.bind(this);
        this.state.show = false;
    }

    initialState = {
        reservationId: '',
        roomId:'',
        dateIn:'',
        dateOut:'',
        guestId:'',
        hotelId:''
    };

    componentDidMount() {
        const reservationId = +this.props.match.params.reservationId;
        if(reservationId){
            this.findHotelById(reservationId);
        }
    }

    findReservationById = (reservationId) =>{
        axios.get("http://localhost:8080/api/hotels/"+reservationId)
            .then(response => {
                if(response != null){
                    this.setState({
                        reservationId: response.data.reservationId,
                        roomId: response.data.roomId,
                        dateIn: response.data.dateIn,
                        dateOut: response.data.dateOut,
                        guestId: response.data.guestId,
                        hotelId: response.data.hotelId,
                    });
                }
            }).catch((error) =>{
            console.error("Error - " +error);
        });
    };

    submitReservation = event => {
        event.preventDefault();

        const reservation = {
            reservationId: this.state.reservationId,
            roomId: this.state.roomId,
            dateIn: this.state.dateIn,
            dateOut: this.state.dateOut,
            guestId: this.state.guestId,
            hotelId: this.state.hotelId,
        };

        axios.post("http://localhost:8080/api/reservation", reservation)
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

    reservationChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    render() {

        const {reservationId, roomId, dateIn, dateOut, guestId, hotelId} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Book Updated Successfully." : "Book Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusCircle} />Add reservation
                    </Card.Header>
                    <Form onReset={this.resetValues} onSubmit={this.submitReservation} id="addReservationForm">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupReservationId">
                                    <Form.Label>Reservation ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="reservationId"
                                                  value={reservationId}
                                                  onChange={this.reservationChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter reservation ID"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupRoomId">
                                    <Form.Label>Room ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="roomId"
                                                  value={roomId}
                                                  onChange={this.reservationChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter room ID"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupDateIn">
                                    <Form.Label>Hotel address</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="date"
                                                  name="dateIn"
                                                  value={dateIn}
                                                  onChange={this.reservationChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter date in"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupDateOut">
                                    <Form.Label>Hotel email</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="date"
                                                  name="dateOut"
                                                  value={dateOut}
                                                  onChange={this.reservationChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter date out"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupGuestId">
                                    <Form.Label>Hotel email</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="guestId"
                                                  value={guestId}
                                                  onChange={this.reservationChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter guest Id"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupHotelId">
                                    <Form.Label>Hotel email</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="hotelId"
                                                  value={hotelId}
                                                  onChange={this.reservationChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter hotel Id"/>
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