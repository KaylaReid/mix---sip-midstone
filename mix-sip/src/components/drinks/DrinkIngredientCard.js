import React, { Component } from "react";
import { Button, Icon, Input, Divider } from 'semantic-ui-react';
import DataManager from "../../modules/DataManager";




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
                        <div className="card-top">
                            <h3 className="capitalize">{this.props.name}</h3>
                            <Button animated basic className="blue-btn-outline" onClick={this.editIng}>
                                <Button.Content visible><Icon name="edit" /></Button.Content>
                                <Button.Content hidden>Edit</Button.Content>
                            </Button>
                        </div>
                        <Divider />
                    </div>
                }
                {
                    this.state.edit && 
                    <div>
                        <Divider />
                        <div className="card-top">
                            <h3 className="capitalize">{this.props.name}</h3>
                            <Button animated onClick={this.removeIngredient}>
                                <Button.Content visible><Icon name="trash alternate outline" /></Button.Content>
                                <Button.Content hidden>Remove</Button.Content>
                            </Button>
                        </div>
                        <div className="card-bottom">
                            <Input type="text" className="form-control" onChange={this.handleFieldChange} id="amount" defaultValue={this.props.drinkIngredient.amount} />
                            <Button animated onClick={this.saveChanges}>
                                <Button.Content visible><Icon name="checkmark" /></Button.Content>
                                <Button.Content hidden>Update</Button.Content>
                            </Button>
                        </div>
                        <Divider />
                    </div>
                }
            </div>
        )
    }
}
