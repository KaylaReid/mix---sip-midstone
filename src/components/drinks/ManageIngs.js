import React from 'react';
import EditIngCard from "./EditIngCard";
import { Button , Modal, Divider, Input, Menu } from "semantic-ui-react";
import AddIngredient from "./AddIngredient";



class EditIngList extends React.Component {
    state = { 
        open: false,
        search: ""
    }

    show = size => () => this.setState({ size, open: true })
    close = () => this.setState({ 
                        open: false,
                        search: "" 
                    })

    updateSearch(e) {
        this.setState({search: e.target.value.substr(0, 20)})
    }

    render() {
        let filteredIngredients = this.props.ingredients.filter(ing => {
            return ing.name.indexOf(this.state.search.toLowerCase()) !== -1;
        })
        const { open, size } = this.state
        return (
            <div className="manage-ing-list">
                <div className="manage-ing-button">
                    <Menu.Item onClick={this.show('tiny')}>Manage Ingredients</Menu.Item>
                </div>
                <Modal size={size} open={open} onClose={this.close}>
                    <h2 className="justify-center font manage-ing-title">Manage Your Drink Ingredients</h2>
                    <div>
                        <Input fluid onChange={this.updateSearch.bind(this)}  icon="search" iconPosition="left" className="input-margin manage-ing-top-left box-shadow-light" value={this.state.search} type="text" placeholder="Search for ingredients"></Input>
                        <div className="divider-width">
                            <Divider horizontal>Or</Divider>
                        </div>
                        <div className="add-ing-button">
                            <AddIngredient user={this.props.user} types={this.props.types} ingredients={this.props.ingredients} addIngredient={this.props.addIngredient} />
                        </div>
                    </div>
                    <Modal.Content>
                        <h3 className="justify-center font">Bases</h3>
                        <Divider/>
                        {
                            filteredIngredients.map(ingredient => {
                                if(ingredient.typeId === 1){
                                    return (<EditIngCard key={ingredient.id} 
                                                user={this.props.user}
                                                ingredient={ingredient}
                                                resetData={this.props.resetData}
                                                toGets={this.props.toGets}
                                                ingredients={this.props.ingredients}/>)
                                } else {
                                    return null
                                }
                            })
                        }
                        <h3 className="justify-center font">Mixers</h3>
                        <Divider/>
                        {
                            filteredIngredients.map(ingredient => {
                                if(ingredient.typeId === 2){
                                    return (<EditIngCard key={ingredient.id} 
                                                user={this.props.user}
                                                ingredient={ingredient}
                                                resetData={this.props.resetData}
                                                toGets={this.props.toGets}
                                                ingredients={this.props.ingredients}/>)
                                } else {
                                    return null
                                }
                            })
                        }
                        <h3 className="justify-center font">Garnishes</h3>
                        <Divider/>
                        {
                            filteredIngredients.map(ingredient => {
                                if(ingredient.typeId === 3){
                                    return (<EditIngCard key={ingredient.id} 
                                                user={this.props.user}
                                                ingredient={ingredient}
                                                resetData={this.props.resetData}
                                                toGets={this.props.toGets}
                                                ingredients={this.props.ingredients}/>)
                                } else {
                                    return null
                                }
                            })
                        }
                    </Modal.Content>
                    <Modal.Actions>
                        <Button size="small" className="font text-shadow box-shadow-m" onClick={this.close}>Exit</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default EditIngList;
