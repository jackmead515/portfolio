import React, { Component } from 'react';

export default class Image extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { source, style } = this.props;

    return (
        <div className="content__image__container" style={{...style}}>
          <img className="content__image" src={source} alt="<not avaliable. Sorry peeps.>"/>
        </div>
    );
  }
}
