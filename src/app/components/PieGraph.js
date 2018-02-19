import React, { Component } from 'react';

import * as d3 from 'd3';
import _ from 'lodash';

export default class PieGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: '',
      headingClasses: ''
    }
  }

  componentDidMount() {
    this.renderGraph();
  }

  renderGraph() {
    let { data, divId, title, element } = this.props;

    data = _.sortBy(data, (d) => -d[element].length);
    data = data.splice(0, 10);

    var svg = d3.select('#' + divId).
      append('svg').
      attr('height', 200).
      attr('width', 200).
      attr('style', 'background-color: rgba(12, 209, 223, 0.45); border: 1px solid #e8e8e8; border-radius: 5px');

    svg.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .attr('fill', 'white')
      .attr('font-size', 15)
      .text(title);

    const tweenPie = (finish) => {
      var start = { startAngle: 0, endAngle: 0 };
      var interpolator = d3.interpolate(start, finish);
      return (d) => arc(interpolator(d3.easeBounceOut(d)))
    }

    var arc = d3.arc().
      innerRadius(25).
      outerRadius(80).
      startAngle((p) => p.startAngle).
      endAngle((p) => p.endAngle).
      padAngle(0.02).
      cornerRadius(2);

    var arcs = d3.pie().value((p) => p[element].length)(data);

    var paths = svg.selectAll('path').
      data(arcs).
      enter().
      append('path').
      attr('d', arc).
      attr('class', 'graphs__arc').
      attr('transform', 'translate(100, 110)').
      on('click', (d, i) => {
        d3.event.stopPropagation();
        this.setState({heading: d.data.heading, headingClasses: 'animated fadeIn'});
      }).
      transition().
      duration(1500).
      attrTween('d', tweenPie);
  }

  render() {
    const { onClick, divId, style } = this.props;
    let { headingClasses } = this.state;

    return (
      <div className="piegraph__container" style={{...style}}>
        <div id={divId}></div>
        <div className={"piegraph__heading " + headingClasses}>
          {this.state.heading}
        </div>
      </div>
    );
  }
}
