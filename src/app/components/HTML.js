/* @flow weak */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class HTML extends Component {

  createMarkup() {
    return {__html: this.props.content}
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.createMarkup()} style={{...this.props.style}}/>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(HTML);
