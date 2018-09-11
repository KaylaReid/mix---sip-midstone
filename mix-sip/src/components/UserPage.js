import React, { Component } from "react";
// import { Redirect, Route} from "react-router-dom";
import Navbar from "./nav/Navbar";
import DataManager from "../modules/DataManager";

export default class UserPage extends Component {
    state = {
        user: {},
        drinkMixes: [],
        drinkIngrRels: [],
        ingredients: [],
        types: [],
    }

    componentDidMount() {
        let newState = {}
        let user = JSON.parse(sessionStorage.getItem("user"))[0]
        newState.user = user 
        DataManager.getUserData("drinkMixes", newState.user.id)
        .then(drinkMixes => newState.drinkMixes = drinkMixes)
        .then(() => DataManager.getUserData("drinkIngrRels", newState.user.id))
        .then(drinkIngrRels => newState.drinkIngrRels = drinkIngrRels)
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
                {/* <DrinkList  */}
            </div>
        )
    }
}