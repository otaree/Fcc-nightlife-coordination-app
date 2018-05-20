import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


import Header from './Header/Header';
import LoginButton from './LoginButton/LoginButton';
import AuthSuccess from './AuthSuccess/AuthSuccess';
import * as authActions from '../store/actions/auth';


export  class App extends Component {
    handleClick = () => {
        this.props.logout();
    }
    render() {
        let login = (
            <div>
                {
                    this.props.isAuthenticated ? 
                    (
                        <div className="level">
                            <div className="level-item">
                                <p className="title has-text-centered">You are Logged In</p>
                                <button className="button is-danger" onClick={this.handleClick}>Logout</button>
                            </div>
                        </div>
                    ) :
                    <LoginButton />
                }
            </div>
        );
        return(
            <BrowserRouter>
                <section className="bg-color">
                     <Header  />  
                     {login}
                     <Route path="/auth/success" component={AuthSuccess} />                            
                </section>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);