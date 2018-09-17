import React, { Component } from "react"; 
import DrinkCard from "./DrinkCard";
import AddDrink from "./AddDrink";

export default class DrinkList extends Component {
    
    render(){
        return(
            <React.Fragment>
                <div className="drink-list">
                    <AddDrink user={this.props.user}
                            addIngredient={this.props.addIngredient}
                            ingredients={this.props.ingredients} 
                            types={this.props.types}
                            resetData={this.props.resetData} />
                        {
                            this.props.drinks.map(drink => 
                            <DrinkCard key={drink.id} drink={drink} 
                            drinks={this.props.drinks}
                            drinkIngredients={this.props.drinkIngredients}
                            ingredients={this.props.ingredients}
                            types={this.props.types}
                            resetData={this.props.resetData}
                            user={this.props.user}
                            addIngredient={this.props.addIngredient} /> )
                        }
                </div>
            </React.Fragment>
        )
    }

}