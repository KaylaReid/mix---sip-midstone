import React, { Component } from "react";
import { Button, Icon, Divider } from "semantic-ui-react";
import DataManager from "../../modules/DataManager";

export default class ToGetList extends Component {
    
    removeFromToGet = (item, ingredient) => {
        DataManager.delete("toGetIngredients", item.id)
        .then(() => DataManager.patch("ingredients", {onHand:true}, ingredient.id))
        .then(() => this.props.resetData())
    }

    render(){
        return (
            <div className="onhand-list">
                <h3 className="font align-center">Ingredients To Get</h3>
                <Divider />
                {
                    this.props.toGets.map(item => {
                        let ingredient = this.props.ingredients.find(ing => ing.id === item.ingredientId)
                        return (
                            <div key={`{toGet-${item.id}}`}>
                                <div className="onHand-contents">
                                    <p className="capitalize">{ingredient.name}</p>
                                    <Button animated size="mini" className="font" onClick={() => this.removeFromToGet(item, ingredient)}>
                                        <Button.Content visible><Icon name="credit card" /></Button.Content>
                                        <Button.Content hidden>Bought</Button.Content>
                                    </Button>
                                </div>
                                <Divider />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}