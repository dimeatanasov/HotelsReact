import React, {Component} from "react";
import {ButtonGroup, Card, Nav, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import MyToast from "./myToast";

export default class HotelList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hotels : []
        };
    };

    componentDidMount() {
        this.findAllHotels();
    };

    findAllHotels(){
        axios.get("http://localhost:8080/api/hotels")
            .then(response => response.data)
            .then((data) => {
                this.setState({hotels : data});
            });
    };

    deleteHotel = (hotelId) =>{
        axios.delete("http://localhost:8080/api/hotels/"+hotelId)
            .then(response =>{
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        hotels: this.state.hotels.filter(hotel => hotel.hotelId !== hotelId)
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
                    <Card.Header><FontAwesomeIcon icon={faList} />Hotel list</Card.Header>
                    <Card.Body>
                        <Table>
                            <Table bordered hover striped variant="dark">
                                <thead>
                                <tr>
                                    <th>Hotel ID</th>
                                    <th>Hotel name</th>
                                    <th>Hotel address</th>
                                    <th>Hotel email</th>
                                    <th>Hotel rooms</th>
                                    <th>Hotel workers</th>
                                    <th>Hotel guests</th>
                                    <th>Hotel reservations</th>
                                    <th>Edit/Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.hotels.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="7">
                                            {this.state.hotels.length} No informations available
                                        </td>
                                    </tr> :
                                    this.state.hotels.map((hotel) => (
                                        <tr key={hotel.hotelId}>
                                            <td>{hotel.hotelId}</td>
                                            <td>{hotel.hotelName}</td>
                                            <td>{hotel.hotelAddress}</td>
                                            <td>{hotel.hotelEmail}</td>
                                            <td><Link to={"/rooms/roomList"} className="btn btn-sm btn-outline-primary">Room</Link></td>
                                            <td><Link to={"/workers/workerList"} className="btn btn-sm btn-outline-primary">Workers</Link></td>
                                            <td><Link to={"/guests/guestList"} className="btn btn-sm btn-outline-primary">Guests</Link></td>
                                            <td><Link to={"/reservations/reservationList"} className="btn btn-sm btn-outline-primary">Reservations</Link></td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"edit/"+ hotel.hotelId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                    <Button size="sm" variant="online-danger" onClick={this.deleteHotel.bind(this, hotel.hotelId)}>
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