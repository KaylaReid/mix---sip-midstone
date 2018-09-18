import React, { Component } from "react"; 
import { Button, Input } from 'reactstrap';
import DataManger from "../../modules/DataManager"

export default class EditIngCard extends Component {
    state = {
        edit: false,
        name: ""
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
       this.setState({edit: false}) 
       const update = {
           name: this.state.name
       }
       DataManger.patch("ingredients", update, this.props.ingredient.id)
       .then(() => {this.props.resetData()})
    }

    render(){
        return (
            <div id={this.props.ingredient.id}>
                {
                    !this.state.edit &&
                    <div>
                        <p className="capitalize">{this.state.name}</p> 
                        <Button color="success" onClick={this.changeToEdit}>Edit?</Button>
                    </div>
                }
                {
                    this.state.edit && 
                    <div>
                        <Input id="name" type="text" defaultValue={this.state.name} onChange=        {this.handleFieldChange}/>
                        <Button color="success" onClick={this.saveChange}>Save</Button>
                    </div>
                }
            </div>)
    }
}