import React, {Component} from "react";
import {ButtonGroup, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Button from "react-bootstrap/Button";

export default class RoomList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms : []
        };
    }

    componentDidMount() {
        this.findAllRooms();
    };

    findAllRooms(){
        axios.get("http://localhost:8080/api/rooms")
            .then(response => response.data)
            .then((data) => {
                this.setState({rooms : data});
            });
    };

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} />Room list</Card.Header>
                <Card.Body>
                    <Table>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Room number</th>
                                <th>Room type</th>
                                <th>Room price</th>
                                <th>Room in hotel</th>
                                <th>Edit/Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.rooms.length === 0 ?
                                <tr align="center">
                                    <td colSpan="7">
                                        {this.state.rooms.length} No informations available
                                    </td>
                                </tr> :
                                this.state.rooms.map((room) => (
                                    <tr key={room.roomId}>
                                        <td>{room.roomNumber}</td>
                                        <td>{room.typeOfRoom}</td>
                                        <td>{room.roomPrice}</td>
                                        <td>{room.hotelId}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" variant="online-primary">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button size="sm" variant="online-danger">
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
        );
    }
}