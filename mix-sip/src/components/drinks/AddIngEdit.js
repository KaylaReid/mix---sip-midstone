import React, { Component } from 'react'
import { Button, Input, Message, Divider, Form} from 'semantic-ui-react'
import DataManager from "../../modules/DataManager"
import AddIngredient from './AddIngredient';

export default class AddIngEdit extends Component {
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
                alreadyQueued: false, 
                showIngs: true
            })
        } else if(this.state.inputIngredients.find(ing => ing.name.toLowerCase() === this.state.ingredient.toLowerCase())){
            this.setState({
                alreadyQueued: true,
                alreadyInDrink: false,
                showIngs: true
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
            // showIngs: false
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
                <div className="justify-center">
                    {
                        !this.state.hideAddIngBtn &&
                        <Button size="small" className="font" onClick={this.changeState}>Add a new ingredient</Button>
                    }
                </div>
                <div>
                {
                    this.state.showAddIng && 
                    <div>
                        <h4 className="font align-center">Add ingredients</h4>
                        <div className="font align-center margin-bottom">
                            {
                                this.state.inputIngredients.map(ing => {
                                    return <p key={`drink-${ing.ingredientId}`}><span className="capitalize font">{ing.name}</span> {ing.amount}</p>
                                })
                            }
                        </div>
                        {
                            this.state.alreadyInDrink &&
                            <Message info>This ingredient is aleady in this drink mix. Try editing the amount instead!</Message>

                        }
                        {
                            this.state.alreadyQueued &&
                            <Message info>This ingredient is aleady queued to be added to this drink mix.</Message>
                        }
                        <div className="ingredient-declare">
                            {
                                this.state.selectIng &&
                                <Message info>
                                Please select a ingredient!
                                </Message>
                            }
                            <Form>
                                <Input fluid className="font margin-bottom" onChange={this.updateSearch.bind(this)} value={this.state.search} type="text" label={{ content: 'Ingredient'}} placeholder="Search for an ingredient by name"></Input>
                                <div className="margin-bottom">
                                    {
                                        this.state.showIngs &&
                                        filteredIngredients.map(ing => {
                                            return <Message floating key={ing.id} size="mini"><option className="font" id="ingredient" 
                                            onClick={this.selcetIngredient}>{ing.name}</option></Message>
                                        })
                                    }
                                </div>
                                {
                                    this.state.amountIsBlank && 
                                    <Message info>
                                    Please give this ingredient an amount!
                                    </Message>
                                }
                            </Form>
                            <Form>
                                <Input fluid className="font margin-bottom" id="amount" type="text" label={{ content: 'Amount'}} placeholder="Ex. 1oz.
                                1/2 wedge, 1 squeeze" defaultValue={this.state.amount} onChange={this.handleFieldChange} />
                            </Form>
                        </div>
                        <div>
                            <Button size="small" className="font" onClick={this.addIngredient}>Add to Drink</Button>
                            <Button size="small" className="font" onClick={this.saveAdded}>Save Added Ingredients</Button>
                            <Divider />
                            <div>
                                <h4 className="font align-center">Don't see the ingredient your looking for? Add a New one!</h4>
                                <AddIngredient user={this.props.user} types={this.props.types} ingredients={this.props.ingredients} addIngredient={this.props.addIngredient} />
                            </div> 
                        </div>
                        <Divider />
                    </div>
                }
                </div>
            </div>       
        )
    }
}
