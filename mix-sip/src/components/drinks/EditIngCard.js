import React, { Component } from "react"; 
import { Button, Input, Alert } from 'reactstrap';
import DataManger from "../../modules/DataManager"

export default class EditIngCard extends Component {
    state = {
        edit: false,
        name: "",
        alreadyHave: false,
        isBank: false
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
     
    componentDidMount(){
        this.setState({
            name: this.props.ingredient.name
        })
    }

    changeToEdit = () => {
        this.setState({edit: true})
    }

    saveChange = () => {
       if(this.props.ingredients.find(ing => ing.name === this.state.name.toLowerCase())){
           this.setState({alreadyHave: true})
       } else if(this.state.name === "") {
            this.setState({isBank: true})
       } else {
           const update = {
               name: this.state.name
           }
           DataManger.patch("ingredients", update, this.props.ingredient.id)
           .then(() => {this.props.resetData()})
           .then(() => this.setState({
               edit: false,
               isBank: false,
               alreadyHave:false
            }))
       }
    }

    cancel = () => {
        this.setState({
            edit: false,
            name: this.props.ingredient.name,
            isBank: false,
            alreadyHave:false
        })
    }

    render(){
        return (
            <div id={this.props.ingredient.id}>
                {
                    !this.state.edit &&
                    <div>
                        <p className="capitalize">{this.state.name}</p> 
                        <Button color="success" size="sm" onClick={this.changeToEdit}>Edit?</Button>
                    </div>
                }
                {
                    this.state.alreadyHave &&
                    <Alert color="danger">
                        This ingredient already exists please pick a difrent name.
                    </Alert>
                }
                {
                    this.state.isBank &&
                    <Alert color="danger">
                        Please fill out imput!
                    </Alert>
                }
                {
                    this.state.edit && 
                    <div>
                        <Input id="name" type="text" defaultValue={this.state.name} onChange=        {this.handleFieldChange}/>
                        <Button color="success" size="sm" onClick={this.saveChange}>Save</Button>
                        <Button color="success" size="sm" onClick={this.cancel}>Cancel</Button>
                    </div>
                }
            </div>)
    }
}