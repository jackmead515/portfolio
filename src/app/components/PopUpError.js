/* @flow weak */

import React, { Component } from 'react';

export default class PopUpError extends Component {
  render() {
    return (
      <div className="popuperror__container animatedFast fadeInDown">
        <p>{this.props.message}</p>
        <div className="popuperror__button" onClick={() => this.props.onConfirm()}>
          Okay
        </div>
      </div>
    );
  }
}
