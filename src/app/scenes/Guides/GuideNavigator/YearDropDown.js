import React, { Component } from 'react';
import moment from 'moment';
import { SERVERIP } from '../../../../index.js';

var FAIcon = require('react-fontawesome');

export default class YearDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedDown: props.open ? props.open : false,
      clicked: false,
    }

    let year = props.year;

    this.months = [
      { month: "January", key: "ydd-1", b: moment('1/1/' + year).valueOf(), e: moment('2/1/' + year).valueOf()},
      { month: "February", key: "ydd-2", b: moment('2/1/' + year).valueOf(), e: moment('3/1/' + year).valueOf()},
      { month: "March", key: "ydd-3", b: moment('3/1/' + year).valueOf(), e: moment('4/1/' + year).valueOf()},
      { month: "April", key: "ydd-4", b: moment('4/1/' + year).valueOf(), e: moment('5/1/' + year).valueOf()},
      { month: "May", key: "ydd-5", b: moment('5/1/' + year).valueOf(), e: moment('6/1/' + year).valueOf()},
      { month: "June", key: "ydd-6", b: moment('6/1/' + year).valueOf(), e: moment('7/1/' + year).valueOf()},
      { month: "July", key: "ydd-7", b: moment('7/1/' + year).valueOf(), e: moment('8/1/' + year).valueOf()},
      { month: "August", key: "ydd-8", b: moment('8/1/' + year).valueOf(), e: moment('9/1/' + year).valueOf()},
      { month: "September", key: "ydd-9", b: moment('9/1/' + year).valueOf(), e: moment('10/1/' + year).valueOf()},
      { month: "October", key: "ydd-10", b: moment('10/1/' + year).valueOf(), e: moment('11/1/' + year).valueOf()},
      { month: "November", key: "ydd-11", b: moment('11/1/' + year).valueOf(), e: moment('12/1/' + year).valueOf()},
      { month: "December", key: "ydd-12", b: moment('12/1/' + year).valueOf(), e: moment('1/1/' + (year+1)).valueOf()},
    ]
  }

  renderMonths() {
    return this.months.map((m) => {
      return (
        <a
          key={m.key}
          className="guidenav__dropdown__month"
          href={SERVERIP + "/s/" + m.b + "-" + m.e}
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
