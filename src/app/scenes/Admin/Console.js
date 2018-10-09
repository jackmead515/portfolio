import React from 'react';
import { connect } from 'react-redux';
import Authenticator from './Authenticator';
import Navigator from '../components/Navigator';
import { pushCommand } from '../components/Navigator/commandHandler';
import { refreshGuides, refreshPopular } from '../../actions/guides';
import { refreshTracking } from '../../actions/tracking';
import { refreshTopics } from '../../actions/topics';
import Fetch from '../../util/Fetch.js';
import Loading from '../../components/Loading';
import Border from '../../components/Border';
import Guide from '../../components/Guide';
import PopUpError from '../../components/PopUpError';

import { history, SERVERIP } from '../../../index.js';

import FAIcon from 'react-fontawesome';

import * as d3 from 'd3';

class Console extends Authenticator {
  constructor(props) {
    super(props);

    this.state = {
      guides: [],
      tracking: [],
      comments: {},
      loading: true,
      startIndex: 0,
      scrollRefresh: false,
      scrollLoading: false,
      scrollEnabled: true,
      popuperror: false
    }

    this.styles = {
      loading: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20,
        maxWidth: 1000
      }
    }
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    Promise.all([
      Fetch.allGuides(),
      Fetch.tracking(),
      Fetch.topics(),
      Fetch.popular(10)
    ]).then((data) => {
      this.props.dispatch(refreshGuides(data[0]));
      this.props.dispatch(refreshTracking(data[1]));
      this.props.dispatch(refreshTopics(data[2]));
      this.props.dispatch(refreshPopular(data[3]));
      this.setState({guides: data[0], tracking: data[1], loading: false}, () => {
        this.renderPopularD3();
      });
    }).catch((err) => {
      this.setState({popuperror: err.message})
    //  history.replace('/login');
    });
  }

  renderPopularD3() {
    const popular = this.props.guides.popular.data;

    let padding = {left: 10, right: 10, top: 0, bottom: 20};
    let parentWidth = d3.select('#guide-container').node().getBoundingClientRect().width;
    let width = parentWidth-padding.left-padding.right-40;
    let height = 20*popular.length;

    let minPop = d3.min(popular, (p) => p.score);
    let maxPop = d3.max(popular, (p) => p.score);

    let svg = d3.select('#populard3').append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("style", "background-color: white; padding: 0px 10px 20px 10px; box-sizing: content-box;");

    let g =  svg.append("g")

    let xScale = d3.scaleLinear().range([0, width]).domain([minPop-20, maxPop+20]);

    let xAxis = d3.axisBottom(xScale).ticks(10).tickFormat((t) => t);

    g.selectAll('.graphs__console__bar')
      .data(popular)
      .enter()
      .append('rect')
      .attr("class", "graphs__console__bar")
      .attr("x", 0)
      .attr("y", (d, i) => i*20)
      .attr("width", 0)
      .attr("height", 15)
      .transition()
      .attr('width', (d) => xScale(d.score))
      .duration(1000)
      .ease(d3.easeExpIn)
      .on('end', (d, i) => {
        g.append("text")
          .attr("class", "graphs__console__text")
          .text(d.score)
          .attr("x", 0)
          .attr("y", i*20+1)
          .attr("dy", 10)
          .attr("dx", 10)
      })

    g.selectAll('.graphs__console__bar')
      .append("svg:title")
      .text((d) => {
        let lp = ((d.links/d.score)*100).toFixed(1);
        let vp = ((d.views/d.score)*100).toFixed(1);
        let sp = ((d.searches/d.score*100)).toFixed(1);
        return d.heading + "\n" + lp + "% links, " + sp + "% searches, " + vp + "% views";
      });

    let gX = svg.append("g")
        .attr("class", "y_axis graphs__axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxis);
  }

  renderPopular() {
    return (
      <div className="console__tc" key={"popular"}>
        <div className="console__th">
          <h3 className="console__th--title">Analytics</h3>
        </div>
        <div id="populard3"></div>
      </div>
    );
  }

  renderTopics() {
    const topics = this.props.topics.topics.data;

    let data = topics.map((t, i) => {
      return (
        <a
          key={t.title + ' ' + i}
          className="guidenav__post"
          href={SERVERIP + "/admin/t/" + t.title}
        >
           {t.title}
        </a>
      );
    });

    return (
      <div className="console__tc" key={"topics"}>
        <div className="console__th">
          <h3 className="console__th--title">Topics</h3>
          <div
            className="console__th--button"
            title="Create New Topic"
            onClick={() => pushCommand('admin create topic')}
          >
            <FAIcon name="plus" style={{color: 'black'}}/>
          </div>
        </div>
        <div className="row--wrap">
          {data}
        </div>
      </div>
    )
  }

  renderGuides() {
    const { guides } = this.state;
    let arr = [];
    for(let i = 0; i < guides.length; i++) {
      let guide = guides[i];
      if(guide) {
        arr.push((
          <Guide
            titleLink={SERVERIP + "/admin/g/" + guide.searchTitle}
            mobile={false}
            guide={guide}
            key={i}
            style={{marginTop: 5, marginBottom: 5}}
          />
        ));
        if(i !== guides.length-1) {
          arr.push(<Border key={'border-' + i} style={{marginTop: 15, marginBottom: 15}}/>);
        }
      }
    }

    return (
      <div className="console__tc" key={"guides"}>
        <div className="console__th">
          <h3 className="console__th--title">Guides</h3>
          <div
            className="console__th--button"
            title="Create New Guide"
            onClick={() => pushCommand('admin create guide')}
          >
            <FAIcon name="plus" style={{color: 'black'}}/>
          </div>
        </div>
        {arr}
      </div>
    );
  }

  renderPopUpError() {
    const { popuperror } = this.state;

    if(popuperror) {
      return (
        <PopUpError
          key="popuperror"
          message={popuperror}
          onConfirm={() => this.setState({popuperror: false})}
        />
      )
    }
  }

  renderContent() {
    const {loading, scrollLoading, endOfScrollMessage } = this.state;

    let paddingTop = 60;
    if(this.props.menu.opened) paddingTop = 90;
    let contentJSX = null;
    if(loading) {
      contentJSX = <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}} scaler={2}/>
    } else {
      contentJSX = [];
      contentJSX.push(this.renderPopular());
      contentJSX.push(<Border key={"border-1"} style={{marginTop: 15, marginBottom: 15}}/>)
      contentJSX.push(this.renderTopics())
      contentJSX.push(<Border key={"border-2"} style={{marginTop: 15, marginBottom: 15}}/>)
      contentJSX.push(this.renderGuides())
    }

    return (
      <div key="content" className="animatedFast fadeIn guides__container--full" style={{paddingTop, marginBottom: 30, margin: 'auto'}}>
        <div className="guides__contentcontainer" id="guide-container" style={{paddingLeft: 20, paddingRight: 20}}>
          {contentJSX}
          {scrollLoading ? <Loading containerStyles={{...this.styles.loading}} scaler={2}/> : null}
          {endOfScrollMessage ? <p className="guides__messagecontainer">{endOfScrollMessage}</p> : null}
        </div>
      </div>
    )
}

  render() {
    if(!this.state.authenticated) return <div></div>

    let jsx = [];
    jsx.push(<Navigator key="nav"/>);
    jsx.push(this.renderPopUpError())
    jsx.push(this.renderContent());
    return jsx;
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Console);
