import React, { Component } from 'react';
import './App.css';
import ApplicationViews from "./components/ApplicationViews";
import { Route } from "react-router-dom";
import Login from "./components/login/Login";

class App extends Component {
    isAuthenticated = () => sessionStorage.getItem("user") !== null

    render() {
        return (
            <React.Fragment>
                {
                    !this.isAuthenticated() &&
                    <Route exact path="/login" render={(props) => {
                        return <Login {...props} />
                    }} />  
                }
                {
                    <ApplicationViews isAuthenticated={this.isAuthenticated}/>
                }
            </React.Fragment>
        );
    }
}

export default App;
