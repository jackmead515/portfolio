import React, { Component } from 'react';

export default class Border extends Component {
  render() {
    const { style } = this.props;

    return (
      <div className="content__border" style={{...style}} />
    );
  }
}
