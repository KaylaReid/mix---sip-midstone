import React from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EditIngCard from "./EditIngCard";
import { Button , Modal } from "semantic-ui-react";


class EditIngList2 extends React.Component {
    state = { open: false }

    show = size => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    render() {
        const { open, size } = this.state
        return (
            <div>
                <div className="manage-ing-button">
                    <Button className="blue-button" onClick={this.show('tiny')}>Manage Ingredients</Button>
                </div>
                <Modal size={size} open={open} onClose={this.close}>
                    
                    <Modal.Header>Manage Your Drink Ingredients</Modal.Header>
                    <Modal.Content>
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
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="blue" size="mini" onClick={this.close}>Exit</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default EditIngList2;
