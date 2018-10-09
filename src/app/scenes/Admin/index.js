import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigateAdmin } from '../../actions/menu';

import Login from './Login';
import Console from './Console';
import Editor from './Editor';
import TopicEditor from './TopicEditor';

class Admin extends Component {

  renderPage() {
    const { match } = this.props;

    if(match.url.startsWith('/admin/g/') && match.params.guide) {
      return <Editor searchTitle={match.params.guide} />
    } else if(match.url.startsWith('/admin/t/') && match.params.topic) {
      return <TopicEditor topicTitle={match.params.topic} />
    } else if(match.url.startsWith('/admin')) {
      return <Console />
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
