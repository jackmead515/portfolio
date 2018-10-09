import React, { Component } from 'react';

var FAIcon = require('react-fontawesome');

export default class LinkRef extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    }

    this.styles = {
      container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
    }
  }

  render() {
    const { icon, style, onClick, link, title, onClickLink } = this.props;

    let clickLink = onClickLink ? onClickLink : () => {};

    let iconjsx = null;
    if(icon) iconjsx = <FAIcon name={icon} style={{color: '#0000EE', marginLeft: 10}}/>

    let jsx = (
      <a
        className="content__link"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          clickLink(this.state.clicked)
          this.setState({clicked: true});
        }}
      >
        {title}
        {iconjsx}
      </a>
    );

    if(onClick) {
      jsx = (
        <button className="content__link--button" onClick={() => onClick()}>
          {title}
          {iconjsx}
        </button>
      );
    }

    return (
      <div style={{...this.styles.container, ...style}}>
        {jsx}
      </div>
    );
  }
}
