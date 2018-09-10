import React, { Component } from "react";
import "./login.css";
import DataManager from "../../modules/DataManager";

export default class Login extends Component {
    state = {
        loginUsername: "",
        loginPassword: "",
        fullName: "",
        username: "",
        password: "",
        registerUsername: "",
        registerPassword: "",
        isRegistered: false
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()
        if(!this.state.loginUsername || !this.state.loginPassword){
            alert("Please fill out all fields")
        } else {
            DataManager.getUser(this.state.loginUsername, 
            this.state.loginPassword)
            .then(user => {
                if(user.length !== 0){
                sessionStorage.setItem("user", JSON.stringify(user))
                this.props.history.push("/userhome")
                } else {
                    alert("Please enter a vaild Username or Password")
                }
            }) 
        }
    }






    switchToLogin = (e) => {
        e.preventDefault()
        document.querySelector(".signIn").classList.add("active-dx")
        document.querySelector(".signUp").classList.add("inactive-sx")
        document.querySelector(".signUp").classList.remove("active-sx")
        document.querySelector(".signIn").classList.remove("inactive-dx")
    }
    
    switchToSignUp = (e) => {
        e.preventDefault()
        document.querySelector(".signUp").classList.add("active-sx")
        document.querySelector(".signIn").classList.add("inactive-dx")
        document.querySelector(".signIn").classList.remove("active-dx")
        document.querySelector(".signUp").classList.remove("inactive-sx")
    }

    render(){
        return(
            <React.Fragment>
                <div className="login-page">
                <div className="login-container">
                    <form className="login-form signIn active-dx">
                        <h3 className="login-h3">Welcome<br />Back !</h3>
                        <button className="login-button fb" type="button">Logo Here?</button>
                        <p className="login-p">- or -</p>
                        <input className="login-input" type="text" id="loginUsername" placeholder="Username" onChange={this.handleFieldChange} />
                        <input className="login-input" type="password" id="loginPassword" placeholder="Password" onChange={this.handleFieldChange} />
                        <button className="login-button form-btn sx back" type="button"  onClick={this.switchToSignUp}>Sign Up</button>
                        <button className="login-button form-btn dx" type="submit" onClick={this.handleLogin}>Log In</button>
                    </form>
                    <form className="login-form signUp inactive-sx">
                        <h3 className="login-h3">Create Your Account</h3>
                        <p className="login-p">Just enter your email address<br />
                            and your password for join.
                        </p>
                        <input className="login-input" type="text" id="fullName" placeholder="First &amp; Last Name" onChange={this.handleFieldChange} />
                        <input className="login-input" type="text" id="username" placeholder="Username" onChange={this.handleFieldChange} />
                        <input className="login-input" type="password" id="password" placeholder="Password" onChange={this.handleFieldChange} />
                        {
                            this.state.isRegistered === true &&
                            <div>
                                <p className="login-p">Welcome to Mix&amp;Sip!</p>
                                <button className="login-button form-btn sx log-in" type="button"  onClick={this.switchToLogin}>Back</button>
                                <button className="login-button form-btn dx" type="submit" onClick={this.handleFirstLogin}>Log In</button>
                            </div>
                        }
                        {
                            this.state.isRegistered === false &&
                            <div>
                                <button className="login-button form-btn sx log-in" type="button"  onClick={this.switchToLogin}>Log In</button>
                                <button className="login-button form-btn dx" type="submit" onClick={this.handleRegister}>Sign Up</button>
                            </div>
                        }
                    </form>
                </div>
                </div>
            </React.Fragment>
        ) 
    }
}