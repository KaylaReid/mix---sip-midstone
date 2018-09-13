import React, { Component } from "react";
import Logo from "../images/smaller-logo.png";
import { Button } from "reactstrap"
import "./navbar.css";


 export default class Navbar extends Component {

    handleLogout = () => {
        sessionStorage.removeItem("user")
        this.props.history.push("/login")
    }

     render(){
         return(
             <div className="navbar">
                <img src={Logo} alt="mix&amp;siplogo" className="navbar-logo"/>
                <Button className="logout-button" onClick={this.handleLogout}>Logout</Button>
             </div>
         )
     }
 }