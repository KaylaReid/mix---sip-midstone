import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            nestedModal: false,
            closeAll: false,
            selectType: false,
            addNewIngredient: false,
            newIngredientName: "",
            newIngredientType: ""
        };

        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }

    toggleNested() {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: false
        });
      }
    
      toggleAll() {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: true
        });
      }
    
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    saveNewIngredient = () => {
        let newIngredient = {
            name: this.state.newIngredientName,
            typeId: this.props.types.find(type => type.name === this.state.newIngredientType).id,
            userId: this.props.user.id
        }
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false
          });
        console.log(newIngredient, "it works!!!!!")
        this.props.addObject("ingredients", newIngredient)
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
                                    return <option key={ing.id}>{ing.name}</option>
                                })
                            }
                            
                        </Input>
                        <Label>Amount:</Label>
                        <Input id="amount" type="text" placeholder="Ex. 1oz.
                        1/2 wedge, 1 squeeze" onChange={this.handleFieldChange}/>
                    </div>
                    <div>
                        <Button color="info" onClick={this.addIngredient}>Add Ingredient to Drink</Button>
                        <div>


                        <Label>Don't see the ingredient your looking for? Add a New one!</Label><br/>
                        <Button color="success" onClick={this.toggleNested}>Add a New Ingredient</Button>
                        <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                            <ModalHeader>Add your ingredient here!</ModalHeader>
                            <div>
                                <Label htmlFor="newIngredientType">Type of Ingredient:</Label>
                                <Input id="newIngredientType" type="select" defaultValue="Select Type" onChange={this.handleFieldChange}>
                            
                                    <option>Select Type</option>
                                    {
                                        this.props.types.map(type => {
                                            return <option key={type.id}>{type.name}</option>
                                        })
                                    }
                                </Input>
                                    {
                                        this.state.selectType &&
                                        <span className="select-type-error">** Please Select a Type **</span>
                                    }
                                <Label htmlFor="newIngredientName">Add new ingredient:</Label>
                                <Input id="newIngredientName" type="text" placeholder="Name of ingredient" onChange={this.handleFieldChange}/>
                            </div>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.saveNewIngredient}>Save</Button>{' '}
                                    <Button corol="info" onClick={this.toggleNested}>Cancel</Button>   </ModalFooter>
                        </Modal>
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