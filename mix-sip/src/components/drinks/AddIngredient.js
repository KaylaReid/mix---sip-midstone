import React, { Component } from "react";
import { Modal, Message, Button, Input } from "semantic-ui-react";


export default class AddIngredient extends Component {
    state = { 
        open: false,
        emptyName: false,
        aleadyHave: false,
        selectType: false,
        newIngredientName: "",
        newIngredientType: "", 
    }
  
    open = () => this.setState({ open: true })
    close = () => this.setState({ 
        open: false,
        emptyName: false,
        aleadyHave: false,
        selectType: false,
        newIngredientName: "",
        newIngredientType: "",  
    })

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    saveNewIngredient = () => {
        if(this.state.newIngredientType.length === 0){
            this.setState({selectType: true})
        } else if(this.state.newIngredientName.length === 0){
            this.setState({emptyName: true, selectType: false, alreadyHave: false})
        } else if(this.props.ingredients.find(ing => ing.name.toLowerCase() === this.state.newIngredientName.toLowerCase())){
            this.setState({alreadyHave: true, selectType: false, emptyName: false})
        } else {
            let newIngredient = {
                onHand: false,
                name: this.state.newIngredientName.toLowerCase(),
                typeId: this.props.types.find(type => type.name === this.state.newIngredientType).id,
                userId: this.props.user.id
            }
            this.close()
            this.props.addIngredient("ingredients", newIngredient)
        }
    }
  
    render() {
      const { open } = this.state
  
        return (
            <div>
                <Modal open={open} onOpen={this.open} onClose={this.close} size='small' trigger={<Button size="small" className="font text-shadow box-shadow-m">Add a New Ingredient</Button>}>
                    <Modal.Header className="font align-center">Add your ingredient here, and it will be added to your collection of ingredients to choose from</Modal.Header>
                    <Modal.Content>
                        <div className="column">
                            {
                                this.state.selectType &&
                                <Message info>Please select a type for this ingredient.</Message>
                            }
                            {
                                this.state.alreadyHave &&
                                <Message info>This ingredient is aleady in your collection. Please select it from the drop down</Message>
                            }
                            {
                                this.state.emptyName &&
                                <Message info>Please enter a name for your Ingredient.</Message>
                            }
                            
                            <Input size="medium" className="modal-input input-margin box-shadow-light" label={{ content: 'Type' }} labelPosition='left' list="types" id="newIngredientType" onChange={this.handleFieldChange} placeholder="Select Type" />
                                <datalist id="types" className="font">
                                    {
                                        this.props.types.map(type => <option key={type.id} value={type.name}/>)
                                    }
                                </datalist>
                            <Input size="medium" className="modal-input input-margin box-shadow-light" label={{ content: 'Name' }} labelPosition='left' id="newIngredientName" type="text" placeholder="Name of ingredient" onChange={this.handleFieldChange}/>
                            
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button size="small" className="font text-shadow box-shadow-m" onClick={this.saveNewIngredient}>Save</Button>{' '}
                        <Button size="small" className="font text-shadow box-shadow-m" onClick={this.close}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}
