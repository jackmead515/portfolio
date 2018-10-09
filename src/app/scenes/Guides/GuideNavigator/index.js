import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { SERVERIP } from '../../../../index.js';

import YearDropDown from './YearDropDown';
import Loading from '../../../components/Loading';
import DropDown from '../../../components/DropDown';

import { refreshRecent, refreshPopular } from '../../../actions/guides';
import { refreshTopics } from '../../../actions/topics';
import Fetch from '../../../util/Fetch';
import _ from 'lodash';

class GuideNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      displayAllPopular: false,
      displayAllRecent: false,
      displayAllTopics: false,
    }
  }

  componentDidMount() {
    this.refreshData().then(() => {
      this.setState({loading: false});
    });
  }

  refreshData() {
    return new Promise((resolve, reject) => {
      Fetch.recent(10).then((recent) => {
        Fetch.popular(10).then((popular) => {
          Fetch.topics().then((topics) => {
            this.props.dispatch(refreshRecent(recent));
            this.props.dispatch(refreshPopular(popular));
            this.props.dispatch(refreshTopics(topics));
            resolve();
          });
        });
      });
    });
  }

  renderRecent() {
    let guides = this.props.guides.recent.data;
    const { displayAllRecent } = this.state;

    if(guides.length <= 0) return null;

    let recComps = [];
    let length = displayAllRecent ? guides.length : 3;
    for(let i = 0; i < length; i++) {
      let g = guides[i];
      if(g) {
        recComps.push((
          <a
            key={g.searchTitle + ' ' + i}
            className="guidenav__post"
            href={SERVERIP + "/g/" + g.searchTitle}
          >
             {g.heading}
          </a>
        ))
      } else {
        break;
      }
    }

    return (
      <div key="recent-guides">
        <h3 className="guidenav__heading">Most Recent</h3>
        {recComps}
        <span
          className="guidenav__post"
          style={{display: 'block'}}
          onClick={() => this.setState({displayAllRecent: !this.state.displayAllRecent})}>
           ...
        </span>
      </div>
    )
  }

  renderPopular() {
    let popular = this.props.guides.popular.data;
    const { displayAllPopular } = this.state;

    if(popular.length <= 0) return null;

    let compPopular = []
    let length = displayAllPopular ? popular.length : 3;
    //popular = _.sortBy(popular, (p) => -p.score);
    for(let i = 0; i < length; i++) {
      let mp = popular[i];
      if(mp) {
        compPopular.push((
          <a
            key={mp.heading}
            className="guidenav__post"
            href={SERVERIP + "/g/" + mp.searchTitle}
          >
             {mp.heading}
          </a>
        ))
      } else {
        break;
      }
    }

    return (
      <div key="popular-guides" style={{marginTop: 15}}>
        <h3 className="guidenav__heading">Most Popular</h3>
        {compPopular}
        <span
          className="guidenav__post"
          style={{display: 'block'}}
          onClick={() => this.setState({displayAllPopular: !this.state.displayAllPopular})}>
           ...
        </span>
      </div>
    )
  }

  renderTopics() {
    const topics = this.props.topics.topics.data;
    const { displayAllTopics } = this.state;

    if(topics.length <= 0) return null;

    let compTopics = [];
    let length = displayAllTopics ? topics.length : 10;
    for(let i = 0; i < length; i++) {
      let t = topics[i];
      if(t) {
        compTopics.push((
          <a
            key={t.title + ' ' + i}
            className="guidenav__post"
            href={SERVERIP + "/t/" + t.title}
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
        <h3 className="guidenav__heading">Topics</h3>
        {compTopics}
        <span
          style={{display: 'block'}}
          className="guidenav__post"
          onClick={() => this.setState({displayAllTopics: !this.state.displayAllTopics})}>
           ...
        </span>
      </div>
    )
  }

  renderYears() {
    return (
      <div key="years-list" style={{marginTop: 15}}>
        <h3 className="guidenav__heading">By Date</h3>
        <YearDropDown year={'2018'}/>
      </div>
    )
  }

  renderAbout() {

    if(this.props.mobile) {
      return (
        <div className="guidenav__about__container">
          <div className="row" style={{marginTop: 20, marginBottom: 10}}>
            <img src={SERVERIP + "/images/profileimage.jpg"}  className="guidenav__about__image--mobile" />
            <p className="content__text" style={{textAlign: 'center', fontSize: 15}}>
              Welcome to my blog! Browse to your heart's content and let me know if you find anything interesting!
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="guidenav__about__container">
            <img src={SERVERIP + "/images/profileimage.jpg"}  className="guidenav__about__image" />
            <p className="content__text" style={{textAlign: 'center', fontSize: 15}}>
              Welcome to my blog! Browse to your heart's content and let me know if you find anything interesting! (or boring)
            </p>
        </div>
      );
    }


  }

  renderLoading() {
    if(this.props.mobile) {
      return (
        <div className="guidenav__mobile__container">
          <Loading containerStyles={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 50}}/>
        </div>
      )
    } else {
      return (
        <div className="guidenav__container" style={{marginRight: 0}}>
          <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: 150}}/>
        </div>
      )
    }
  }

  renderMobile() {
    const { style } = this.props;

    return (
      <div className="guidenav__mobile__container" style={{...style}}>
        {this.renderAbout()}
        <DropDown heading={"Popular, Recent, Topics..."} containerStyles={{paddingTop: 20}} style={{marginBottom: 20}}>
          {this.renderRecent()}
          {this.renderPopular()}
          {this.renderTopics()}
          {this.renderYears()}
        </DropDown>
      </div>
    );
  }

  renderFull() {
    const { style } = this.props;

    return (
      <div className="guidenav__container" style={{...style}}>
        {this.renderAbout()}
        {this.renderRecent()}
        {this.renderPopular()}
        {this.renderTopics()}
        {this.renderYears()}
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    const { mobile } = this.props;

    if(loading) return this.renderLoading();

    return mobile ? this.renderMobile() : this.renderFull();
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(GuideNavigator);
