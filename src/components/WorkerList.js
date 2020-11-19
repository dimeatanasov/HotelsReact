import React, {Component} from "react";
import {ButtonGroup, Card, Nav, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import MyToast from "./myToast";

export default class WorkerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workers : []
        };
    };

    componentDidMount() {
        this.findAllWorkers();
    };

    findAllWorkers(){
        axios.get("http://localhost:8080/api/workers")
            .then(response => response.data)
            .then((data) => {
                this.setState({workers : data});
            });
    };

    deleteWorker = (workerId) =>{
        axios.delete("http://localhost:8080/api/workers/"+workerId)
            .then(response =>{
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        hotels: this.state.workers.filter(worker => worker.workerId !== workerId)
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
                    <Card.Header><FontAwesomeIcon icon={faList} />Worker list</Card.Header>
                    <Card.Body>
                        <Table>
                            <Table bordered hover striped variant="dark">
                                <thead>
                                <tr>
                                    <th>Worker name</th>
                                    <th>Worker last name</th>
                                    <th>Hotel ID</th>
                                    <th>Worker Shift</th>
                                    <th>Edit/Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.workers.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="7">
                                            {this.state.workers.length} No informations available
                                        </td>
                                    </tr> :
                                    this.state.workers.map((worker) => (
                                        <tr key={worker.workerId}>
                                            <td>{worker.workerName}</td>
                                            <td>{worker.workerLastName}</td>
                                            <td>{worker.hotelId}</td>
                                            <td>{worker.workerShift}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"edit/"+ worker.workerId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                    <Button size="sm" variant="online-danger" onClick={this.deleteWorker.bind(this, worker.workerId)}>
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