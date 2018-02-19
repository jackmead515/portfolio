import React, { Component } from 'react';

export default class Heading extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
      },
      title: {
        fontWeight: 800,
        fontSize: 30,
      },
      subtitle: {
        fontWeight: 600,
        fontSize: 18,
      }
    }
  }

  render() {
    const { title, subtitle, style, headingStyle, subHeadingStyle } = this.props;

    return (
      <div style={{...this.styles.container, ...style}}>
        <div className="content__title" style={{...this.styles.title, ...headingStyle}}>
          {title}
        </div>
        <div className="content__title" style={{...this.styles.subtitle, ...subHeadingStyle}}>
          {subtitle}
        </div>
      </div>
    );
  }
}
