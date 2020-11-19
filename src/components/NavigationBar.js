import React, {Component} from "react";

import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class NavigationBar extends Component{
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/en/2/24/H-Store-logo.png" width="25" height="25" alt="brand"/>
                    Hotels
                </Link>
                <Nav className="mr-auto">
                    <Link to={"/hotels/hotelList"} className="nav-link">Hotel list</Link>
                    <Link to={"/hotels/addHotel"} className="nav-link">Add hotel</Link>
                    <Link to={"/guests/addGuest"} className="nav-link">Add Guest</Link>
                    {/*<Link to={"guests/guestList"} className="nav-link">Guest list</Link>*/}
                    <Link to={"/reservations/addReservation"} className="nav-link">Add reservation</Link>
                    {/*<Link to={"reservations/reservationList"} className="nav-link">Reservation list</Link>*/}
                    <Link to={"/rooms/addRoom"} className="nav-link">Add room</Link>
                    {/*<Link to={"rooms/roomList"} className="nav-link">Room list</Link>*/}
                    <Link to={"/workers/addWorker"} className="nav-link">Add worker</Link>
                    {/*<Link to={"workers/workerList"} className="nav-link">Workers list</Link>*/}
                </Nav>
            </Navbar>
        );
    }
}