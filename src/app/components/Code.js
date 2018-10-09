import React, { Component } from 'react';

export default class Code extends Component {

  componentDidMount() {
  
  }

  render() {
    return (
      <div className="content__code__container" style={{...this.props.style}}>
        <pre className="content__code">
          <code data-language="python">
            {this.props.children}
          </code>
        </pre>
      </div>
    );
  }
}
