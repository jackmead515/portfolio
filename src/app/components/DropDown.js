import React, { Component } from 'react';

var FAIcon = require('react-fontawesome');

export default class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedDown: props.opened ? props.opened : false,
      clicked: false,
    }
  }

  render() {
    const { style, children, onClick } = this.props;
    const { droppedDown } = this.state;
    let icon = droppedDown ? 'caret-up' : 'caret-down';
    let dropDownClassNames = droppedDown ? "guide__content__container animated fadeIn" : "guide__content__container animated fadeOut"
    let jsx = null;
    if(droppedDown) {
      jsx = (
        <div className={dropDownClassNames}>
          {droppedDown ? children : null}
        </div>
      );
    }

    return (
      <div
        className="guide__dropdown__container"
        style={{...style}}
      >
        <div
          className="guide__dropdown__iconcontainer"
          onClick={() => {
            this.setState({
              droppedDown: !this.state.droppedDown,
              clicked: true
            });
              
            if(onClick) onClick(this.state.clicked);
          }}
        >
          <FAIcon
            className="guide__dropdown__icon"
            name={icon}
          />
        </div>
        {jsx}
      </div>
    );
  }
}
