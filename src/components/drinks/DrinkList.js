import React, { Component } from "react"; 
import { Input } from 'semantic-ui-react';
import DrinkCard from "./DrinkCard";
import AddDrink from "./AddDrink";
import { Button } from "semantic-ui-react";
import JackGif from "../images/captJack.gif"
import "./drinkList.css"
import 'semantic-ui-css/semantic.min.css';

export default class DrinkList extends Component {
    state = {
        search: "",
        canMix: false,
    }

    updateSearch(e) {
        this.setState({search: e.target.value.substr(0, 20)})
    }

    render(){
        let filteredDrinks = this.props.drinks.filter(ing => {
            return ing.name.indexOf(this.state.search.toLowerCase()) !== -1;
        })
        let mixCount = 0
        return(
            <React.Fragment>
                <div>
                    <div className="drink-list-header">
                        <div className="margin-top">
                            <AddDrink user={this.props.user}
                                    addIngredient={this.props.addIngredient}
                                    drinkIngredients={this.props.drinkIngredients}
                                    ingredients={this.props.ingredients} 
                                    types={this.props.types}
                                    resetData={this.props.resetData} />
                        </div>
                        <div className="search-bar box-shadow">
                            <Input className="placeholder-text" icon="search" iconPosition="left" fluid onChange={this.updateSearch.bind(this)} value={this.state.search} type="text" placeholder="Look for drinks"></Input>
                        </div>
                        <div className="margin-top">
                            {
                                !this.state.canMix &&
                                <Button className="font box-shadow text-shadow" color="blue" size="small" onClick={() => this.setState({canMix: true})}>Mix It Now?</Button>
                            }
                            {
                                this.state.canMix &&
                                <Button className="font box-shadow text-shadow" color="blue" size="small" onClick={() => this.setState({canMix: false})}>All Drinks</Button>
                            }
                        </div>
                    </div>
                    <div className="drink-list">
                        {
                            this.state.canMix &&
                            filteredDrinks.map(drink => {  
                                let drinkIngs = this.props.drinkIngredients.filter(di => di.drinkId === drink.id)
                                let actualIngredients = []
                                drinkIngs.map(di => {
                                    let ing = this.props.ingredients.find(ing => ing.id === di.ingredientId)
                                    return actualIngredients.push(ing)
                                })
                                let onHands = actualIngredients.filter(aI => aI.onHand)
                                if(onHands.length === actualIngredients.length){
                                    mixCount = mixCount + 1
                                    return <DrinkCard key={drink.id} drink={drink} 
                                                drinks={this.props.drinks}
                                                drinkIngredients={this.props.drinkIngredients}
                                                ingredients={this.props.ingredients}
                                                types={this.props.types}
                                                resetData={this.props.resetData}
                                                user={this.props.user}
                                                addIngredient={this.props.addIngredient} />
                                } else {
                                    return null
                                }
                            })
                        }
                        {
                            this.state.canMix &&
                            mixCount === 0 &&
                            <div className="captain-jack">
                                <img src={JackGif} alt="Jack Sparrow" />
                            </div>
                        }
                        {
                            !this.state.canMix &&
                            filteredDrinks.map(drink => 
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
                </div>
            </React.Fragment>
        )
    }

}