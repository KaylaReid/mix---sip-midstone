import React, { Component } from 'react'
import { Button, Input, Message } from 'semantic-ui-react'
import DataManager from "../../modules/DataManager"
import AddIngredient from './AddIngredient';

export default class AddEdit2 extends Component {
    state = { 
        ingredient: "",
        amount: "",
        inputIngredients: [],
        isEmpty: false,
        amountIsBlank: false,
        selectIng: false,
        showAddIng: false,
        hideAddIngBtn: false,
        alreadyInDrink: false,
        alreadyQueued: false,
        search: "",
        showIngs: true
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
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
                                <AddIngredient user={this.props.user} types={this.props.types} ingredients={this.props.ingredients} addIngredient={this.props.addIngredient} />
                            </div> 
                        </div>
                    </div>
                }
                </div>
            </div>       
        )
    }
}
