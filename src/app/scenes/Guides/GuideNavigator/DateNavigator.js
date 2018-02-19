import React, { Component } from 'react';

import YearDropDown from './YearDropDown';

import moment from 'moment';
import _ from 'lodash';

export default class DateNavigator extends Component {
  constructor(props) {
    super(props);
  }

  renderYears() {
    const { guides } = this.props;

    let years = [];
    for(let i = 0; i < guides.length; i++) {
      years.unshift(moment(guides[i].head.date.time).year());
    }

    years = _.uniq(years);
    years = _.sortBy(years, (y) => -y);

    return years.map((y) => {
      return <YearDropDown year={y}/>
    });
  }

  render() {
    return (
      <div>
        <div className="guidenav__heading" style={{marginTop: 15}}>By Date</div>
        {this.renderYears()}
      </div>
    );
  }
}
