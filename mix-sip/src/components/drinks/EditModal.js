import React from 'react';
import DrinkIngredientCard from './DrinkIngredientCard';
import DataManager from "../../modules/DataManager";
import AddIngEdit from "./AddIngEdit";
import { Modal, Button, Icon, Form } from "semantic-ui-react";


class EditModal extends React.Component {
    state = {
        open: false,
        name: "",
        description: "",
        directions: "",
    };

 

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount(){
        this.setState({
            name: this.props.drink.name,
            description: this.props.drink.description,
            directions: this.props.drink.directions
        })
    }

    saveChanges = (event) => {
        event.preventDefault()
        const saveChanges = {
            name: this.state.name,
            description: this.state.description,
            directions: this.state.directions
        }
        DataManager.patch("drinks", saveChanges, this.props.drink.id)
        .then(() => this.props.resetData())
        .then(() => this.close())
    }

    show = size => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })


  render() {
    const { open, size } = this.state
        return (
            <div>     
                <Button basic color="blue" animated onClick={this.show('tiny')}>
                    <Button.Content visible><Icon name="edit" /></Button.Content>
                    <Button.Content hidden className="font">Edit</Button.Content>
                </Button>
                <Modal size={size} open={open} onClose={this.close}>
                    <Modal.Content>
                        <Form>
                            <label htmlFor="name">Drink Name:</label>
                            <input type="text" className="form-control" onChange={this.handleFieldChange} id="name" defaultValue={this.props.drink.name} />

                            <label htmlFor="description">Drink Description:</label>
                            <input type="text" className="form-control" onChange={this.handleFieldChange} id="description" defaultValue={this.props.drink.description} />
                            
                            <label htmlFor="directions">Mixing Directions:</label>
                            <input type="text" className="form-control" onChange={this.handleFieldChange} id="directions" defaultValue={this.props.drink.directions} />
                        </Form>
                        <div>
                            <AddIngEdit ingredients={this.props.ingredients}
                                types={this.props.types}
                                user={this.props.user}
                                drinkIngredients={this.props.drinkIngredients}
                                addIngredient={this.props.addIngredient}
                                drinkId={this.props.drink.id}
                                resetData={this.props.resetData}
                                />
                        </div>
                        <div>
                            {
                                this.props.drinkIngredients.filter(di => di.drinkId === this.props.drink.id).map(di => {
                                    let name = this.props.ingredients.find(ing => ing.id === di.ingredientId).name
                                    return ( 
                                        <DrinkIngredientCard key={di.id} 
                                            drinkIngredient={di} 
                                            name={name} 
                                            resetData={this.props.resetData}/>
                                    )
                                })
                            }
                        </div>
                    </Modal.Content>  
                    <Modal.Actions>
                        <Button size="mini" className="font" onClick={this.saveChanges}>Save Changes</Button>{' '}
                        <Button size="mini" className="font" onClick={this.close}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default EditModal;