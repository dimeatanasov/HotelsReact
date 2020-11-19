import React, {Component} from "react";
import {Card} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusCircle, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import MyToast from "./myToast";

export default class AddWorker extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.workerChange = this.workerChange.bind(this);
        this.submitWorker = this.submitWorker.bind(this);
        this.state.show = false;
    }

    initialState = {
        workerId: '',
        workerName:'',
        workerLastName:'',
        hotelId:'',
        workerShift:''
    };

    componentDidMount() {
        const workerId = +this.props.match.params.workerId;
        if(workerId){
            this.findHotelById(workerId);
        }
    }

    findHotelById = (workerId) =>{
        axios.get("http://localhost:8080/api/workers/"+workerId)
            .then(response => {
                if(response != null){
                    this.setState({
                        workerId: response.data.workerId,
                        workerName: response.data.workerName,
                        workerLastName: response.data.workerLastName,
                        hotelId: response.data.hotelId,
                        workerShift: response.data.workerShift
                    });
                }
            }).catch((error) =>{
            console.error("Error - " +error);
        });
    };

    submitWorker = event => {
        event.preventDefault();

        const worker = {
            workerId: this.state.workerId,
            workerName: this.state.workerName,
            workerLastName: this.state.workerLastName,
            hotelId: this.state.hotelId,
            workerShift: this.state.workerShift
        };

        axios.post("http://localhost:8080/api/workers", worker)
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

    workerChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    render() {

        const {workerId, workerName, workerLastName, hotelId, workerShift} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Book Updated Successfully." : "Book Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusCircle} />Add worker
                    </Card.Header>
                    <Form onReset={this.resetValues} onSubmit={this.submitWorker} id="addWorkerForm">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupWorkerId">
                                    <Form.Label>Worker ID</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="workerId"
                                                  value={workerId}
                                                  onChange={this.workerChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter worker ID"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupWorkerName">
                                    <Form.Label>Worker name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="workerName"
                                                  value={workerName}
                                                  onChange={this.workerChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter worker name"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupWorkerLastName">
                                    <Form.Label>Worker last name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="workerLastName"
                                                  value={workerLastName}
                                                  onChange={this.workerChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter worker last name"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupHotelId">
                                    <Form.Label>Hotel Id</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="hotelId"
                                                  value={hotelId}
                                                  onChange={this.workerChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter hotel Id"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGroupWorkerShift">
                                    <Form.Label>Worker shift</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text"
                                                  name="workerShift"
                                                  value={workerShift}
                                                  onChange={this.workerChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter worker shift"/>
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