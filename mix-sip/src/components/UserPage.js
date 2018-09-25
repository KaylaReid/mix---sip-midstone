import React, { Component } from "react";
import Navbar from "./nav/Navbar";
import DataManager from "../modules/DataManager";
import DrinkList from "./drinks/DrinkList";
import "./userPage.css"
import OnHandList from "./drinks/OnHandList";
import { Tab } from "semantic-ui-react";
import ToGetList from "./drinks/ToGetList";
import ManageIngs from "./drinks/ManageIngs"

export default class UserPage extends Component {
    state = {
        user: {},
        drinks: [],
        drinkIngredients: [],
        ingredients: [],
        toGets: [],
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
        .then(() => DataManager.getUserData("toGetIngredients", newState.user.id))
        .then(toGets => newState.toGets = toGets)
        .then(() => DataManager.getUserData("types", newState.user.id))
        .then(types => newState.types = types)
        .then(() => this.setState(newState))
    }

    addIngredient = (resource, object) => {
        return DataManager.add(resource, object)
        .then(() => DataManager.getUserData("ingredients", this.state.user.id))
        .then(ingredients => this.setState({ingredients: ingredients}))
    }

    resetData = () => {
        let newState = {}
        let user = JSON.parse(sessionStorage.getItem("user"))[0]
        newState.user = user 
        return DataManager.getUserData("drinks", newState.user.id)
        .then(drinks => newState.drinks = drinks)
        .then(() => DataManager.getUserData("drinkIngredients", newState.user.id))
        .then(drinkIngredients => newState.drinkIngredients = drinkIngredients)
        .then(() => DataManager.getUserData("ingredients", newState.user.id))
        .then(ingredients => newState.ingredients = ingredients)
        .then(() => DataManager.getUserData("toGetIngredients", newState.user.id))
        .then(toGets => newState.toGets = toGets)
        .then(() => DataManager.getUserData("types", newState.user.id))
        .then(types => newState.types = types)
        .then(() => this.setState(newState))
    }

    render() {
        const panes = [
            { menuItem: 'On Hand', render: () => <Tab.Pane attached={false}><OnHandList 
                                                    ingredients={this.state.ingredients}
                                                    types={this.state.types}
                                                    resetData={this.resetData} /></Tab.Pane> },
            { menuItem: 'To Get', render: () => <Tab.Pane attached={false}><ToGetList 
                                                    ingredients={this.state.ingredients}
                                                    types={this.state.types}
                                                    resetData={this.resetData}
                                                    user={this.state.user}
                                                    toGets={this.state.toGets} /></Tab.Pane> },
          ]
        return (
            <div>
                <Navbar {...this.props}
                    user={this.state.user}/>
                <div className="wrapper main-content">
                    <div className="main-left">
                        <DrinkList
                            user={this.state.user}
                            drinks={this.state.drinks}
                            drinkIngredients={this.state.drinkIngredients}
                            ingredients={this.state.ingredients}
                            types={this.state.types}
                            toGets={this.state.toGets}
                            addIngredient={this.addIngredient}
                            resetData={this.resetData} />
                    </div>
                    <div className="main-right">
                        <ManageIngs user={this.state.user}
                                    toGets={this.state.toGets}
                                    addIngredient={this.addIngredient}
                                    ingredients={this.state.ingredients} 
                                    types={this.state.types}
                                    resetData={this.resetData}/>
                        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                        
                    </div>
                </div>
            </div>
        )
    }
}