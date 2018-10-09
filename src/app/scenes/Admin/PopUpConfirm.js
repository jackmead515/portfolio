/* @flow weak */

import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class PopUpConfirm extends Component {
  render() {
    return (
      <div className="confirm__container animatedFast fadeInDown">
        <p>{this.props.message}</p>
        <div className="confirm__button__container">
          <div className="confirm__button--yes" onClick={() => this.props.onClickYes()}>
            Yes
          </div>
          <div className="confirm__button--no" onClick={() => this.props.onClickNo()}>
            No
          </div>
        </div>
      </div>
    );
  }
}
