import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import reducers from './app/reducers'
import axios from 'axios';
import { Route, Router, Redirect, Switch } from 'react-router';
import { persistor, store } from './configureStore';
import { PersistGate } from 'redux-persist/lib/integration/react'
import createBrowserHistory from 'history/createBrowserHistory'

import './app/styles/index.css';

import Login from './app/scenes/Admin/Login';
import Admin from './app/scenes/Admin';
import Guides from './app/scenes/Guides';

export const SERVERIP = process.env.NODE_ENV === 'development' ? 'http://www.speblog.com:3000' : 'http://www.speblog.org';

export const history = createBrowserHistory();

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://www.speblog.com:5000/api/v1' : SERVERIP + '/api/v1';

ReactDOM.render((
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Router history={history} onUpdate={() => window.scrollTo(0,0)}>
        <Switch>
          <Route exact path="/" component={Guides} />
          <Route exact path="/g/:guide" component={Guides} />
          <Route exact path="/t/:topic" component={Guides} />
          <Route exact path="/s/:search" component={Guides} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/g/:guide" component={Admin} />
          <Route exact path="/admin/t/:topic" component={Admin} />
          <Route exact path="/login" component={Login} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </Provider>
  </PersistGate>
), document.getElementById('root'));

registerServiceWorker();
