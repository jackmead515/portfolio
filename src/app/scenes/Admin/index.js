import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigateAdmin } from '../../actions/menu';

import Login from './components/Login';
import Console from './components/Console';
import Editor from './components/Editor';
import TopicEditor from './components/TopicEditor';
import Graphs from './components/Graphs';

class Admin extends Component {

  renderPage() {
    const { page } = this.props.menu.admin;

    switch(page) {
      case 'LOGIN': return <Login />
      case 'CONSOLE': return <Console />
      case 'EDITOR': return <Editor />
      case 'TOPIC_EDITOR': return <TopicEditor />
      case 'GRAPHS': return <Graphs />
      default: return <Login />
    }
  }

  render() {
    return this.renderPage();
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Admin);
