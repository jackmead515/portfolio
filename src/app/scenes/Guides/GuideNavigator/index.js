import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SERVERIP } from '../../../../index.js';
import { refreshTracking } from '../../../actions/tracking';

import DateNavigator from './DateNavigator';
import Loading from '../../../components/Loading';

import axios from 'axios';
import { popular } from '../../../util/';
import _ from 'lodash';

class GuideNavigator extends Component {

  renderRecent() {
    const guides = this.props.guides.guides.data;

    if(guides.length <= 0) return null;

    let recentGuides = [];
    for(let i = 0; i < 3; i++) {
      let g = guides[i];
      if(g) {
        recentGuides.push((
          <a
            key={g.searchTitle + ' ' + i}
            className="guidenav__post"
            href={"http://" + SERVERIP + "/guides/g/" + g.searchTitle}
          >
             {g.head.heading}
          </a>
        ));
      } else {
        break;
      }
    }

    return (
      <div key="recent-guides">
        <div className="guidenav__heading">Recent Posts</div>
        {recentGuides}
      </div>
    )
  }

  renderPopular() {
    const tracking = this.props.tracking.tracking.data;

    if(tracking.length <= 0) return null;

    let mostPopular = popular(tracking, 3);

    let arr = mostPopular.map((mp) => {
      return (
        <a
          key={mp.heading}
          className="guidenav__post"
          href={"http://" + SERVERIP + "/guides/g/" + mp.searchTitle}
        >
           {mp.heading}
        </a>
      )
    });

    return (
      <div key="popular-guides" style={{marginTop: 15}}>
        <div className="guidenav__heading">Most Popular</div>
        {arr}
      </div>
    )
  }

  renderTopics() {
    const topics = this.props.topics.topics.data;

    if(topics.length <= 0) return null;

    let compTopics = [];
    for(let i = 0; i < topics.length; i++) {
      let t = topics[i];
      if(t) {
        compTopics.push((
          <a
            key={t.title + ' ' + i}
            className="guidenav__post"
            href={"http://" + SERVERIP + "/guides/t/" + t.title}
          >
             {t.title}
          </a>
        ));
      } else {
        break;
      }
    }

    return (
      <div key="topics-list" style={{marginTop: 15}}>
        <div className="guidenav__heading">Topics</div>
        {compTopics}
      </div>
    )
  }

  renderLoading() {
    if(this.props.mobile) {
      return (
        <div className="guidenav__mobile__container">
          <Loading containerStyles={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>
        </div>
      )
    } else {
      return (
        <div className="guidenav__container" style={{marginRight: 0}}>
          <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: 40}}/>
        </div>
      )
    }
  }

  renderMobile() {
    const { style } = this.props;

    return (
      <div className="guidenav__mobile__container" style={{...style}}>
        {this.renderRecent()}
        {this.renderPopular()}
        {this.renderTopics()}
        <DateNavigator key="date-navigator" guides={this.props.guides.guides.data}/>
      </div>
    );
  }

  renderFull() {
    const { style } = this.props;

    return (
      <div className="guidenav__container" style={{...style}}>
        {this.renderRecent()}
        {this.renderPopular()}
        {this.renderTopics()}
        <DateNavigator key="date-navigator" guides={this.props.guides.guides.data}/>
      </div>
    );
  }

  render() {
    const { mobile, loading } = this.props;

    if(loading) return this.renderLoading();

    return mobile ? this.renderMobile() : this.renderFull();


  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(GuideNavigator);
