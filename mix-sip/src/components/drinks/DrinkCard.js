import React, { Component } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardTitle, CardText } from 'reactstrap';
import DataManager from "../../modules/DataManager";
import EditModal from "./EditModal";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faTrashAlt)

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
                <Card className="drink-card">
                    <h3 className="capitalize">{this.props.drink.name}</h3><hr/>
                    <p>{this.props.drink.description}</p>
                    <div className="type-container">
                        <div>
                            <h5>Bases</h5>
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
                                            <p key={ingredient.id}><span className="capitalize">{ingredient.name}</span> {ingredient.amount}</p>
                                        )
                                    } else {
                                        return null
                                    }
                                })
            
                            }
                        </div>
                        <div>
                            <h5>Mixers</h5>
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
                                            <p key={ingredient.id}><span className="capitalize">{ingredient.name}</span> {ingredient.amount}</p>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </div>
                        <div>
                            <h5>Garnishes</h5>
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
                                            <p key={ingredient.id}><span className="capitalize">{ingredient.name}</span> {ingredient.amount}</p>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h5>Mixing Directions</h5>
                        <p>{this.props.drink.directions}</p>
                    </div>
                    <div>
                    <Button outline className="blue-btn-outline" onClick={this.deleteDrink}><FontAwesomeIcon icon="trash-alt"/></Button>
                    <EditModal drink={this.props.drink} drinks={this.props.drinks}
                            drinkIngredients={this.props.drinkIngredients}
                            ingredients={this.props.ingredients}
                            types={this.props.types}
                            resetData={this.props.resetData}
                            user={this.props.user}
                            addIngredient={this.props.addIngredient} />
                    </div>
                </Card>
            </React.Fragment>
        )
    }
}