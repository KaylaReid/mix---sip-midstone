import React, { Component } from "react"; 
import { Button } from 'reactstrap';

export default class EditIngCard extends Component {
    render(){
        return (
            <div id={this.props.ingredient.id}>
                <p className="capitalize">{this.props.ingredient.name}</p> 
                <Button color="success">Edit?</Button>
            </div>)
    }
}