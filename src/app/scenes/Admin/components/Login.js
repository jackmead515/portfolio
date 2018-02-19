import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from '../../../../index.js';
import { navigateAdmin } from '../../../actions/menu';
import Loading from '../../../components/Loading';
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
    this.setState({loading: true});
    const { username, password, attempts } = this.state;
    axios.post('/login', { username, password, attempts }).then((res) => {

      if(res.data.status === 200) {
        localStorage.setItem("portfolio_auth_token", res.data.token);
        this.props.dispatch(navigateAdmin('CONSOLE'));
      } else {
        this.setState({error: res.data.message});
      }

      this.setState({loading: false});
    }).catch((err) => {
      console.log(err);
      this.setState({loading: false, attempts: 0});
      history.push('/');
    });
    if(this.state.attempts >= 20) {
      this.setState({loading: false});
      history.push('/');
    } else {
      this.setState({attempts: this.state.attempts+=1});
    }
  }

  render() {

    let errorClassNames = "login__form__error"
    if(this.state.error.length > 0) {
      errorClassNames = errorClassNames.concat(" animatedFast bounceInUp");
    }

    let loginButton = <Loading scaler={0.9} containerStyles={{marginTop: 10}}/>
    if(!this.state.loading) {
      loginButton = (
        <button className="login__form__button" onClick={(e) => this.login(e)}>
            Login!
        </button>
      )
    }

    return (
      <div className="login__container">
        <span className={errorClassNames}>{this.state.error}</span>
        <div className="login__form__container animatedFast slideInLeft">
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
          {loginButton}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Login);
