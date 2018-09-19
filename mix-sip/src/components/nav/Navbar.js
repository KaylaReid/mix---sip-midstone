import React, { Component } from "react";
import CupLogo from "../images/cupLogo.png";
import { Button } from "reactstrap"
import "./navbar.css";


 export default class Navbar extends Component {

    handleLogout = () => {
        sessionStorage.removeItem("user")
        this.props.history.push("/login")
    }

    getFirstName = () => {
        let user = JSON.parse(sessionStorage.getItem("user"))[0]
        let firstName = user.fullName.split(" ")
        return firstName[0]
    }

     render(){
         return(
             <div id="navbar">
                <h4 id="welcome">Hi, {this.getFirstName()}!</h4>
                <img src={CupLogo} alt="mix&amp;siplogo" id="navbar-logo"/>
                <Button id="logout-button" size="sm" onClick={this.handleLogout}>Logout</Button>
             </div>
         )
     }
 }