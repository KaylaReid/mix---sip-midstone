import React from 'react';
import { Button, Modal, ModalFooter } from 'reactstrap';
import DrinkIngredientCard from './DrinkIngredientCard';
import DataManager from "../../modules/DataManager";
import AddIngEdit from "./AddIngEdit";

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: "",
      description: "",
      directions: "",
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

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
    .then(() => this.toggle())
  }


  render() {
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
    return (
      <div>
        <Button outline color="info" onClick={this.toggle} id={this.props.drink.id}>Edit</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
            <div>
                    <label htmlFor="name">Drink Name:</label>
                    <input type="text" className="form-control" onChange={this.handleFieldChange} id="name" defaultValue={this.props.drink.name} />

                    <label htmlFor="description">Drink Description:</label>
                    <input type="text" className="form-control" onChange={this.handleFieldChange} id="description" defaultValue={this.props.drink.description} />
                    
                    <label htmlFor="directions">Mixing Directions:</label>
                    <input type="text" className="form-control" onChange={this.handleFieldChange} id="directions" defaultValue={this.props.drink.directions} />
            </div>
            <div>
              <AddIngEdit ingredients={this.props.ingredients}
                  types={this.props.types}
                  user={this.props.user}
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
          <ModalFooter>
            <Button color="primary" onClick={this.saveChanges}>Save Changes</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditModal;