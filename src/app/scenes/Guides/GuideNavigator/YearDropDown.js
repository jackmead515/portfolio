import React, { Component } from 'react';

var FAIcon = require('react-fontawesome');

export default class YearDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedDown: props.open ? props.open : false,
      clicked: false,
    }

    this.months = [
      { month: "January", key: "ydd-1" },
      { month: "February", key: "ydd-2" },
      { month: "March", key: "ydd-3" },
      { month: "April", key: "ydd-4" },
      { month: "May", key: "ydd-5" },
      { month: "June", key: "ydd-6" },
      { month: "July", key: "ydd-7" },
      { month: "August", key: "ydd-8" },
      { month: "September", key: "ydd-9" },
      { month: "October", key: "ydd-10" },
      { month: "November", key: "ydd-11" },
      { month: "December", key: "ydd-12" },
    ]
  }

  renderMonths() {
    return this.months.map((m) => {
      return (
        <a
          key={m.key}
          className="guidenav__dropdown__month"
          href={"http://127.0.0.1:3000/"}
        >
          {m.month}
        </a>
      );
    });
  }

  render() {
    const { style, year } = this.props;
    const { droppedDown } = this.state;
    let icon = droppedDown ? 'caret-up' : 'caret-down';
    let dropDownClassNames = droppedDown ? "animatedSuperFast fadeIn" : "animatedSuperFast fadeOut"
    let jsx = null;

    if(droppedDown) {
      jsx = (
        <div style={{padding: 5, }} className={dropDownClassNames}>
          {this.renderMonths()}
        </div>
      );
    }

    return (
      <div
        className="guidenav__dropdown__container"
        style={{...style}}
      >
        <div
          className="guidenav__dropdown__iconcontainer"
          onClick={() => {
            this.setState({
              droppedDown: !this.state.droppedDown,
              clicked: true
            });
          }}
        >
          <div className="guidenav__dropdown__year">{year}</div>
          <FAIcon
            className="guidenav__dropdown__icon"
            name={icon}
          />
        </div>
        {jsx}
      </div>
    );
  }
}
