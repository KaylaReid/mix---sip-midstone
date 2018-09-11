import React, { Component } from "react"; 

export default class DrinkCard extends Component {
    
    state = {
        drinkIngredients: []
    }

    componentDidMount() {
        let drinkIngredients = []
        this.props.drinkIngredients.filter(drinkIng => drinkIng.drinkId === this.props.drink.id).map(drinkIng => {
            let mainIng = this.props.ingredients.find(ing => ing.id === drinkIng.ingredientId)
            let ingredient = {
                name: mainIng.name,
                amount: drinkIng.amount,
                type: this.props.types.find(type => type.id === mainIng.typeId).name
            }
            drinkIngredients.push(ingredient)
        })
        this.setState({drinkIngredients: drinkIngredients})
        
    }
    
    render(){
        return(
            <React.Fragment>
                <div className="drink-card">
                    <h2>{this.props.drink.title}</h2>
                    <p>{this.props.drink.description}</p>
                    <h4>Bases:</h4>
                    {
                        this.state.drinkIngredients.map(drinkIngredient => {
                            if(drinkIngredient.type === "Base"){
                                return (
                                    <h5>{drinkIngredient.name} {drinkIngredient.amount}</h5>
                                )
                            }
                        })
                    }
                    <h4>Mixers:</h4>
                    {
                        this.state.drinkIngredients.map(drinkIngredient => {
                            if(drinkIngredient.type === "Mixer"){
                                return (
                                    <h5>{drinkIngredient.name} {drinkIngredient.amount}</h5>
                                )
                            }
                        })

                    }
                    <h4>Garnishes:</h4>
                    {
                        this.state.drinkIngredients.map(drinkIngredient => {
                            if(drinkIngredient.type === "Garnish"){
                                return(
                                    <h5>{drinkIngredient.name} 
                                    {drinkIngredient.amount}</h5>
                                )
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