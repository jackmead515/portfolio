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
          <input type="text" readOnly value={this.props.link} />
        </div>
      );
    } else {
      return (
        <div
          className="guide__sharebutton__container"
          style={{...this.props.style}} onClick={() => this.setState({displayLink: true})}
        >
          <FAIcon name="share-alt" style={{marginRight: 5}}/>
          Share
        </div>
      );
    }


  }
}
