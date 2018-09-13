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

    componentDidMount() {
        let drinkIngredients = []
        this.props.drinkIngredients.filter(drinkIng => drinkIng.drinkId === this.props.drink.id).map(drinkIng => {
            let mainIng = this.props.ingredients.find(ing => ing.id === drinkIng.ingredientId)
            let ingredient = {
                id: mainIng.id,
                name: mainIng.name,
                amount: drinkIng.amount,
                type: this.props.types.find(type => type.id === mainIng.typeId).name
            }
            return drinkIngredients.push(ingredient)
        })
        this.setState({drinkIngredients: drinkIngredients}) 
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

    editDrink = () => {
        console.log("edit was clicked")
    }
    
    render(){
        return(
            <React.Fragment>
                <div className="drink-card">
                    <h2>{this.props.drink.name}</h2>
                    <p>{this.props.drink.description}</p>
                    <h5>Bases:</h5>
                    {
                        this.state.drinkIngredients.map(drinkIngredient => {
                            if(drinkIngredient.type === "Base"){
                                return (
                                    <p key={drinkIngredient.id}>{drinkIngredient.name} {drinkIngredient.amount}</p>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                    <h5>Mixers:</h5>
                    {
                        this.state.drinkIngredients.map(drinkIngredient => {
                            if(drinkIngredient.type === "Mixer"){
                                return (
                                    <p key={drinkIngredient.id}>{drinkIngredient.name} {drinkIngredient.amount}</p>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                    <h5>Garnishes:</h5>
                    {
                        this.state.drinkIngredients.map(drinkIngredient => {
                            if(drinkIngredient.type === "Garnish"){
                                return(
                                    <p key={drinkIngredient.id}>{drinkIngredient.name} 
                                    {drinkIngredient.amount}</p>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                    <div>
                        <h5>Directions:</h5>
                        <p>{this.props.drink.directions}</p>
                    </div>
                    <Button outline color="dark" onClick={this.deleteDrink}>Delete</Button>
                    <EditModal />
                    {/* <Button outline color="info" onClick={this.editDrink}>Edit</Button> */}
                </div>
            </React.Fragment>
        )
    }
}