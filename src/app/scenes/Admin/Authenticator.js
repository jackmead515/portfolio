import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigateAdmin } from '../../actions/menu';
import axios from 'axios';

export default class Authenticator extends Component {
  constructor(props) {
    super(props);

    this.state = { authenticated: false }

    axios.post('/login/auth', {token: localStorage.getItem('portfolio_auth_token')})
    .then((res) => {
      if(res.data.status !== 200){
        this.props.dispatch(navigateAdmin('LOGIN'));
      } else {
        this.setState({authenticated: true});
      }
    }).catch((err) => {
      this.props.dispatch(navigateAdmin('LOGIN'));
    });
  }

  logout() {
    this.setState({authenticated: false});
    localStorage.setItem('portfolio_auth_token', '');
    this.props.dispatch(navigateAdmin('LOGIN'));
  }
}
