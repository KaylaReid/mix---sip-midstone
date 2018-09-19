import React, { Component } from "react"; 
import { Input } from 'reactstrap';
import DrinkCard from "./DrinkCard";
import AddDrink from "./AddDrink";
import EditIngList from "./EditIngList";
import "./drinkList.css"

export default class DrinkList extends Component {
    state = {
        search: ""
    }

    updateSearch(e) {
        this.setState({search: e.target.value.substr(0, 20)})
    }
    
    render(){
        let filteredDrinks = this.props.drinks.filter(ing => {
            return ing.name.indexOf(this.state.search.toLowerCase()) !== -1;
        })
        return(
            <React.Fragment>
                <div className="wrapper">
                    <AddDrink user={this.props.user}
                            addIngredient={this.props.addIngredient}
                            drinkIngredients={this.props.drinkIngredients}
                            ingredients={this.props.ingredients} 
                            types={this.props.types}
                            resetData={this.props.resetData} />
                    <EditIngList ingredients={this.props.ingredients} 
                            types={this.props.types}
                            resetData={this.props.resetData}/>
                    <div>
                        <Input onChange={this.updateSearch.bind(this)} value={this.state.search} type="text" placeholder="Look for drinks"></Input>
                    </div>
                    <div className="drink-list">
                        {
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