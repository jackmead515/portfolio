import React, { Component } from 'react';

export default class Text extends Component {
  render() {
    return (
      <p className="content__text" style={{...this.props.style}}>
        {this.props.text}
        {this.props.children}
      </p>
    );
  }
}
