import React, { Component } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import DataManager from "../../modules/DataManager";
import EditModal from "./EditModal"

export default class DrinkCard extends Component {
    
    state = {
        drinkIngredients: [],
        editMode: false
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    deleteDrink = () => {   
        let joinerTable = this.props.drinkIngredients.filter(joiner => joiner.drinkId === this.props.drink.id)
        joinerTable.forEach(j => {
        DataManager.delete("drinkIngredients", j.id)   
        })
         DataManager.delete("drinks", this.props.drink.id)
         .then(() => this.props.resetData())       
    }

    render(){
        const drinkIngredients = this.props.drinkIngredients.filter(drinkIng => drinkIng.drinkId === this.props.drink.id);
        return(
            <React.Fragment>
                <div>
                    <h2 className="drink-card capitalize">{this.props.drink.name}</h2>
                    <p>{this.props.drink.description}</p>
                    <h5>Bases:</h5>
                    {
                        drinkIngredients.map(drinkIng => {
                            let mainIng = this.props.ingredients.find(ing => ing.id === drinkIng.ingredientId)
                            let ingredient = {
                                id: mainIng.id,
                                name: mainIng.name,
                                amount: drinkIng.amount,
                                type: this.props.types.find(type => type.id === mainIng.typeId).name
                            }
                            if(ingredient.type === "Base"){
                                return (
                                    <p key={ingredient.id}><span className="drink-card capitalize">{ingredient.name}</span> {ingredient.amount}</p>
                                )
                            } else {
                                return null
                            }
                        })
    
                    }
                    <h5>Mixers:</h5>
                    {
                        drinkIngredients.map(drinkIng => {
                            let mainIng = this.props.ingredients.find(ing => ing.id === drinkIng.ingredientId)
                            let ingredient = {
                                id: mainIng.id,
                                name: mainIng.name,
                                amount: drinkIng.amount,
                                type: this.props.types.find(type => type.id === mainIng.typeId).name
                            }
                            if(ingredient.type === "Mixer"){
                                return (
                                    <p key={ingredient.id}><span className="drink-card capitalize">{ingredient.name}</span> {ingredient.amount}</p>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                    <h5>Garnishes:</h5>
                    {
                        drinkIngredients.map(drinkIng => {
                            let mainIng = this.props.ingredients.find(ing => ing.id === drinkIng.ingredientId)
                            let ingredient = {
                                id: mainIng.id,
                                name: mainIng.name,
                                amount: drinkIng.amount,
                                type: this.props.types.find(type => type.id === mainIng.typeId).name
                            }
                            if(ingredient.type === "Garnish"){
                                return (
                                    <p key={ingredient.id}><span className="drink-card capitalize">{ingredient.name}</span> {ingredient.amount}</p>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                    <div>
                        <h5>Mixing Directions:</h5>
                        <p>{this.props.drink.directions}</p>
                    </div>
                    <Button outline color="dark" size="sm" onClick={this.deleteDrink}>Delete</Button>
                    <EditModal drink={this.props.drink} drinks={this.props.drinks}
                            drinkIngredients={this.props.drinkIngredients}
                            ingredients={this.props.ingredients}
                            types={this.props.types}
                            resetData={this.props.resetData}
                            user={this.props.user}
                            addIngredient={this.props.addIngredient} />
                </div>
            </React.Fragment>
        )
    }
}