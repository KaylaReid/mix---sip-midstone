import React, { Component } from "react";
import { Button, Icon, Divider } from "semantic-ui-react"
import "./onHandList.css";
import DataManager from "../../modules/DataManager";

export default class OnHandList extends Component {

    removeItem = (ingredient) => {
        DataManager.patch("ingredients", {onHand: false}, ingredient.id)
        .then(() => this.props.resetData())
    }

    render(){
        return (
            <div className="onhand-list">
                <h3>Ingredients On Hand!</h3>
                <Divider />
                {
                    this.props.ingredients.filter(i => i.onHand).map(ingredient => {
                        return (
                            <div>
                                <div className="onHand-contents">
                                    <p className="capitalize">{ingredient.name}</p>
                                    <Button animated size="mini" onClick={() => this.removeItem(ingredient)}>
                                        <Button.Content visible><Icon name="glass martini"></Icon></Button.Content>
                                        <Button.Content hidden>Drank!</Button.Content>
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