import React, {Component} from "react";
import {Card} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusCircle, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import MyToast from "./myToast";

export default class AddHotel extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.hotelChange = this.hotelChange.bind(this);
        this.submitHotel = this.submitHotel.bind(this);
        this.state.show = false;
    }

    initialState = {
        hotelId: '',
        hotelName:'',
        hotelAddress:'',
        hotelEmail:''
    };

    componentDidMount() {
        const hotelId = +this.props.match.params.hotelId;
        if(hotelId){
            this.findHotelById(hotelId);
        }
    }

    findHotelById = (hotelId) =>{
        axios.get("http://localhost:8080/api/hotels/"+hotelId)
            .then(response => {
                if(response != null){
                    this.setState({
                        hotelId: response.data.hotelId,
                        hotelName: response.data.hotelName,
                        hotelAddress: response.data.hotelAddress,
                        hotelEmail: response.data.hotelEmail
                    });
                }
            }).catch((error) =>{
            console.error("Error - " +error);
        });
    };

    submitHotel = event => {
        event.preventDefault();

        const hotel = {
            hotelId: this.state.hotelId,
            hotelName: this.state.hotelName,
            hotelAddress: this.state.hotelAddress,
            hotelEmail: this.state.hotelEmail
        };

        axios.post("http://localhost:8080/api/hotels", hotel)
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

    hotelChange = event => {
        this.setState({
           [event.target.name]:event.target.value
        });
    };

    hotelList = () =>{
      return this.props.history.push("/hotels/hotelList");
    };

    render() {

        const {hotelId, hotelName, hotelAddress, hotelEmail} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Book Updated Successfully." : "Book Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusCircle} />Add hotel
                    </Card.Header>
                    <Form onReset={this.resetValues} onSubmit={this.submitHotel} id="addHotelForm">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupHotelId">
                                    <Form.Label>Hotel ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="hotelId"
                                                  value={hotelId}
                                                  onChange={this.hotelChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter hotel ID"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupHotelName">
                                    <Form.Label>Hotel name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="hotelName"
                                                  value={hotelName}
                                                  onChange={this.hotelChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter hotel name"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupHotelAddress">
                                    <Form.Label>Hotel address</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="hotelAddress"
                                                  value={hotelAddress}
                                                  onChange={this.hotelChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter hotel address"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupHotelEmail">
                                    <Form.Label>Hotel email</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="email"
                                                  name="hotelEmail"
                                                  value={hotelEmail}
                                                  onChange={this.hotelChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter hotel email"/>
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
                            <Button variant="info" size="sm" type="button" onClick={this.hotelList.bind()}>
                                <FontAwesomeIcon icon={faList} />Hotel list
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}