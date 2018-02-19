import React, { Component } from 'react';

export default class Image extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 20,
        paddingBottom: 20
      },
      video: {
        margin: 'auto',
        width: '100%',
        maxWidth: 600,
        minHeight: 300,
        zIndex: 5
      }
    }
  }

  render() {
    const { source, style } = this.props;

    return (
      <div className="content__rgbackground" style={{...this.styles.container, ...style}}>
        <iframe
          style={{...this.styles.video}}
          src={source}
          frameBorder="0"
          gesture="media"
          allow="encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }
}
