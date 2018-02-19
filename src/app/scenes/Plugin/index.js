import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as d3 from 'd3';
import _ from 'lodash';

import Loading from '../../components/Loading';

class Plugin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }

    this.styles = {
      container: {
        paddingTop: 50,
        maxWidth: 900,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll'
      }
    }
  }

  componentDidMount() {
    this.renderD3();
    this.renderD32();
    this.renderD33();
    this.renderD34();
    //this.renderGuideTrackingData();
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderGuideTrackingData() {
    axios.post('/tracking/get_tracking').then((res) => {

      const { tracking } = res.data;
      console.log(tracking);

      let data = [];
      tracking.map((g) => {
        data.push({
          heading: g.head.heading,
          links: g.activeLinks.length,
          views: g.activeViews.length,
          searches: g.activeSearches.length
        });
      });

      var svg = d3.select('#d3-5').
        append('svg').
        attr('width', 500).
        attr('height', 500);
        //attr('style', 'background-color: rgba(12, 209, 223, 0.45); padding: 30px;');

      var textHeading = 'Click on pie!';
      var heading = svg.append('text').
        attr('x', 10).
        attr('y', 10).
        attr('fill', 'red').
        text(textHeading);

      const tweenPie = (finish) => {
        var start = { startAngle: 0, endAngle: 0 };
        var interpolator = d3.interpolate(start, finish);
        return (d) => arc(interpolator(d3.easeBounceOut(d)))
      }

      var arc = d3.arc().
        innerRadius(30).
        outerRadius(100).
        startAngle((p) => p.startAngle).
        endAngle((p) => p.endAngle).
        padAngle(0.02).
        cornerRadius(2);

      const drawHeading = () => {
        heading.
          attr('fill', 'white').
          transition().duration(100).
          attr('opacity', 0).
          transition().duration(500).
          attr('opacity', 1).
          text(textHeading);
      }

      const drawGraph = () => {
        var arcs = d3.pie().value((p) => p.views)(data);

        var paths = svg.selectAll('path').
          data(arcs).
          enter().
          append('path').
          attr('d', arc).
          attr('class', 'graphs__arc').
          attr('fill', 'blue').
          attr("transform", "translate(250,250)").
          on('click', (d, i) => {
            d3.event.stopPropagation();
            textHeading = d.data.heading;
            drawHeading();
          }).
          transition().
          duration(1500).
          attrTween('d', tweenPie);
      }

      drawGraph();

    }).catch((err) => {
      console.log(err);
    });
  }

  renderD34() {
    let data = [];

    console.log(d3);

    for(let i = 1; i < 6; i++) {
      data.push({value: i, color: this.getRandomColor()})
    }

    var svg = d3.select('#d3-4').
      append('svg').
      attr('width', 500).
      attr('height', 500).
      attr('style', 'background-color: #999999; padding: 30px;');

    setTimeout(() => {
      var arc = d3.arc().
        innerRadius(30).
        outerRadius(100).
        startAngle((p) => p.startAngle).
        endAngle((p) => p.endAngle).
        padAngle(0.01).
        cornerRadius(2);

      var arcs = d3.pie().value((p) => p.value)(data);

      const tweenPie = (finish) => {
        var start = { startAngle: 0, endAngle: 0 };
        var interpolator = d3.interpolate(start, finish);
        return (d) => arc(interpolator(d3.easeBounceOut(d)))
      }

      var paths = svg.selectAll('path').
        data(arcs).
        enter().
        append('path').
        attr('id', (p) => 'arc_' + p.data.value).
        attr('d', arc).
        attr('class', 'graphs__arc').
        attr('fill', (p) => p.data.color).
        attr("transform", "translate(250,250)").
        transition().
        duration(1500).
        attrTween('d', tweenPie);
    }, 2000);



    /*svg.selectAll('text').
      data(arcs).
      enter().
      append('text').
      append('textPath').
      attr('xlink:href', (p) => '#arc_' + p.data.value).
      style('text-anchor', 'middle').
      attr('startOffset', '15%').
      attr('font-size', '10px').
      attr('fill', 'white').
      text((p) => p.data.value);*/


  }

  renderD33() {
    let data = [];
    for(let i = 0; i < 200; i++) {
      data.push({x: Math.floor(Math.random() * 20+i), y: Math.floor(Math.random() * 10+i)});
    }

    data = _.uniqBy(data, (p) => p.x);
    data = _.sortBy(data, (p) => -p.x);

    var dataYMax = d3.max(data, (p) => p.y);
    var dataXMax = d3.max(data, (p) => p.x);

    var xScale = d3.scaleLinear().
      domain([0, dataXMax]).
      range([0, 500]);

    var xAxis = d3.axisBottom(xScale);

    var yScale = d3.scaleLinear().
      domain([dataYMax, 0]).
      range([0, 500]);

    var yAxis = d3.axisLeft(yScale);

    var svg = d3.select('#d3-2').
      append('svg').
      attr('width', 500).
      attr('height', 500).
      attr('style', 'background-color: #999999; padding: 30px;');

    svg.append('g').
      attr("transform", "translate(0,500)").
      call(xAxis);

    svg.append('g').call(yAxis);

    var line = d3.line().
      x((d) => xScale(d.x)).
      y((d) => yScale(d.y));
      //curve(d3.curveBasis());

    var graph = svg.append('path').
      attr('d', line(data)).
      attr('stroke', 'blue').
      attr('stroke-width', 1).
      attr('fill', 'none').
      attr('class', 'graphs__line');
  }

  renderD32() {
    let data = [];
    for(let i = 0; i < 100; i++) {
      data.push({data: Math.floor(Math.random() * 250), color: this.getRandomColor()});
    }

    data = _.uniqBy(data, (p) => p.data);
    data = _.sortBy(data, (p) => -p.data);

    var rScale = d3.scaleLinear().
      domain([0, d3.max(data, (p) => p.data)]).
      range([0, 500]);

    var svg = d3.select('#d3-2').
      append('svg').
      attr('width', 500).
      attr('height', 500).
      attr('style', 'background-color: #999999; padding: 30px;');

    var circles = svg.selectAll('circle').
      data(data).
      enter().
      append('circle').
      attr('cx', 250).
      attr('cy', 250).
      attr('r', 0).
      attr('fill', (p) => p.color);

    circles.transition().
      attr('r', (p) => rScale(p.data)).
      duration((p) => p.data*30).
      delay(2000).
      on('end', () => {
        circles.transition().
          attr('r', (p) => 0).
          duration((p) => p.data*10).
          delay(2000);
      });

  }

  renderD3() {

    let data = [];
    for(let i = 0; i < 50; i++) {
      data.push({year: i, data: Math.floor(Math.random() * 70)});
    }

    const yAxisData = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

    var barWidth = 13;
    var spaceBetween = 1;
    var width = (barWidth + spaceBetween) * data.length;
    var height = 200;

    var yAxisScale = d3.scaleLinear().
      domain([0, d3.max(yAxisData, (p) => p)]).
      range([0, height]);

    var xScale = d3.scaleLinear().
      domain([0, data.length]).
      range([0, width]);

    var yScale = d3.scaleLinear().
      domain([0, d3.max(data, (p) => p.data)]).
      range([0, height]);

    var svg = d3.select('#d3-1').
      append('svg').
      attr('width', width).
      attr('height', height).
      attr('style', 'background-color: #999999; padding: 30px;');

    var rects = svg.selectAll('rect').
      data(data).
      enter().
      append('rect').
      attr('x', (p, i) => xScale(i)).
      attr('y', (p, i) => height - yScale(p.data)).
      attr('height', 0).
      attr('width', barWidth).
      attr('fill', 'blue');

    /*svg.selectAll('text.xAxis').
      data(data).
      enter().
      append('text').
      attr('x', (p, i) => xScale(i) + barWidth).
      attr('y', height).
      attr('dx', -barWidth/2).
      attr('dy', 15).
      attr('text-anchor', 'middle').
      attr('font-size', '10').
      attr('fill', 'white').
      text((p) => p.year).
      attr('class', 'xAxis');*/

    /*svg.selectAll('text.yAxis').
      data(yAxisData).
      enter().
      append('text').
      attr('x', 0).
      attr('y', (p) => height - yAxisScale(p)).
      attr('font-size', '10').
      attr('fill', 'white').
      text((p) => p).
      attr('class', 'yAxis');*/

    rects.transition().
      attr('height', (p) => yScale(p.data)).
      attr('marginTop', (p) => p.data).
      duration((p) => p.data*20).
      delay(1000).
      ease(d3.easeExpIn).
      on('end', (p, i) => {
        if(p.data <= 3) return;
        svg.append('text').
          attr('x', xScale(i) + barWidth).
          attr('y', height - yScale(p.data)).
          attr('dx', -barWidth/2).
          attr('dy', '1.2em').
          attr('text-anchor', 'middle').
          text(p.data).
          attr('fill', 'white').
          attr('font-size', '8');
      });
  }

  render() {
    let jsx = (
        <Loading
          scaler={2}
          containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}}
        />
    );

    if(!this.state.loading) jsx = null;

    return (
      <div className="animated fadeIn" style={{...this.styles.container}} id="plugin-content-container">
        <div id="d3-1"></div>
        <div id="d3-2"></div>
        <div id="d3-3"></div>
        <div id="d3-4"></div>
        <div id="d3-5"></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Plugin);
