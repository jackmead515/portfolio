import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SERVERIP } from '../../../../index.js';
import { refreshTracking } from '../../../actions/guides';

import DateNavigator from './DateNavigator';
import Loading from '../../../components/Loading';

import axios from 'axios';
import { popular } from '../../../util/';
import _ from 'lodash';

class GuideNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      tracking: []
    }
  }

  componentWillMount () {
    axios.post('/tracking/get_tracking').then((res) => {
      if(res.data.status === 200) {

        let { tracking } = res.data;

        tracking = tracking.map((g) => {
          return {
            heading: g.heading,
            searchTitle: g.searchTitle,
            links: g.activeLinks,
            views: g.activeViews,
            searches: g.activeSearches
          };
        });

        this.props.dispatch(refreshTracking(tracking));

        this.setState({loading: false, tracking});

      } else {
        Promise.reject('Server Error');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  renderRecent() {
    const guides = this.props.guides.guides.data;

    if(guides.length <= 0) return null;

    let recentGuides = [];
    for(let i = guides.length-1; i > guides.length-4; i--) {
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
    const { tracking } = this.state;

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
      <div key="popular-guides">
        <div className="guidenav__heading" style={{marginTop: 15}}>Most Popular</div>
        {arr}
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
        <DateNavigator key="date-navigator" guides={this.props.guides.guides.data}/>
      </div>
    );
  }

  render() {
    const { mobile } = this.props;

    if(this.state.loading) return this.renderLoading();

    return mobile ? this.renderMobile() : this.renderFull();


  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(GuideNavigator);
