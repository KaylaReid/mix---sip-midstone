import React, { Component } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DrinkCard extends Component {
    
    state = {
        drinkIngredients: []
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
    
    render(){
        return(
            <React.Fragment>
                <div className="drink-card">
                    <h2>{this.props.drink.name}</h2>
                    <p>{this.props.drink.description}</p>
                    <h4>Bases:</h4>
                    {
                        this.state.drinkIngredients.map(drinkIngredient => {
                            if(drinkIngredient.type === "Base"){
                                return (
                                    <h5 key={drinkIngredient.id}>{drinkIngredient.name} {drinkIngredient.amount}</h5>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                    <h4>Mixers:</h4>
                    {
                        this.state.drinkIngredients.map(drinkIngredient => {
                            if(drinkIngredient.type === "Mixer"){
                                return (
                                    <h5 key={drinkIngredient.id}>{drinkIngredient.name} {drinkIngredient.amount}</h5>
                                )
                            } else {
                                return null
                            }
                        })

                    }
                    <h4>Garnishes:</h4>
                    {
                        this.state.drinkIngredients.map(drinkIngredient => {
                            if(drinkIngredient.type === "Garnish"){
                                return(
                                    <h5 key={drinkIngredient.id}>{drinkIngredient.name} 
                                    {drinkIngredient.amount}</h5>
                                )
                            } else {
                                return null
                            }
                        })

                    }
                    <div>
                        <h4>Directions:</h4>
                        <p>{this.props.drink.directions}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}