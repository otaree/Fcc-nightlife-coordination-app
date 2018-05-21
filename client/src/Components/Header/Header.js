import React, { Component } from 'react';
import MdLocationOn from 'react-icons/lib/md/location-on';
import MdLocalTaxi from 'react-icons/lib/md/local-taxi';
import FaGlass from 'react-icons/lib/fa/glass';


export default class Header extends Component {
    state = {
        location: ''
    };

    componentDidMount() {
        this.setState({ location: this.props.location });
        if (this.props.location.trim().length > 0) {
            this.props.search(this.props.location);
        }
    }

    changeHandler = e => {
        this.setState({ location: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();

        if (this.state.location.trim().length < 1) {
            return;
        }
        this.props.search(this.state.location);
    }

    render() {
        return (
            <header className={`hero is-primary ${this.props.isBusinesses ? '': "is-medium"}`}>
                <div className="hero-body">
                    <h1 className="title has-text-centered">Plans Tonight?</h1>
                    <div className="columns is-centered is-variable is-0">
                        <div className="column has-text-centered is-1">
                            <MdLocationOn size={60} />
                        </div>
                        <div className="column has-text-centered is-1">
                            <MdLocalTaxi size={60} />
                        </div>
                        <div className="column has-text-centered is-1">
                            <FaGlass size={60} />
                        </div>
                    </div>
                    <h1 className="subtitle has-text-centered">See which bars are hoppin' tonight and RSVP ahead of time!</h1>
                    <div className="columns">
                        <div className="column is-8 is-offset-2">
                        <form onSubmit={this.submitHandler}>
                            <div className="field is-grouped">
                                <div className="control is-expanded ">
                                    <input 
                                        className="input has-text-centered"
                                        type="text"
                                        placeholder="Where you at?"
                                        value={this.state.location}
                                        onChange={this.changeHandler}
                                    />
                                </div>
                                <div className="control">
                                    <button className={`button ${this.props.loading ? "is-loading": ""}`}>Go</button>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
