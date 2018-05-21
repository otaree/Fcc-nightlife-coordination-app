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

    toggleHandler = business => {
        this.props.toggleGoing(this.props.token, this.props.bars.id, business);
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
                     <Header search={this.searchHandler} isBusinesses={this.props.bars.businesses.length > 0} loading={this.props.loading} location={this.props.location} /> 
                     {
                         this.props.bars.businesses.length > 0 ? <Main businesses={this.props.bars.businesses} isAuth={this.props.isAuthenticated} toggleGoing={this.toggleHandler} /> : null
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
        bars: state.business.bars,
        loading: state.business.loading,
        error: state.business.error,
        location: state.business.location
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchBusiness: (location) => dispatch(businessActions.fetchBusiness(location)),
        unsetError: () => dispatch(businessActions.unsetError()),
        toggleGoing: (token, id, business) => dispatch(businessActions.toggleGoing(token, id, business))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);