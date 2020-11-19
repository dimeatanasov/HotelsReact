import React from 'react';
import './App.css';

import {Container, Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import AddHotel from "./components/AddHotel";
import HotelList from "./components/HotelList";
import RoomList from "./components/RoomList";
import AddRoom from "./components/AddRoom";
import AddReservations from "./components/AddReservations";
import AddGuest from "./components/AddGuest";
import AddWorker from "./components/AddWorker";
import GuestList from "./components/GuestList";
import ReservationsList from "./components/ReservationsList";
import WorkerList from "./components/WorkerList";

export default function App() {

    const marginTop = {
      marginTop:"20px"
    };

  return (
    <Router>
        <NavigationBar/>
        <Container>
            <Row>
                <Col lg={12} style={marginTop}>
                    <Switch>
                        <Route path="/" exact component={Welcome}/>
                        <Route path="/hotels/addHotel" exact component={AddHotel}/>
                        <Route path="/hotels/edit/:hotelId" exact component={AddHotel}/>
                        <Route path="/hotels/hotelList" exact component={HotelList}/>
                        <Route path="/guests/addGuest" exact component={AddGuest}/>
                        <Route path="/guests/edit/:guestId" exact component={AddGuest}/>
                        <Route path="/guests/guestList" exact component={GuestList}/>
                        <Route path="/reservations/addReservation" exact component={AddReservations}/>
                        <Route path="/reservations/edit/:reservationId" exact component={AddReservations}/>
                        <Route path="/reservations/reservationList" exact component={ReservationsList}/>
                        <Route path="/rooms/addRoom" exact component={AddRoom}/>
                        <Route path="/rooms/edit/:roomId" exact component={AddRoom}/>
                        <Route path="/rooms/roomList" exact component={RoomList}/>
                        <Route path="/workers/addWorker" exact component={AddWorker}/>
                        <Route path="/workers/edit/:workerId" exact component={AddWorker}/>
                        <Route path="/workers/workerList" exact component={WorkerList}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}
