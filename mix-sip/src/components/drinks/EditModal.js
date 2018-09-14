import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  buildEditFrom = (e) => {
      this.toggle()
  }


  render() {
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
    return (
      <div>
        <Button outline color="info" onClick={this.buildEditFrom} id={this.props.drink.id}>Edit</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
            <div>
                    <label htmlFor="name">Drink Name:</label>
                    <input type="text" className="form-control" onChange={this.handleFieldChange} id="name" defaultValue={this.props.drink.name} />

                    <label htmlFor="description">Drink Description:</label>
                    <input type="text" className="form-control" onChange={this.handleFieldChange} id="description" defaultValue={this.props.drink.description} />
            </div>
            <div>
                {
                    this.props.drinkIngredients.filter(di => di.drinkId === this.props.drink.id).map(di => {
                        let name = this.props.ingredients.find(ing => ing.id === di.ingredientId).name
                        return ( 
                            <div key={di.amount}>
                                <label htmlFor="ingName" key={name} className="capitalize">{name} amount:</label>
                                <input type="text" key={di.id} className="form-control" onChange={this.handleFieldChange} id={di.id} defaultValue={di.amount} />
                                <Button color="info">Delete whole ingredient</Button>
                            </div>)
                    })
                }
            </div>
            <div>
                <label htmlFor="directions">Mixing Directions:</label>
                <input type="text" className="form-control" onChange={this.handleFieldChange} id="directions" defaultValue={this.props.drink.directions} />
            </div>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Save Changes</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditModal;