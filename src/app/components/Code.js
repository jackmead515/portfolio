import React, { Component } from 'react';

export default class Code extends Component {
  render() {
    return (
      <div className="content__code__container" style={{...this.props.style}}>
        <pre className="content__code">
          {this.props.children}
        </pre>
      </div>
    );
  }
}
