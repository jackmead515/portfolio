import moment from 'moment';
import _ from 'lodash';

export const popular = (data = [], length = 0) => {

  if(length > data.length) {
    length = data.length;
  }

  let mostPopular = [];
  for(let i = 0; i < data.length; i++) {
    let t = data[i];
    let p = t.views.length + t.searches.length + t.links.length;
    mostPopular.push({value: p, ...t});
  }

  mostPopular = _.sortBy(mostPopular, (p) => -p.value);

  return mostPopular.slice(0, length);
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

export const getKeywords = (keywords) => {
  return keywords.split(' ').filter((k) => k.length > 4);
};
