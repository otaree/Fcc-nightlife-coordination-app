import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import AuthSuccess from './AuthSuccess/AuthSuccess';
import * as businessActions from '../store/actions/business';


export  class App extends Component {
    searchHandler = (location) => {
        this.props.fetchBusiness(location);
    };

    notificationHandler = () => {
        this.props.unsetError()
    };

    render() {
        return(
            <BrowserRouter>
                <section className="section">
                    {
                        this.props.error && (
                            <div className="notification is-danger">
                                <button className="delete" onClick={this.notificationHandler}></button>
                                <p>{this.props.error}</p>
                            </div>
                        )
                    }
                     <Header search={this.searchHandler} isBusinesses={this.props.businesses.length > 0} loading={this.props.loading} /> 
                     {
                         this.props.businesses.length > 0 ? <Main businesses={this.props.businesses} isAuth={this.props.isAuthenticated}  /> : null
                     }
                     <Footer /> 
                     <Route path="/auth/success" component={AuthSuccess} />                            
                </section>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        businesses: state.business.businesses,
        loading: state.business.loading,
        error: state.business.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBusiness: (location) => dispatch(businessActions.fetchBusiness(location)),
        unsetError: () => dispatch(businessActions.unsetError())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);