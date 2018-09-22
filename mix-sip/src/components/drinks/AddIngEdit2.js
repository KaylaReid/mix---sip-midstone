import React, { Component } from 'react'
import { Button, Modal, Input, Message, Form } from 'semantic-ui-react'
import DataManager from "../../modules/DataManager"

export default class AddEdit2 extends Component {
    state = { 
        open: false,
        nestedOpen: false, 
        selectType: false,
        ingredient: "",
        amount: "",
        newIngredientType: "",
        newIngredientName: "",
        inputIngredients: [],
        isEmpty: false,
        alreadyHave: false,
        amountIsBlank: false,
        selectIng: false,
        showAddIng: false,
        hideAddIngBtn: false,
        alreadyInDrink: false,
        alreadyQueued: false,
        search: "",
        showIngs: true
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false, alreadyHave: false, selectType: false })
    // nestedOpen = () => this.setState({ nestedOpen: true })
    // nestedClose = () => this.setState({ nestedOpen: false, alreadyHave: false })

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    saveNewIngredient = () => {
        if(this.state.newIngredientType.length === 0){
            console.log("no type")
            this.setState({selectType: true})
        } else if(this.props.ingredients.find(ing => ing.name.toLowerCase() === this.state.newIngredientName.toLowerCase())){
            console.log("already have")
            this.setState({alreadyHave: true, selectType: false})
        } else {
            console.log(" got here ")
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

    addIngredient = () => {
        this.setState({selectIng: false})
        this.setState({amountIsBlank: false})
        let drinkIngredients = this.props.drinkIngredients.filter(ing => ing.drinkId === this.props.drinkId)
        let betterIngs = [];
        drinkIngredients.map(ing => {
            let betterIng = {
                name: this.props.ingredients.find(i => ing.ingredientId === i.id).name
            }
            return betterIngs.push(betterIng)
        })
        if(this.state.amount === "") {
            this.setState({amountIsBlank: true})
        } else if(this.state.ingredient === "") {
            this.setState({selectIng: true})
        } else if(betterIngs.find(ing => ing.name === this.state.ingredient)){
            this.setState({
                alreadyInDrink: true,
                alreadyQueued: false
            })
        } else if(this.state.inputIngredients.find(ing => ing.name.toLowerCase() === this.state.ingredient.toLowerCase())){
            this.setState({
                alreadyQueued: true,
                alreadyInDrink: false
            })
        } else {
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
                alreadyInDrink: false,
                search: "",
                showIngs: true
            })
        }
    }

    saveAdded = () => {
        let addedIngredients = []
        this.state.inputIngredients.map(ing => {
            let newIng = {
                drinkId: this.props.drinkId,
                ingredientId: ing.ingredientId,
                amount: ing.amount,
                userId: ing.userId
            }
            return addedIngredients.push(newIng)
        })
        Promise.all(addedIngredients.map(joiner => DataManager.add("drinkIngredients", joiner)))
        .then(() => this.props.resetData())
        .then(() => this.setState({
                    hideAddIngBtn: false, 
                    showAddIng: false,}))
    }

    changeState = () => {
        this.setState({
            showAddIng: true,
            hideAddIngBtn: true
        })
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
        const { open } = this.state
        let mixTypes = []
        // mixTypes.push({text: "Select Type", value: "Select Type"})
        this.props.types.map(type => mixTypes.push({key: type.name, text: type.name, value: type.name}))
        let filteredIngredients = []
        if(this.state.search.length > 1){
            filteredIngredients = this.props.ingredients.filter(ing => {
                return ing.name.indexOf(this.state.search.toLowerCase()) !== -1;
            })
        }
        return (
            <div>
                <div>
                    {
                        !this.state.hideAddIngBtn &&
                        <Button size="mini" onClick={this.changeState}>Add a new ingredient</Button>
                    }
                </div>
                <div>
                {
                    this.state.showAddIng && 
                    <div>
                        {
                            this.state.inputIngredients.map(ing => {
                                return <p key={`drink-${ing.ingredientId}`}><span className="capitalize">{ing.name}</span> {ing.amount}</p>
                            })
                        }
                        <label>Add ingredients:</label>
                        {
                            this.state.alreadyInDrink &&
                            <Message info>This ingredienet is aleady in this drink mix. Try editing the amount instead!</Message>

                        }
                        {
                            this.state.alreadyQueued &&
                            <Message info>This ingredienet is aleady queued to be added to this drink mix.</Message>
                        }
                        <div className="ingredient-declare">
                            {
                                this.state.selectIng &&
                                <Message info>
                                Please select a ingredient!
                                </Message>
                            }
                            <Input onChange={this.updateSearch.bind(this)} value={this.state.search} type="text" placeholder="Search for ingredient by name"></Input>
                            {
                                this.state.showIngs &&
                                filteredIngredients.map(ing => {
                                    return <option id="ingredient" 
                                    onClick={this.selcetIngredient} key={ing.id}>{ing.name}</option>
                                })
                            }
                            {
                                this.state.amountIsBlank && 
                                <Message info>
                                Please give this ingredient an amount!
                                </Message>
                            }
                            <label>Amount:</label>
                            <Input id="amount" type="text" placeholder="Ex. 1oz.
                            1/2 wedge, 1 squeeze" defaultValue={this.state.amount} onChange={this.handleFieldChange}/>
                        </div>
                        <div>
                            <Button size="mini" onClick={this.addIngredient}>Add Ingredient to Drink</Button>
                            <Button size="mini" onClick={this.saveAdded}>Save Added Ingredients</Button>
                            <div>
                                <label>Don't see the ingredient your looking for? Add a New one!</label><br/>
                                <Modal open={open} onOpen={this.open} onClose={this.close} size='tiny'
                                        trigger={<Button size="mini">Add a New Ingredient</Button>}>
                                    <Modal.Header>Add your ingredient here, and it will be added to your collection of ingredients to choose from</Modal.Header>
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
                                        
                                        <Input size="medium" className="modal-input input-margin" label={{ color: "info", labelPosition: 'left', content: 'Type' }}list="types" id="newIngredientType" onChange={this.handleFieldChange} placeholder="Select Type" />
                                            <datalist id="types">
                                                {
                                                    this.props.types.map(type => <option key={type.id} value={type.name}/>)
                                                }
                                            </datalist>
                                        <Input size="medium" className="modal-input input-margin" label={{ color: "info", labelPosition: 'left', content: 'Name' }}id="newIngredientName" type="text" placeholder="Name of ingredient" onChange={this.handleFieldChange}/>
                                      
                                    </div>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button size="mini" onClick={this.saveNewIngredient}>Save</Button>{' '}
                                        <Button size="mini" onClick={this.close}>Cancel</Button>   
                                    </Modal.Actions>
                                </Modal>
                            </div>
                        </div>
                    </div>
                }
                </div>
            </div>       
        )
    }
}
