import React, { Component } from 'react';

import FAIcon from 'react-fontawesome';

export default class ShareButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayLink: false
    }
  }
  render() {

    if(this.state.displayLink) {
      return (
        <div
          className="guide__sharebutton__container"
          style={{...this.props.style}}
        >
          <div onClick={() => this.setState({displayLink: false})}>
            <FAIcon
              name="times"
              style={{marginRight: 5, fontSize: 14}}
              className="guide__sharebutton__icon"
            />
          </div>
          <div>{this.props.link}</div>
        </div>
      );
    } else {
      return (
        <div
          className="guide__sharebutton__container"
          style={{...this.props.style}} onClick={() => this.setState({displayLink: true})}
        >
          <FAIcon
            name="share-alt"
            style={{marginRight: 5, fontSize: 14}}
            className="guide__sharebutton__icon"
          />
          Share
        </div>
      );
    }


  }
}
