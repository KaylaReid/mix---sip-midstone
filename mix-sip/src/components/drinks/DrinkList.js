import React, { Component } from "react"; 
import DrinkCard from "./DrinkCard"

export default class DrinkList extends Component {
    
    render(){
        return(
            <React.Fragment>
                <div className="drink-list">
                    {
                        this.props.drinks.map(drink => 
                        <DrinkCard key={drink.id} drink={drink} drinkIngredients={this.props.drinkIngredients}
                        ingredients={this.props.ingredients}
                        types={this.props.types} /> )
                    }
                </div>
            </React.Fragment>
        )
    }

}