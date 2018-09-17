import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class AddIngEdit extends Component {
    state= {
        showAddIng: false 
    }



    render(){
        return(
            <Button>Add a new ingredient</Button>
        )    
    }
}