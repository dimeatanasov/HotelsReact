import React, {Component} from "react";
import {ButtonGroup, Card, Nav, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import MyToast from "./myToast";

export default class GuestList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests : []
        };
    };

    componentDidMount() {
        this.findAllGuests();
    };

    findAllGuests(){
        axios.get("http://localhost:8080/api/guests")
            .then(response => response.data)
            .then((data) => {
                this.setState({guests : data});
            });
    };

    deleteGuest = (guestId) =>{
        axios.delete("http://localhost:8080/api/guests/"+guestId)
            .then(response =>{
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        hotels: this.state.guests.filter(guest => guest.guestId !== guestId)
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
                    <Card.Header><FontAwesomeIcon icon={faList} />Guest list</Card.Header>
                    <Card.Body>
                        <Table>
                            <Table bordered hover striped variant="dark">
                                <thead>
                                <tr>
                                    <th>Guest name</th>
                                    <th>Guest last name</th>
                                    <th>Hotel ID</th>
                                    <th>Guest ID Licence</th>
                                    <th>Edit/Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.guests.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="7">
                                            {this.state.guests.length} No informations available
                                        </td>
                                    </tr> :
                                    this.state.guests.map((guest) => (
                                        <tr key={guest.guestId}>
                                            <td>{guest.guestName}</td>
                                            <td>{guest.guestLastName}</td>
                                            <td>{guest.hotelId}</td>
                                            <td>{guest.idLicence}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"edit/"+ guest.guestId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                    <Button size="sm" variant="online-danger" onClick={this.deleteGuest.bind(this, guest.guestId)}>
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