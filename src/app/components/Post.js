import React, { Component } from 'react';

export default class Post extends Component {
  render() {
    return (
      <div style={{...this.props.style}}>
        {this.props.children}
      </div>
    );
  }
}
