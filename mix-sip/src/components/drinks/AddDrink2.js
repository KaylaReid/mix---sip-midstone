import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Alert } from 'reactstrap';
import DataManager from "../../modules/DataManager"


class AddDrink2 extends React.Component {
    state = {
        open: false, 
        nestedOpen: false,
        closeAll: false,
        selectType: false,
        ingredient: "",
        amount: "",
        inputIngredients: [],
        isEmpty: false,
        aleadyHave: false,
        amountIsBlank: false,
        selectIng: false,
        alreadyQueued: false,
        search: "",
        showIngs: true
    };

    open = () => this.setState({ open: true })
    close = () => {
        this.setState({ open: false}
        this.resetForm()
    })
    nestedOpen = () => this.setState({ nestedOpen: true })
    nestedClose = () => this.setState({ nestedOpen: false, alreadyHave: false })
    // toggle() {
    //     this.setState({
    //     modal: !this.state.modal
    //     });
    //     this.resetForm()
    // }

    // toggleNested() {
    //     this.setState({
    //       nestedModal: !this.state.nestedModal,
    //       closeAll: false,
    //       allReadyHave: false
    //     });
    //   }
    
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
            drinkDirections: "",
            search: ""
        })
    }

    saveNewIngredient = () => {
        if(this.props.ingredients.find(ing => ing.name.toLowerCase() === this.state.newIngredientName.toLowerCase())){
            this.setState({alreadyHave: true})
        } else {
            let newIngredient = {
                onHand: false,
                name: this.state.newIngredientName.toLowerCase(),
                typeId: this.props.types.find(type => type.name === this.state.newIngredientType).id,
                userId: this.props.user.id
            }
            this.nestedClose()
            this.props.addIngredient("ingredients", newIngredient)
        }
    }

    addIngredient = () => {
        this.setState({selectIng: false})
        this.setState({amountIsBlank: false})
        if(this.state.amount === "") {
            this.setState({amountIsBlank: true})
        } else if(this.state.ingredient === "") {
            this.setState({selectIng: true})
        } else if(this.state.inputIngredients.find(ing => ing.name.toLowerCase() === this.state.ingredient.toLowerCase())){
            this.setState({
                alreadyQueued: true,
            })
        }else {
            let inputIngredients = this.state.inputIngredients
            let ingAdded = {
                name: this.state.ingredient,
                amount: this.state.amount,
                ingredientId: this.props.ingredients.find(ing => ing.name === this.state.ingredient).id,
                userId: this.props.user.id
            }
            inputIngredients.push(ingAdded)
            document.querySelector("#amount").value = "";
            this.setState({
                inputIngredients: inputIngredients,
                ingredient: "",
                amount: "",
                alreadyQueued: false,
                search: "",
                showIngs: true
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
                        ingredientId: ing.ingredientId,
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
            // .then(() => this.resetForm())
            .then(() => this.close())
        }
    }

    selcetIngredient = (e) => {
        this.handleFieldChange(e)
        this.setState({
            search: e.target.value,
            showIngs: false
        })
    }

    updateSearch(e) {
        this.setState({search: e.target.value.substr(0, 20)})
    }

    render() {
        let filteredIngredients = []
        if(this.state.search.length > 1){
            filteredIngredients = this.props.ingredients.filter(ing => {
                return ing.name.indexOf(this.state.search.toLowerCase()) !== -1;
            })
        } 
        return (
        <div>
            
            <Modal open={open} onOpen={this.open} onClose={this.close} size='tiny'
                trigger={<Button className="blue-button" size="mini">Add a New Drink!</Button>}>
            <Modal.Header>Add a new drink to your collection!</Modal.Header>
            <Modal.Content>
                {
                    this.state.isEmpty &&
                    <Message info>Please fill out all the fields</Message>
                }
                <Input label={{ color: "info", labelPosition: 'left', content: 'Name' }} id="drinkName" type="text" defaultValue={this.state.drinkName} placeholder="What's it called?" onChange={this.handleFieldChange} />
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name' />
                    </Form.Field>
                </Form>
                <label>Description:</label>
                <Input label={{ color: "info", labelPosition: 'left', content: 'Description' }}id="drinkDescription" type="textarea" defaultValue={this.state.drinkDescription} placeholder="Describe your new drink!" onChange={this.handleFieldChange} />
                <div>
                    {   
                        this.state.inputIngredients.map(ing => {
                            return <p key={`drink-${ing.name}`}><span className="capitalize">{ing.name}</span> {ing.amount}</p>
                        })
                    }
                  
                </div>
                <Label>Add ingredients:</Label>
                    {
                        this.state.alreadyQueued &&
                        <Alert color="danger">This ingredienet is aleady queued to be added to this drink mix.</Alert>

                    }
                    <div className="ingredient-declare">
                        {
                            this.state.selectIng &&
                            <Alert color="danger">
                            Please select a ingredient!
                            </Alert>
                        }
                          <Input onChange={this.updateSearch.bind(this)} value={this.state.search} type="text" id="ingredient" placeholder="Search for ingredient by name"></Input>
                        {
                            this.state.showIngs &&
                            filteredIngredients.map(ing => {
                                return <option id="ingredient" onClick={this.selcetIngredient} key={ing.id}>{ing.name}</option>
                            })
                        }
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
                        <Button color="info" size="sm" onClick={this.addIngredient}>Add Ingredient to Drink</Button>
                        <div>


                        <Label>Don't see the ingredient your looking for? Add a New one!</Label><br/>
                        <Button color="success" size="sm" onClick={this.toggleNested}>Add a New Ingredient</Button>
                        <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                            <ModalHeader>Add your ingredient here, and it will be added to your collection of ingredients to choose from</ModalHeader>
                            <ModalBody>
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
                            </ModalBody>
                                <ModalFooter>
                                <Button color="primary" size="sm" onClick={this.saveNewIngredient}>Save</Button>{' '}
                                <Button corol="info" size="sm" onClick={this.toggleNested}>Cancel</Button>   
                                </ModalFooter>
                        </Modal>
                        </div>
                    </div>
                <Label for="drinkDirections">Directions:</Label>
                <Input id="drinkDirections" type="textarea" defaultValue={this.state.drinkDirections} placeholder="Directions to mix the drink!" onChange={this.handleFieldChange} />
            </Modal.Content>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={this.saveDrink}>Save Drink</Button>{' '}
                <Button color="secondary" size="sm" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        </div>
        );
    }
}

export default AddDrink2;