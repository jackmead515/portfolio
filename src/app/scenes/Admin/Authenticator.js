import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { history, SERVERIP } from '../../../index.js';

export default class Authenticator extends Component {
  constructor(props) {
    super(props);

    this.state = { authenticated: false }

    axios.post('/login/auth', {token: localStorage.getItem('portfolio_auth_token')})
    .then((res) => {
      if(res.data.status !== 200){
        history.push('/login');
      } else {
        this.setState({authenticated: true});
      }
    }).catch((err) => {
      history.push('/login');
    });
  }

  logout() {
    this.setState({authenticated: false});
    localStorage.setItem('portfolio_auth_token', '');
    history.push('/login');
  }
}
