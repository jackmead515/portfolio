import React, { Component } from 'react';
import moment from 'moment';

export default class Border extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        fontSize: 15,
        color: '#cc4400'
      },
    }
  }

  render() {
    const { style, time, displayNew } = this.props;

    let newDate = null;
    let t = moment(time);
    let n = moment().diff(t);
    let timeAgo = t.from(moment());

    if(n < 432000000 && displayNew) {
        newDate = <span style={{color: '#00e600', fontWeight: 'bold'}}>{'*NEW* '}</span>
    }

    return (
      <div style={{...this.styles.container, ...style}}>
        {newDate}{timeAgo}
      </div>
    );
  }
}
