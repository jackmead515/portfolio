import React, { Component } from 'react';

import * as d3 from 'd3';
import _ from 'lodash';
import moment from 'moment';

export default class LineGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: '',
    }
  }

  componentDidMount() {
    this.renderGraph();
  }

  formatTimeAxis(time) {
    let now = moment().unix()*1000;

    if(now - time >= 31540000000) {
      return 'MMM Do, YYYY';
    } else if(now - time >= 2628000000) {
      return 'MMM Do';
    } else if(now - time >= 604800000) {
      return 'ddd Do';
    } else if(now - time >= 3600000) {
      return 'h:m a, dd Do';
    } else {
      return 'h:m a, dd Do';
    }
  }

  renderGraph() {
    const { divId } = this.props;
    let { data, element } = this.props;

    data = data[element].map((d, i) => {
      return {y: i+1, x: moment(d.time).valueOf()}
    });

    var dataYMax = data.length;
    var dataXMin = d3.min(data, (d) => d.x);

    var xScale = d3.scaleLinear().
      domain([dataXMin, moment().unix()*1000]).
      range([0, 450]);

    var yScale = d3.scaleLinear().
      domain([dataYMax, 0]).
      range([0, 450]);

    var xAxis = d3.axisBottom(xScale)
      .tickFormat((t) => moment(t).format(this.formatTimeAxis(dataXMin)))
      .ticks(6);

    var yAxis = d3.axisLeft(yScale)
      .ticks(10);

    var svg = d3.select('#' + divId).
      append('svg').
      attr('width', 450).
      attr('height', 450).
      attr('style', 'padding: 10px; padding-left: 20px');

    svg.append('g').attr("transform", "translate(0,430)").call(xAxis);

    svg.append('g').attr("transform", "translate(0,-20)").call(yAxis);

    var line = d3.line()
      .curve(d3.curveMonotoneX)
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    var graph = svg.append('path').
      attr('d', line(data)).
      attr('fill', 'none').
      attr('class', 'graphs__line');
  }

  render() {
    const { divId, style } = this.props;

    return (
      <div className="linegraph__container" style={{...style}} id={divId}></div>
    );
  }
}
