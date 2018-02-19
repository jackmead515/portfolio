import React, { Component } from 'react';

export default class Border extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        borderRadius: 1
      },
    }
  }

  render() {
    const { style } = this.props;

    return (
      <div style={{...this.styles.container, ...style}} />
    );
  }
}
