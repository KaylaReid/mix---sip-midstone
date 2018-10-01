import React, { Component } from "react";
import { Link } from "react-router-dom"
import { Modal, Button, Icon, Form, Input, Divider, TextArea, Label, Menu } from "semantic-ui-react";
import "./footer.css"

export default class Footer extends Component {
    render(){
        return (
            <div className="footer">
                <a href="https://github.com/KaylaReid" target="_blank"><Icon name='github' color="black" size="large" /></a>
                <a href="https://www.linkedin.com/in/iamkaylareid/" target="_blank"><Icon name='linkedin' color="blue" size="large" /></a>
            </div>
        )
    }
}