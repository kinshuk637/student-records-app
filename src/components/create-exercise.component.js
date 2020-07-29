import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateExercise extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeClass = this.onChangeClass.bind(this);
        this.onChangeEnrollment = this.onChangeEnrollment.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            Class: '',
            enrollment_no: '',
            address:'',
            date: new Date(),
            users: []
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/users')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                })
            }
        })
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeClass(e){
        this.setState({
            Class: e.target.value
        });
    }
    onChangeEnrollment(e){
        this.setState({
            enrollment_no: e.target.value
        });
    }
    onChangeAddress(e){
        this.setState({
            address: e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
            date: date
        });
    }
    onSubmit(e){
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            Class: this.state.Class,
            enrollment_no: this.state.enrollment_no,
            address: this.state.address,
            date: this.state.date
        }
        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add',exercise)
        .then(res => console.log(res.data));
        window.location = '/';
    }
    render(){
        return(
            <div>
                <h3>Create New Student Record</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                          required
                          className="form-control"
                          value={this.state.username}
                          onChange={this.onChangeUsername}>{
                              this.state.users.map(function(user){
                                  return <option
                                  key={user}
                                  value={user}>{user}
                                  </option>;
                              })
                          }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Class: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Class}
                            onChange={this.onChangeClass}
                        />
                    </div>
                    <div className="form-group">
                        <label>Enrollment No: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.enrollment_no}
                            onChange={this.onChangeEnrollment}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                        </div> 
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Student Record" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}