import React, { Component } from "react";
import { Redirect, Route} from "react-router-dom";
import UserPage from "./UserPage";

export default class ApplicationViews extends Component {    
    render(){
        return (
            <React.Fragment>
                {
                    this.props.isAuthenticated() &&
                    <div className="main-view">
                        <Route exact path="/userhome" render={(props) => {
                                return <UserPage {...props} />
                            }} />
                    </div>
                }
                {
                    !this.props.isAuthenticated() &&
                    <Redirect to="/login" />
                }
            </React.Fragment>
        )
    }
}