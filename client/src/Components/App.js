import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import AuthSuccess from './AuthSuccess/AuthSuccess';


export  class App extends Component {
    render() {
        return(
            <BrowserRouter>
                <section className="bg-color">
                     <Header  /> 
                     <Footer /> 
                     <Route path="/auth/success" component={AuthSuccess} />                            
                </section>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        token: state.token
    }
};


export default connect(mapStateToProps)(App);