import moment from 'moment';
import _ from 'lodash';

export const popular = (data = [], length = 0) => {

  if(length > data.length) {
    length = data.length;
  }

  let mostPopular = [];
  for(let i = 0; i < length; i++) {
    let t = data[i];
    let p = t.views.length + t.searches.length + t.links.length;
    mostPopular.push({value: p, heading: t.heading});
  }

  mostPopular = _.sortBy(mostPopular, (p) => -p.value);

  return mostPopular;
};

export const dateRange = (data) => {
  let range = [];

  for(let i = 0; i < data.length; i++) {
      range.push(moment(data[i].head.date.time).valueOf());
  }

  let max = _.max(range);
  let min = _.min(range);

  return max-min;
}