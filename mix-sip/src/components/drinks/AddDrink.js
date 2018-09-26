import React from 'react';
import { Button, Modal, Input, Message, Form, TextArea, Divider } from 'semantic-ui-react';
import DataManager from "../../modules/DataManager"
import AddIngredient from './AddIngredient';


export default class AddDrink extends React.Component {
    state = {
        open: false, 
        ingredient: "",
        amount: "",
        inputIngredients: [],
        isEmpty: false,
        newIngredientName: "",
        newIngredientType: "",
        amountIsBlank: false,
        selectIng: false,
        alreadyQueued: false,
        search: "",
        showIngs: true
    };

    open = () => this.setState({ open: true })
    close = () => {
        this.setState({ open: false })
        this.resetForm()
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
            drinkDirections: "",
            search: ""
        })
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

    selectIngredient = (e) => {
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
        const { open } = this.state
        let filteredIngredients = []
        if(this.state.search.length > 1){
            filteredIngredients = this.props.ingredients.filter(ing => {
                return ing.name.indexOf(this.state.search.toLowerCase()) !== -1;
            })
        } 
        return (
        <div>
            
            <Modal open={open} onOpen={this.open} onClose={this.close} size='small'
                trigger={<Button color="blue" className="font" size="small">Add a New Drink!</Button>}>
            <Modal.Header>Add a new drink to your collection!</Modal.Header>
            <Modal.Content>
                {
                    this.state.isEmpty &&
                    <Message info>Please fill out all the fields</Message>
                }
                <Form>
                    <Form.Field>
                        <Input label={{ content: 'Name' }} labelPosition='left' id="drinkName" type="text" defaultValue={this.state.drinkName} placeholder="What's it called?" onChange={this.handleFieldChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Description:</label>
                        <TextArea id="drinkDescription" defaultValue={this.state.drinkDescription} placeholder="Describe your new drink!" onChange={this.handleFieldChange} />
                    </Form.Field>
                </Form>
                <Divider />
                <div>
                    {   
                        this.state.inputIngredients.map(ing => {
                            return <p key={`drink-${ing.name}`}><span className="capitalize">{ing.name}</span> {ing.amount}</p>
                        })
                    }
                  
                </div>
                <label>Add ingredients:</label>
                    {
                        this.state.alreadyQueued &&
                        <Message info>This ingredient is aleady queued to be added to this drink mix.</Message>

                    }
                    <div className="ingredient-declare">
                        <Form>
                            <Form.Field>
                                {
                                    this.state.selectIng &&
                                    <Message info>
                                    Please select a ingredient!
                                    </Message>
                                }
                                <Input label={{ content: "Ingredients"}} labelPosition="left" onChange={this.updateSearch.bind(this)} value={this.state.search} type="text" id="ingredient" placeholder="Search for ingredient by name"></Input>
                                {
                                    this.state.showIngs &&
                                    filteredIngredients.map(ing => {
                                        return <option id="ingredient" onClick={this.selectIngredient} key={ing.id}>{ing.name}</option>
                                    })
                                }
                            </Form.Field>
                            <Form.Field>
                                {
                                    this.state.amountIsBlank && 
                                    <Message info>
                                    Please give this ingredient an amount!
                                    </Message>
                                }
                                <Input className="input-margin" label={{ content: "Amount"}} labelPosition="left" id="amount" type="text" placeholder="Ex. 1oz.
                                1/2 wedge, 1 squeeze" defaultValue={this.state.amount} onChange={this.handleFieldChange}/>
                            </Form.Field>
                        </Form>
                        <Button size="small" className="font" onClick={this.addIngredient}>Add Ingredient to Drink</Button>
                    </div>
                    <div>
                        <Divider />
                        <p>Don't see the ingredient your looking for? Add a New one!</p>
                        <AddIngredient user={this.props.user} types={this.props.types} ingredients={this.props.ingredients} addIngredient={this.props.addIngredient} />
                        <Divider />
                    </div>
                    <Form>
                        <label>Directions:</label>
                        <TextArea id="drinkDirections" defaultValue={this.state.drinkDirections} placeholder="Directions to mix the drink!" onChange={this.handleFieldChange} />
                    </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button size="small" className="font" onClick={this.saveDrink}>Save Drink</Button>{' '}
                <Button size="small" className="font" onClick={this.close}>Cancel</Button>
            </Modal.Actions>
            </Modal>
        </div>
        );
    }
}

