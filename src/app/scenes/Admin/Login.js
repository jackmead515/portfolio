import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from '../../../index.js';
import Loading from '../../components/Loading';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: '',
      attempts: 0,
      loading: false
    }
  }

  login(e) {
    const { username, password, attempts } = this.state;

    this.setState({loading: true});

    if(this.state.attempts >= 20) {
      history.push('/');
    } else {
      this.setState({attempts: this.state.attempts+=1});
    }

    axios.post('/login', { username, password, attempts }).then((res) => {

      if(res.data.status === 200) {
        localStorage.setItem("portfolio_auth_token", res.data.token);
        this.setState({loading: false});
        history.push('/admin');
      } else {
        this.setState({error: res.data.message, loading: false});
      }

    }).catch((err) => {
      
      this.setState({loading: false, error: err.message});
    });
  }

  render() {

    let errorClassNames = "login__form__error"
    if(this.state.error.length > 0) {
      errorClassNames = errorClassNames.concat(" animatedFast bounceInUp");
    }

    let loginContent = null;
    if(this.state.loading) {
      loginContent = <Loading scaler={2} containerStyles={{backgroundColor: "rgba(0,0,0,0)"}}/>
    } else {
      loginContent = (
        <div className="login__form__container animatedFast fadeInLeft">
          <input
            className="login__form__input"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={(e) => this.setState({username: e.target.value, error: ''})}
          />
          <input
            className="login__form__input"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onKeyPress={(key) => {if(key.which === 13) this.login()}}
            onChange={(e) => this.setState({password: e.target.value, error: ''})}
          />
          <button className="login__form__button" onClick={(e) => this.login(e)}>
              Login!
          </button>
        </div>
      )
    }

    return (
      <div className="login__container">
        <span className={errorClassNames}>{this.state.error}</span>
        {loginContent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Login);
