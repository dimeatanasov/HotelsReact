import React, {Component} from "react";
import {ButtonGroup, Card, Nav, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import MyToast from "./myToast";

export default class ReservationsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations : []
        };
    };

    componentDidMount() {
        this.findAllReservations();
    };

    findAllReservations(){
        axios.get("http://localhost:8080/api/reservations")
            .then(response => response.data)
            .then((data) => {
                this.setState({reservations : data});
            });
    };

    deleteReservation = (reservationId) =>{
        axios.delete("http://localhost:8080/api/reservations/"+reservationId)
            .then(response =>{
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        hotels: this.state.reservations.filter(reservation => reservation.reservationId !== reservationId)
                    });
                }
            });
    };

    render() {
        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Book Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList} />Reservation list</Card.Header>
                    <Card.Body>
                        <Table>
                            <Table bordered hover striped variant="dark">
                                <thead>
                                <tr>
                                    <th>Room ID</th>
                                    <th>Date In</th>
                                    <th>Date Out</th>
                                    <th>Guest ID</th>
                                    <th>Hotel ID</th>
                                    <th>Edit/Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.reservations.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="7">
                                            {this.state.reservations.length} No informations available
                                        </td>
                                    </tr> :
                                    this.state.reservations.map((reservation) => (
                                        <tr key={reservation.reservationId}>
                                            <td>{reservation.roomId}</td>
                                            <td>{reservation.dateIn}</td>
                                            <td>{reservation.dateOut}</td>
                                            <td>{reservation.guestId}</td>
                                            <td>{reservation.hotelId}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"edit/"+ reservation.reservationId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                    <Button size="sm" variant="online-danger" onClick={this.deleteReservation.bind(this, reservation.reservationId)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </Table>
                    </Card.Body>
                </Card>
            </div>

        );
    }
}