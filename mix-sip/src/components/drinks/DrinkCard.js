import React, { Component } from "react"; 
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Icon, Card, Divider } from 'semantic-ui-react';
import DataManager from "../../modules/DataManager";
import EditModal from "./EditModal";
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// library.add(faTrashAlt)

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
                <Card centered className="drink-card">
                    <Card.Content>
                        <Card.Header textAlign="center" className="capitalize font">{this.props.drink.name}</Card.Header>
                        <Divider />
                        <Card.Meta textAlign="center">{this.props.drink.description}</Card.Meta>
                    </Card.Content>
                    <div className="type-container">
                        <div className="type-list">
                            <h5 className="justify-center font">Bases</h5>
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
                        <div className="type-divider"></div>
                        <div className="type-list">
                            <h5 className="justify-center font">Mixers</h5>
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
                        <div className="type-divider"></div>
                        <div className="type-list">
                            <h5 className="justify-center font">Garnishes</h5>
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
                    <Divider />
                    <div>
                        <h5 className="justify-center font">Mixing Directions</h5>
                        <p>{this.props.drink.directions}</p>
                    </div>
                    <Card.Content>
                        <Button.Group floated="right">
                            <Button animated  onClick={this.deleteDrink}>
                                <Button.Content visible><Icon name="trash alternate outline"/></Button.Content>
                                <Button.Content hidden className="font">Remove</Button.Content>
                            </Button>
                            <EditModal drink={this.props.drink} drinks={this.props.drinks}
                            drinkIngredients={this.props.drinkIngredients}
                            ingredients={this.props.ingredients}
                            types={this.props.types}
                            resetData={this.props.resetData}
                            user={this.props.user}
                            addIngredient={this.props.addIngredient} />
                        </Button.Group>
                    </Card.Content>
                </Card>
            </React.Fragment>
        )
    }
}