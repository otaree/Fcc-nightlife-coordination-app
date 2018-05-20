import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as authActions from '../../store/actions/auth';

export default class AuthSuccess extends Component {
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            if (param[0] === "token") {
                localStorage.setItem("NL_token", param[1]);
            }
        }

        const url = '/';
        window.opener.open(url, '_self');
        window.opener.focus();
        window.close();
    }

    render() {
        return (
            <div>
                AUTH SUCCESS
            </div>
        );
    }
}
