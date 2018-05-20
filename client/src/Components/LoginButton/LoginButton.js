import React, { Component } from 'react';

export default class LoginButton extends Component {
    clickHandler = () => {
        const url = "http://localhost:5000/auth/twitter";
        const name = "twitter_login";
        const specs = "width=500, height=500";
        window.open(url, name, specs);
    };

    render() {
        return <button className="button" onClick={this.clickHandler}>Login</button>;
    }
}