import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../App.css';

export default class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Student Records</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Records</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create Student Record</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Add Student</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}