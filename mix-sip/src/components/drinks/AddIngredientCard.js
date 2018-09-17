// import React from 'react';
// import { Button, ModalHeader, Input, Label, Alert, ModalFooter } from 'reactstrap';


// export default class AddIngredientCard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             allReadyHave: false,
//             amountIsBlank: false,
//             selectIng: false
//         };
//     }

//     render(){
//         return(
//             <div>
//                 <Label>Add ingredients:</Label>
//                 <div className="ingredient-declare">
//                     {
//                         this.state.selectIng &&
//                         <Alert color="danger">
//                         Please select a ingredient!
//                         </Alert>
//                     }
//                     <Input id="ingredient" type="select" className="capitalize" defaultValue="Select Type" onChange={this.props.handleFieldChange}>
//                         <option id="selectIngredient">Select a Ingredient</option>
//                         {
//                             this.props.ingredients.map(ing => {
//                                 return <option key={ing.id}>{ing.name}</option>
//                             })
//                         }
                        
//                     </Input>
//                     {
//                         this.state.amountIsBlank && 
//                         <Alert color="warning">
//                         Please give this ingredient an amount!
//                         </Alert>
//                     }
//                     <Label>Amount:</Label>
//                     <Input id="amount" type="text" placeholder="Ex. 1oz.
//                     1/2 wedge, 1 squeeze" defaultValue={this.state.amount} onChange={this.props.handleFieldChange}/>
//                 </div>
//                 <Button color="info" onClick={this.addIngredient}>Add Ingredient to Drink</Button>
//                 <Label>Don't see the ingredient your looking for? Add a New one!</Label><br/>
//                 <Button color="success" onClick={this.props.toggleNested}>Add a New Ingredient</Button>
//                 <ModalHeader>Add your ingredient here, and it will be added to your collection of ingredients to choose from</ModalHeader>
//                 {
//                     this.state.allReadyHave &&
//                     <Alert color="danger">This ingredienet is aleady in your collection. Please select it from the drop down</Alert>
//                 }
//                 <div>
//                     <Label htmlFor="newIngredientType">Type of Ingredient:</Label>
//                     <Input id="newIngredientType" type="select" defaultValue="Select Type" onChange={this.props.handleFieldChange}>
//                             <option>Select Type</option>
//                         {
//                             this.props.types.map(type => {
//                                 return <option key={type.id}>{type.name}</option>
//                             })
//                         }
//                     </Input>
//                     <Label htmlFor="newIngredientName">Add new ingredient:</Label>
//                     <Input id="newIngredientName" type="text" placeholder="Name of ingredient" onChange={this.props.handleFieldChange}/>
//                     <ModalFooter>
//                         <Button color="primary" onClick={this.props.saveNewIngredient}>Save</Button>{' '}
//                         <Button corol="info" onClick={this.props.toggleNested}>Cancel</Button>   
//                     </ModalFooter>
//                 </div>
//             </div>
//         )
//     } 
// }