import React, { Component } from 'react';

export default class LoginButton extends Component {
    clickHandler = () => {
        // const url = "http://localhost:5000/auth/twitter";
        const url = "https://nightlife-coord-app.glitch.me/auth/twitter";
        const name = "twitter_login";
        const specs = "width=500, height=500";
        window.open(url, name, specs);
    };

    render() {
        return <button className="button" onClick={this.clickHandler}>{this.props.children}</button>;
    }
}