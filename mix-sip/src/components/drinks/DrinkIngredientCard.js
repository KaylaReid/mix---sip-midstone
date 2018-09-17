import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DataManager from "../../modules/DataManager"


export default class DrinkIngredientCard extends Component {
    state = {
        amount: ""
    }
    
    componentDidMount(){
        this.setState({amount: this.props.drinkIngredient.amount})
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    saveChanges = () => {
        let changedAmount = {amount: this.state.amount}
        DataManager.patch("drinkIngredients", changedAmount, this.props.drinkIngredient.id)
    }

    removeIngredient = () => {
        DataManager.delete("drinkIngredients", this.props.drinkIngredient.id)
        .then(() => this.props.resetData())
    }

    render(){
        return (
            <div>
                <div>
                    <h3 className="capitalize">{this.props.name}</h3>
                    <Button color="info" onClick={this.removeIngredient}>Remove ingredient</Button>
                </div>
                <div>
                    <input type="text" className="form-control" onChange={this.handleFieldChange} id="amount" defaultValue={this.props.drinkIngredient.amount} />
                    <Button color="success" onClick={this.saveChanges}>Update Amount</Button>
                </div>
            </div>
            
        )
    }
}
