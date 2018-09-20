import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EditIngCard from "./EditIngCard"

class EditIngList extends React.Component {
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

  render() {
    return (
      <div>
        <div className="manage-ing-button">
          <Button color="warning" size="sm" onClick={this.toggle}>Manage Ingredients</Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader>Please note making changes to a ingredient here will update it everywhere the ingrednient is used! This feature is recomended for spelling corections only.</ModalHeader>
          <ModalBody>
            <h3>Bases:</h3>
            {
                this.props.ingredients.map(ingredient => {
                    if(ingredient.typeId === 1){
                        return (<EditIngCard key={ingredient.id} 
                                    ingredient={ingredient}
                                    resetData={this.props.resetData}
                                    ingredients={this.props.ingredients}/>)
                    } else {
                        return null
                    }
                })
            }
            <h3>Mixers:</h3>
            {
                this.props.ingredients.map(ingredient => {
                    if(ingredient.typeId === 2){
                        return (<EditIngCard key={ingredient.id} 
                                    ingredient={ingredient}
                                    resetData={this.props.resetData}
                                    ingredients={this.props.ingredients}/>)
                    } else {
                        return null
                    }
                })
            }
            <h3>Garnishes:</h3>
            {
                this.props.ingredients.map(ingredient => {
                    if(ingredient.typeId === 3){
                        return (<EditIngCard key={ingredient.id} 
                                    ingredient={ingredient}
                                    resetData={this.props.resetData}
                                    ingredients={this.props.ingredients}/>)
                    } else {
                        return null
                    }
                })
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" size="sm" onClick={this.toggle}>Exit</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditIngList;