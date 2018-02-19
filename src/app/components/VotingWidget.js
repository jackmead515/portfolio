import React, { Component } from 'react';

var FAIcon = require('react-fontawesome');

export default class VotingWidget extends Component {
  render() {
    const { style, guide } = this.props;

    return (
      <div className="voting__container" style={{...style}}>
        <button
          className="voting__button"
          onClick={() => {

          }}
        >
          <FAIcon name="thumbs-up" style={{fontSize: 20}}/>
        </button>
        <button
          className="voting__button"
          onClick={() => {

          }}
        >
          <FAIcon name="thumbs-down" style={{fontSize: 20}}/>
        </button>
      </div>
    );
  }
}
