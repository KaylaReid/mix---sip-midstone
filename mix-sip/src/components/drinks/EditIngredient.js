import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditIngredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="warning" onClick={this.toggle}>Manage Ingredients</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader>Please note making changes to a ingredient here will update it everywhere the ingrednient is used! This feature is recomended for spelling corections only.</ModalHeader>
          <ModalBody>
            <h3>Bases:</h3>
            {
                this.props.ingredients.map(ingredient => {
                    if(ingredient.typeId === 1){
                        return (
                            <div>
                                <p key={`base-${ingredient.id}`} className="capitalize">{ingredient.name}</p> 
                                <Button color="success">Edit?</Button>
                            </div>
                                )
                    } else {
                        return null
                    }
                })
            }
            <h3>Mixers:</h3>
            {
                this.props.ingredients.map(ingredient => {
                    if(ingredient.typeId === 2){
                        return (
                            <div>
                                <p key={`mixer-${ingredient.id}`} className="capitalize">{ingredient.name}</p> 
                                <Button color="success">Edit?</Button>
                            </div>
                                )
                    } else {
                        return null
                    }
                })
            }
            <h3>Garnishes:</h3>
            {
                this.props.ingredients.map(ingredient => {
                    if(ingredient.typeId === 3){
                        return (
                            <div>
                                <p key={`garnish-${ingredient.id}`} className="capitalize">{ingredient.name}</p> 
                                <Button color="success">Edit?</Button>
                            </div>
                                )
                    } else {
                        return null
                    }
                })
            }
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditIngredient;