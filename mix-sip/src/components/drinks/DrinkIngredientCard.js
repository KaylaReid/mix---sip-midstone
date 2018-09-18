import React, { Component } from "react";
import { Button } from 'reactstrap';
import DataManager from "../../modules/DataManager"


export default class DrinkIngredientCard extends Component {
    state = {
        amount: "",
        edit: false
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
        .then(() => this.setState({edit: false}))
    }

    removeIngredient = () => {
        DataManager.delete("drinkIngredients", this.props.drinkIngredient.id)
        .then(() => this.props.resetData())
    }

    editIng = () => {
        this.setState({edit: true})
    }

    render(){
        return (
            <div>
                {
                    !this.state.edit &&
                    <div>
                        <h3 className="capitalize">{this.props.name}</h3>
                        <Button color="info" size="sm" onClick={this.editIng}>Edit?</Button>
                    </div>
                }
                {
                    this.state.edit && 
                    <div>
                        <Button color="info" size="sm" onClick={this.removeIngredient}>Remove ingredient</Button>
                        <h3 className="capitalize">{this.props.name}</h3>
                        <input type="text" className="form-control" onChange={this.handleFieldChange} id="amount" defaultValue={this.props.drinkIngredient.amount} />
                        <Button color="success" size="sm" onClick={this.saveChanges}>Update Amount</Button>
                    </div>
                }
            </div>
        )
    }
}
