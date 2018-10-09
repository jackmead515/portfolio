import React, { Component } from 'react';
import moment from 'moment';

export default class Border extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        fontSize: 18,
        color: '#555'
      },
    }
  }

  render() {
    const { style, time, displayNew, showPast } = this.props;

    let displayTime = null;
    let newDate = null;
    let t = moment(time);
    let n = moment().diff(t);

    if(showPast) {
      displayTime = t.from(moment());
    } else {
      displayTime = t.format('MMMM Do, YYYY');
    }

    if(n < 432000000 && displayNew) {
        newDate = <span style={{color: '#00e600', fontWeight: 'bold'}}>{'*NEW* '}</span>
    }

    return (
      <div style={{...this.styles.container, ...style}}>
        {newDate}{displayTime}
      </div>
    );
  }
}
