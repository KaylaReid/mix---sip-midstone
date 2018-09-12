import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormText, Label } from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        modal: false,
        selectType: false,
        addNewIngredient: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }

    // addIngredient = () => {

    // }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    addNewIngredient = () => {
        this.setState({addNewIngredient: true})
    }

    saveNewIngredient = () => {
        let newIngredient = {
            name: "Gin",
            typeId: 1,
            userId: this.props.user.id
        }
    }

    render() {
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
        return (
        <div>
            <Button color="info" onClick={this.toggle}>Add a New Drink!</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
            <ModalHeader>Add a new drink to your collection!</ModalHeader>
            <ModalBody>
                <Label for="drinkName">Name:</Label>
                <Input id="drinkName" type="text" defaultValue={this.state.drinkName} placeholder="What's it called?" onChange={this.handleFieldChange} />
                <Label for="drinkDescription">Description:</Label>
                <Input id="drinkDescription" type="textarea" defaultValue={this.state.drinkDescription} placeholder="Describe your new drink!" onChange={this.handleFieldChange} />

                <Label>Add ingredients:</Label>
                    <div className="ingredient-declare">
                        <Input id="ingredient" type="select" defaultValue="Select Type" onChange={this.handleFieldChange}>
                            <option>Select a Ingredient</option>
                            {
                                this.props.ingredients.map(ing => {
                                    return <option>{ing.name}</option>
                                })
                            }
                            
                        </Input>
                        <Label>Amount:</Label>
                        <Input id="amount" type="text" placeholder="Ex. 1oz.
                        1/2 wedge, 1 squeeze" onChange={this.handleFieldChange}/>
                    </div>
                    <div>
                        <Button color="info" onClick={this.addIngredient}>Add Ingredient</Button>
                        <div>

                        <Label>Don't see the ingredient your looking for? Add a New one!</Label><br/>
                        <Button color="warning" onClick={this.addNewIngredient}>Add New Ingredient</Button>
                        {
                            this.state.addNewIngredient === true &&
                            <div>
                                <Label htmlFor="ingredientType">Type of Ingredient:</Label>
                                <Input id="ingredientType" type="select" defaultValue="Select Type" onChange={this.handleFieldChange}>
                            
                                    <option>Select Type</option>
                                    {
                                        this.props.types.map(type => {
                                            return <option>{type.name}</option>
                                        })
                                    }
                                </Input>
                                    {
                                        this.state.selectType &&
                                        <span className="select-type-error">** Please Select a Type **</span>
                                    }
                                <Label htmlFor="newIngredient">Add new ingredient:</Label>
                                <Input id="newIngredient" type="text" placeholder="Name of ingredient" onChange={this.handleFieldChange}/>
                                <Label htmlFor="amount">Amount:</Label>
                                <Input id="amount" type="text" placeholder="Ex. 1oz.
                                1/2 wedge, 1 squeeze" onChange={this.handleFieldChange}/>
                                <Button onClick={this.saveNewIngredient}>Save New Ingredient</Button>
                            </div>
                        }
                        </div>
                    </div>

                <Label for="drinkDirections">Directions:</Label>
                <Input id="drinkDirections" type="textarea" defaultValue={this.state.drinkDirections} placeholder="Directions to mix the drink!" onChange={this.handleFieldChange} />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Save Drink</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        </div>
        );
    }
}

export default ModalExample;