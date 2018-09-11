import React, { Component } from "react";
// import { Redirect, Route} from "react-router-dom";
import Navbar from "./nav/Navbar";
import DataManager from "../modules/DataManager";
import DrinkList from "./drinks/DrinkList"

export default class UserPage extends Component {
    state = {
        user: {},
        drinks: [],
        drinkIngredients: [],
        ingredients: [],
        types: [],
    }

    componentDidMount() {
        let newState = {}
        let user = JSON.parse(sessionStorage.getItem("user"))[0]
        newState.user = user 
        DataManager.getUserData("drinks", newState.user.id)
        .then(drinks => newState.drinks = drinks)
        .then(() => DataManager.getUserData("drinkIngredients", newState.user.id))
        .then(drinkIngredients => newState.drinkIngredients = drinkIngredients)
        .then(() => DataManager.getUserData("ingredients", newState.user.id))
        .then(ingredients => newState.ingredients = ingredients)
        .then(() => DataManager.getUserData("types", newState.user.id))
        .then(types => newState.types = types)
        .then(() => this.setState(newState))
    }

    render() {
        return (
            <div>
                <Navbar {...this.props}/>
                <DrinkList
                    drinks={this.state.drinks}
                    drinkIngredients={this.state.drinkIngredients}
                    ingredients={this.state.ingredients}
                    types={this.state.types} />
                
            </div>
        )
    }
}