import React, { Component } from 'react';
import MdLocationOn from 'react-icons/lib/md/location-on';
import MdLocalTaxi from 'react-icons/lib/md/local-taxi';
import FaGlass from 'react-icons/lib/fa/glass';


export default class Header extends Component {
    render() {
        return (
            <header className="hero is-primary is-medium">
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
                        <form>
                            <div className="field is-grouped">
                                <div className="control is-expanded ">
                                    <input 
                                        className="input has-text-centered"
                                        type="text"
                                        placeholder="Where you at?"
                                    />
                                </div>
                                <div className="control">
                                    <button className="button">Go</button>
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
