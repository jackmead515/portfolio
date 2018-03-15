import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { SERVERIP } from '../../../../index.js';

import YearDropDown from './YearDropDown';
import Loading from '../../../components/Loading';

import { refreshRecent, refreshPopular } from '../../../actions/guides';
import { refreshTopics } from '../../../actions/topics';
import Fetch from '../../../util/Fetch';
import _ from 'lodash';

class GuideNavigator extends Component {

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    return new Promise((resolve, reject) => {
      let refresh = false;
      if(this.props.topics.topics.lastSynced &&
         this.props.guides.popular.lastSynced &&
         this.props.guides.recent.lastSynced) {

          let rls = new Date(this.props.guides.recent.lastSynced).getTime()/1000;
          let pls = new Date(this.props.guides.popular.lastSynced).getTime()/1000;
          let tls = new Date(this.props.topics.topics.lastSynced).getTime()/1000;

          //one day...
          if(moment().subtract(tls, 'seconds').unix() > 86400000 ||
             moment().subtract(rls, 'seconds').unix() > 86400000 ||
             moment().subtract(pls, 'seconds').unix() > 86400000) {
               refresh = true;
            }
      } else {
        refresh = true;
      }

      if(refresh) {
        Fetch.recent().then((recent) => {
          Fetch.popular().then((popular) => {
            Fetch.topics().then((topics) => {
              this.props.dispatch(refreshRecent(recent));
              this.props.dispatch(refreshPopular(popular));
              this.props.dispatch(refreshTopics(topics));

              resolve();
            });
          });
        });
      } else {
        resolve();
      }
    });
  }

  renderRecent() {
    let guides = this.props.guides.recent.data;

    if(guides.length <= 0) return null;

    guides = _.sortBy(guides, (g) => -g.time);

    let recent = guides.map((g, i) => {
      return (
        <a
          key={g.searchTitle + ' ' + i}
          className="guidenav__post"
          href={"http://" + SERVERIP + "/guides/g/" + g.searchTitle}
        >
           {g.heading}
        </a>
      )
    });

    return (
      <div key="recent-guides">
        <div className="guidenav__heading">Recent Posts</div>
        {recent}
      </div>
    )
  }

  renderPopular() {
    let popular = this.props.guides.popular.data;

    if(popular.length <= 0) return null;

    let arr = popular.map((mp) => {
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

  renderYears() {
    return (
      <div key="years-list" style={{marginTop: 15}}>
        <div className="guidenav__heading">By Date</div>
        <YearDropDown year={'2018'}/>
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
        {this.renderYears()}
      </div>
    );
  }

  renderFull() {
    const { style } = this.props;

    return (
      <div className="guidenav__container" style={{...style}}>
        <div className="guidenav__about__container">
          <img src="http://127.0.0.1:5000/images/profileimage.jpg"  className="guidenav__about__image" />
          <p style={{textAlign: 'center'}}>
            Hey what's up gals and guys? My name is Jack. Browse to your hearts content! Subscribe and
            support me if you like what your looking at!
          </p>
        </div>
        {this.renderRecent()}
        {this.renderPopular()}
        {this.renderTopics()}
        {this.renderYears()}
        <div>
          <ins className="adsbygoogle"
               style={{display: 'block'}}
               data-ad-client="ca-pub-2478872111392737"
               data-ad-slot="3286717863"
               data-ad-format="auto"></ins>
        </div>
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
