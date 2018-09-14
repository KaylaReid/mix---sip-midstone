import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Alert } from 'reactstrap';
import DataManager from "../../modules/DataManager"
import "./drinks.css"

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false, 
            nestedModal: false,
            closeAll: false,
            selectType: false,
            ingredient: "",
            amount: "",
            inputIngredients: [],
            isEmpty: false,
            allReadyHave: false,
            amountIsBlank: false,
            selectIng: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
    }

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
        this.resetForm()
    }

    toggleNested() {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: false,
          allReadyHave: false
        });
      }
    
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    resetForm = () => {
        this.setState({
            amount: "",
            inputIngredients: [],
            drinkName: "",
            drinkDescription: "",
            drinkDirections: ""
        })
    }

    saveNewIngredient = () => {
        if(this.props.ingredients.find(ing => ing.name.toLowerCase() === this.state.newIngredientName.toLowerCase())){
            this.setState({allReadyHave: true})
        } else {
            let newIngredient = {
                name: this.state.newIngredientName.toLowerCase(),
                typeId: this.props.types.find(type => type.name === this.state.newIngredientType).id,
                userId: this.props.user.id
            }
            this.toggleNested()
            this.props.addIngredient("ingredients", newIngredient)
        }
    }

    addIngredient = () => {
        this.setState({selectIng: false})
        this.setState({amountIsBlank: false})
        if(this.state.amount === "") {
            this.setState({amountIsBlank: true})
        } if(this.state.ingredient === "") {
            this.setState({selectIng: true})
        } else {
            let inputIngredients = this.state.inputIngredients
            let ingAdded = {
                name: this.state.ingredient,
                amount: this.state.amount,
                ingredienetId: this.props.ingredients.find(ing => ing.name === this.state.ingredient).id,
                userId: this.props.user.id
            }
            inputIngredients.push(ingAdded)
            document.querySelector("#ingredient").value = "Select a Ingredient";
            document.querySelector("#amount").value = "";
            this.setState({
                inputIngredients: inputIngredients,
                ingredient: "",
                amount: ""
            })
        }
    }

    saveDrink = () => {
        if(!this.state.drinkName || !this.state.drinkDescription || !this.state.drinkDirections){
           this.setState({isEmpty: true})
        } else {
            let newDrink = {
                name: this.state.drinkName.toLowerCase(),
                description: this.state.drinkDescription,
                directions: this.state.drinkDirections,
                userId: this.props.user.id
            }
            DataManager.add("drinks", newDrink)
            .then((drink) => {
                let builtIngredients = []
                this.state.inputIngredients.map(ing => {
                    let newIng = {
                        drinkId: drink.id,
                        ingredientId: ing.ingredienetId,
                        amount: ing.amount,
                        userId: ing.userId
                    }
                    return builtIngredients.push(newIng)
                })
                return builtIngredients
            })
            .then((builtIngredients) => {
                builtIngredients.map(joiner => DataManager.add("drinkIngredients", joiner))
            })
            .then(() => this.props.resetData())
            .then(() => this.resetForm())
            .then(() => this.toggle())
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
                {
                    this.state.isEmpty &&
                    <Alert color="danger">Please fill out all the fields</Alert>
                }
                <Label for="drinkName">Name:</Label>
                <Input id="drinkName" type="text" defaultValue={this.state.drinkName} placeholder="What's it called?" onChange={this.handleFieldChange} />
                <Label for="drinkDescription">Description:</Label>
                <Input id="drinkDescription" type="textarea" defaultValue={this.state.drinkDescription} placeholder="Describe your new drink!" onChange={this.handleFieldChange} />
                <div>
                    {
                        this.state.inputIngredients.map(ing => {
                            return <p key={`drink-${ing.id}`}><span className="capitalize">{ing.name}</span> {ing.amount}</p>
                        })
                    }
                </div>

                <Label>Add ingredients:</Label>
                    <div className="ingredient-declare">
                        {
                            this.state.selectIng &&
                            <Alert color="danger">
                            Please select a ingredient!
                            </Alert>
                            // <span className="select-type-error">** Please Select a Ingredient **</span>
                        }
                        <Input id="ingredient" type="select" className="capitalize" defaultValue="Select Type" onChange={this.handleFieldChange}>
                            <option id="selectIngredient">Select a Ingredient</option>
                            {
                                this.props.ingredients.map(ing => {
                                    return <option key={ing.id}>{ing.name}</option>
                                })
                            }
                            
                        </Input>
                        {
                            this.state.amountIsBlank && 
                            <Alert color="warning">
                            Please give this ingredient an amount!
                            </Alert>
                        }
                        <Label>Amount:</Label>
                        <Input id="amount" type="text" placeholder="Ex. 1oz.
                        1/2 wedge, 1 squeeze" defaultValue={this.state.amount} onChange={this.handleFieldChange}/>
                    </div>
                    <div>
                        <Button color="info" onClick={this.addIngredient}>Add Ingredient to Drink</Button>
                        <div>


                        <Label>Don't see the ingredient your looking for? Add a New one!</Label><br/>
                        <Button color="success" onClick={this.toggleNested}>Add a New Ingredient</Button>
                        <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                            <ModalHeader>Add your ingredient here, and it will be added to your collection of ingredients to choose from</ModalHeader>
                            {
                                this.state.allReadyHave &&
                                <Alert color="danger">This ingredienet is aleady in your collection. Please select it from the drop down</Alert>

                            }
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
                                <Label htmlFor="newIngredientName">Add new ingredient:</Label>
                                <Input id="newIngredientName" type="text" placeholder="Name of ingredient" onChange={this.handleFieldChange}/>
                            </div>
                                <ModalFooter>
                                <Button color="primary" onClick={this.saveNewIngredient}>Save</Button>{' '}
                                <Button corol="info" onClick={this.toggleNested}>Cancel</Button>   
                                </ModalFooter>
                        </Modal>
                        </div>
                    </div>
                <Label for="drinkDirections">Directions:</Label>
                <Input id="drinkDirections" type="textarea" defaultValue={this.state.drinkDirections} placeholder="Directions to mix the drink!" onChange={this.handleFieldChange} />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.saveDrink}>Save Drink</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        </div>
        );
    }
}

export default ModalExample;