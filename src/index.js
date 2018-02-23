import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import reducers from './app/reducers'
import axios from 'axios';
import { Route, Router } from 'react-router';
import { persistor, store } from './configureStore';
import { PersistGate } from 'redux-persist/lib/integration/react'
import createBrowserHistory from 'history/createBrowserHistory'

import './app/styles/index.css';

import Admin from './app/scenes/Admin';
import Home from './app/scenes/Home';
import About from './app/scenes/About';
import Contact from './app/scenes/Contact';
import Guides from './app/scenes/Guides';
import Help from './app/scenes/Help';
import Plugin from './app/scenes/Plugin';
import Projects from './app/scenes/Projects';

export const SERVERIP = '127.0.0.1:3000';
export const NODEIP = '127.0.0.1:5000';
export const history = createBrowserHistory();

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://' + NODEIP + '/api/v1';

ReactDOM.render((
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Router history={history} onUpdate={() => window.scrollTo(0,0)}>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />

          <Route exact path="/guides" component={Guides} />
          <Route exact path="/guides/g/:guide" component={Guides} />
          <Route exact path="/guides/t/:topic" component={Guides} />
          <Route exact path="/guides/s/:search" component={Guides} />

          <Route exact path="/about" component={About} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/admin" component={Admin} />
        </div>
      </Router>
    </Provider>
  </PersistGate>
), document.getElementById('root'));

registerServiceWorker();
