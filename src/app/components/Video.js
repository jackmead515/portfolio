import React, { Component } from 'react';

export default class Image extends Component {

  render() {
    const { source, style } = this.props;

    return (
      <div className="content__image__container" style={{...style}}>
        <iframe
          className="content__video"
          src={source}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }
}
