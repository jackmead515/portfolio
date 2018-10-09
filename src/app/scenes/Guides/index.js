import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { history, SERVERIP } from '../../../index.js';
import Fetch from '../../util/Fetch.js';
import { getKeywords } from '../../util/';
import { refreshMouseDims, refreshWindowDims } from '../../actions/menu';

import Loading from '../../components/Loading';

import Bees from '../../components/Extra/Bees';
import Text from '../../components/Text';
import Border from '../../components/Border';
import FeedGuideAd from '../../components/FeedGuideAd';
import Guide from '../../components/Guide';
import Comments from '../../components/Comments';

import Navigator from '../components/Navigator';

import GuideNavigator from './GuideNavigator/';
var FAIcon = require('react-fontawesome');

class Guides extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      guides: [],
      searchValue: '',
      startIndex: 0,
      topic: null,
      openSingleGuide: false,
      scrollRefresh: false,
      scrollLoading: false,
      endOfScrollMessage: null,
      totalSearchResults: null,
      relatedGuides: null
    }

    this.scrollEnabled = true;

  }

  componentDidMount() {
    /*(window.adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-2478872111392737",
      enable_page_level_ads: true
    });*/
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions());
    window.removeEventListener("scroll", () => this.updateScrollPosition());
    window.removeEventListener("mousemove", (e) => this.updateMousePosition(e));
  }

  componentWillMount() {
    const { match } = this.props;

    window.addEventListener("resize", () => this.updateDimensions());
    window.addEventListener("scroll", () => this.updateScrollPosition());
    window.addEventListener("mousemove", (e) => this.updateMousePosition(e));

    this.updateDimensions();

    if(match.url.startsWith('/g/') && match.params.guide) {
      this.handleSingleGuideRoute();
    } else if(match.url.startsWith('/s/') && match.params.search) {
      this.handleSearchRoute();
    } else if(match.url.startsWith('/t/') && match.params.topic) {
      this.handleTopicRoute();
    } else if(match.url.startsWith('/')) {
      this.handleGuideRoute();
    } else {
      history.replace('/');
    }
  }

  handleSingleGuideRoute() {
    const { match } = this.props;
    const { startIndex } = this.state;

    Fetch.guideBySearchTitle(match.params.guide).then((guide) => {
      Fetch.related(guide.head.heading, guide.head.subHeading, guide.head.tags).then((related) => {
        related = related.filter((r) => r.searchTitle !== guide.searchTitle);
        this.setState({loading: false, guides: [guide], relatedGuides: related, openSingleGuide: true});
        this.scrollEnabled = false;
        this.updateDimensions();
        this.updateScrollPosition();
      }).catch((err) => {
        //TODO
      });
    }).catch((err) => {
      
      this.scrollEnabled = false;
      this.setState({scrollLoading: false, endOfScrollMessage: 'Woops. Server is broken. Please refresh the page.'});
    });
  }

  handleGuideRoute() {
    const { match } = this.props;
    const { startIndex } = this.state;

    Fetch.guides(startIndex).then((guides) => {
      this.scrollEnabled = true;
      this.setState({loading: false, guides: guides});
      this.updateDimensions();
      this.updateScrollPosition();
    }).catch((err) => {
      
      this.scrollEnabled = false;
      this.setState({scrollLoading: false, endOfScrollMessage: 'Woops. Server is broken. Please refresh the page.'});
    });
  }

  handleTopicRoute() {
    const { match } = this.props;
    const { startIndex } = this.state;

    Fetch.guidesByTopic(match.params.topic, startIndex).then((guides) => {
      this.scrollEnabled = true;
      this.setState({loading: false, guides: guides, topic: match.params.topic});
      this.updateDimensions();
      this.updateScrollPosition();
    }).catch((err) => {
      
      this.scrollEnabled = false;
      this.setState({scrollLoading: false, endOfScrollMessage: 'Woops. Server is broken. Please refresh the page.'});
    });
  }

  handleSearchRoute() {
    const { match } = this.props;
    const { startIndex } = this.state;

    Fetch.guidesBySearch(match.params.search, startIndex, true).then((data) => {
      this.scrollEnabled = true;
      this.setState({loading: false, guides: data.guides, totalSearchResults: data.amount});
      this.updateDimensions();
      this.updateScrollPosition();
    }).catch((err) => {
      
      this.scrollEnabled = false;
      this.setState({scrollLoading: false, endOfScrollMessage: 'Woops. Server is broken. Please refresh the page.'});
    });
  }

  updateScrollPosition() {
    var scrollTop = (window.pageYOffset || window.scrollTop)  - (window.clientTop || 0);
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;

    if(scrollTop + window.innerHeight >= scrollHeight && this.scrollEnabled) {
      this.scrollRefreshData();
    } else if(scrollHeight === window.innerHeight && this.scrollEnabled) {
      this.scrollRefreshData();
    }
  }

  updateDimensions() {
    var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    this.props.dispatch(refreshWindowDims(width, height));
  }

  updateMousePosition(e) {
    var dot, eventDoc, doc, body, pageX, pageY;

    e = e || window.event; // IE-ism

    if (e.pageX == null && e.clientX != null) {
        eventDoc = (e.target && e.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        e.pageX = e.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        e.pageY = e.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    this.props.dispatch(refreshMouseDims(e.pageX, e.pageY));
  }

  scrollRefreshData() {
    let { startIndex, scrollLoading } = this.state;
    const { match } = this.props;

    if(scrollLoading) { return; }

    if(match.url.startsWith('/t/') && match.params.topic) {

      this.setState({scrollLoading: true, startIndex: startIndex+10}, () => {  this.handleScrollTopicRoute(); });

    } else if(match.url.startsWith('/s/') && match.params.search) {

      this.setState({scrollLoading: true, startIndex: startIndex+10}, () => { this.handleScrollSearchRoute(); });

    } else if(match.url.startsWith('/') && Object.keys(match.params).length === 0 && match.params.constructor === Object) {

      this.setState({scrollLoading: true, startIndex: startIndex+10}, () => { this.handleScrollGuidesRoute(); });

    }
  }

  handleScrollGuidesRoute() {
    let { startIndex, scrollLoading } = this.state;
    const { match } = this.props;

    Fetch.guides(startIndex).then((guides) => {
      if(this.isEndOfScroll(guides)) {
        this.scrollEnabled = false;
        this.setState({scrollLoading: false, endOfScrollMessage: 'End of query. Try again later! Thanks!!'});
      } else {
        let newGuides = this.state.guides.concat(guides);
        this.setState({guides: newGuides, scrollLoading: false});
      }
    }).catch((err) => {
      
      this.scrollEnabled = false;
      this.setState({scrollLoading: false, endOfScrollMessage: 'Woops. Server is broken. Please refresh the page.'});
    });
  }

  handleScrollSearchRoute() {
    let { startIndex, scrollLoading } = this.state;
    const { match } = this.props;

    Fetch.guidesBySearch(match.params.search, startIndex).then((data) => {
      if(this.isEndOfScroll(data.guides)) {
        this.scrollEnabled = false;
        this.setState({scrollLoading: false, endOfScrollMessage: 'End of query. Try again later! Thanks!!'});
      } else {
        let newGuides = this.state.guides.concat(data.guides);
        this.setState({guides: newGuides, scrollLoading: false});
      }
    }).catch((err) => {
      
      this.scrollEnabled = false;
      this.setState({scrollLoading: false, endOfScrollMessage: 'Woops. Server is broken. Please refresh the page.'});
    });
  }

  handleScrollTopicRoute() {
    let { startIndex, scrollLoading } = this.state;
    const { match } = this.props;

    Fetch.guidesByTopic(match.params.topic, startIndex).then((guides) => {
      if(this.isEndOfScroll(guides)) {
        this.scrollEnabled = false;
        this.setState({scrollLoading: false, endOfScrollMessage: 'End of query. Try again later! Thanks!!'});
      } else {
        let newGuides = this.state.guides.concat(guides);
        this.setState({guides: newGuides, scrollLoading: false});
      }
    }).catch((err) => {
      
      this.scrollEnabled = false;
      this.setState({scrollLoading: false, endOfScrollMessage: 'Woops. Server is broken. Please refresh the page.'});
    });
  }

  isEndOfScroll(newGuides) {
    let { guides } = this.state;
    if(newGuides.length <= 0) { return true; }
    for(let i = 0; i < guides.length; i++) {
      let ng = newGuides.find((ng) => ng._id === guides[i]._id);
      if(ng) { return true; }
    }
    return false;
  }

  renderGuides() {
    const { windowWidth } = this.props.menu;
    const { guides } = this.state;

    if(guides && guides.length > 0 && guides[0]) {
      let arr = [];
      arr.push(<Border key={'border-f'} style={{marginTop: 30, marginBottom: 30}}/>);
      guides.map((guide, i) => {
        if(guide) {
          arr.push((
            <Guide
              mobile={windowWidth < 750 ? true : false}
              guide={guide}
              key={i}
              style={{marginTop: 5, marginBottom: 5}}
            />
          ));
          if(i !== guides.length-1) {
            arr.push(<Border key={'border-' + i} style={{marginTop: 15, marginBottom: 15}}/>);
          }
        }
        /*if(i%10 === 0 && i !== 0) {
          arr.push(<FeedGuideAd key={"ad-" + i} style={{width: '100%'}}/>);

          if(i !== guides.length-1) {
            arr.push(<Border key={'adborder-' + i} style={{marginTop: 15, marginBottom: 15}}/>);
          }
        }*/
      });
      return arr;
    } else {
      return (
          <p className="guides__messagecontainer">
            No guide found that matched your search. Please try again.
          </p>
      );
    }
  }

  renderSingleGuide() {
    const { guides, width, relatedGuides } = this.state;

    if(guides && guides.length > 0 && guides[0]) {
      let arr = [];
      //arr.push(<Border key="border-1" style={{marginTop: 30, marginBottom: 30}}/>);
      arr.push((
        <Guide
          key="single-guide"
          mobile={true}
          guide={guides[0]}
          opened={true}
          doNotTrack
          style={{marginTop: 10}}
        />
      ));
      arr.push(<Border key="border-2" style={{marginTop: 30, marginBottom: 30}}/>);
      if(relatedGuides && relatedGuides.length > 0) {
        arr.push((
          <div key="related-guides" style={{width: '100%'}}>
            <h3 style={{marginTop: 0, marginBottom: 10}}>Related Guides</h3>
              {relatedGuides.map((r, i) => {
                return (
                  <a
                    key={'related-'+i}
                    className="guidenav__post"
                    style={{display: 'block'}}
                    href={SERVERIP + "/g/" + r.searchTitle}
                  >
                     {r.head.heading}
                  </a>
                )
              })}
          </div>
        ));
        arr.push(<Border key="border-3" style={{marginTop: 30, marginBottom: 30}}/>);
      }
      arr.push(<Comments key="comments" guide={guides[0]}/>);
      return arr;
    } else {
      return (
        <p className="guides__messagecontainer">
          No guide found that matched your search. Please try again.
        </p>
      );
    }
  }

  renderOtherSites() {
    return (
      <div className="fullrow fullrow--between">
        <button
          className="guides__exlinks__button"
          onClick={() => {
            var win = window.open('https://stackoverflow.com/users/5132605/vocojax', '_blank');
            if(win) win.focus();
          }}
        >
          <FAIcon name='stack-overflow'/>
        </button>
        <button
          className="guides__exlinks__button"
          onClick={() => {
            var win = window.open('https://github.com/jackmead515', '_blank');
            if(win) win.focus();
          }}
        >
          <FAIcon name='github-square'/>
        </button>
        <button
          className="guides__exlinks__button"
          onClick={() => {
            var win = window.open('https://www.linkedin.com/in/jack-mead-687507a2/', '_blank');
            if(win) win.focus();
          }}
        >
          <FAIcon name='linkedin-square'/>
        </button>
        <button
          className="guides__exlinks__button"
          onClick={() => {
            var win = window.open('https://www.quora.com/profile/Jack-Mead-3', '_blank');
            if(win) win.focus();
          }}
        >
          <FAIcon name='quora'/>
        </button>
        <button
          className="guides__exlinks__button"
          onClick={() => {
            var win = window.open('https://www.youtube.com/channel/UCFXk8QukN7_GXBiuHMoXHLw', '_blank');
            if(win) win.focus();
          }}
        >
          <FAIcon name='youtube-square'/>
        </button>
      </div>
    );
  }

  renderSearchInput() {
    return (
      <div className="guides__searchinputcontainer">
        <button
          style={{borderRight: '2px solid #e3e3e3'}}
          className="guides__links__button"
          title="Go Home"
          onClick={() => {
            history.replace('/');
            window.location.reload();
          }}
        >
          <FAIcon name='home' style={{color: '#555'}}/>
        </button>
        <input
          type="text"
          placeholder="Search for guides..."
          className="guides__searchinput"
          value={this.state.searchValue}
          onChange={(e) => {
            let { searchValue } = this.state;
            searchValue = e.target.value;
            this.setState({searchValue});
          }}
          onKeyDown={(key) => {
            if(key.which === 13 && this.state.searchValue.length > 0) {
              history.replace('/s/' + this.state.searchValue);
              window.location.reload();
            }
          }}
        />
        <button
          style={{borderLeft: '2px solid #e3e3e3'}}
          className="guides__links__button"
          title="Search!"
          onClick={() => {
            if(this.state.searchValue.length > 0) {
              history.replace('/s/' + this.state.searchValue);
              window.location.reload();
            }
          }}
        >
          <FAIcon name='search' style={{color: '#555'}}/>
        </button>
      </div>
    );
  }

  renderTopic() {
    const { topic } = this.state;

    if(topic) {
      return (
        <div className="guides__topiccontainer">
          <FAIcon name="book" style={{marginRight: 10, fontSize: 30}}/>
          <h2 className="guides__topic">{topic}</h2>
        </div>
      );
    }
  }

  renderTotalSearchResults() {
    const { totalSearchResults } = this.state;

    if(totalSearchResults) {
      return (
        <div className="guides__topiccontainer">
          <h2 className="guides__searchamount">{totalSearchResults + " result(s) found"}</h2>
        </div>
      );
    }
  }

  renderMobile() {
    const { loading, scrollLoading, endOfScrollMessage, openSingleGuide } = this.state;

    let paddingTop = 60;
    if(this.props.menu.opened) paddingTop = 90;

    let contentJSX = null;
    if(this.state.loading) {
      contentJSX = <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}} scaler={2}/>
    } else if(openSingleGuide) {
      contentJSX = this.renderSingleGuide();
    } else {
      contentJSX = this.renderGuides();
    }

    return (
      <div key="mobile" className="animatedFast fadeIn guides__container--mobile" style={{paddingTop, marginBottom: 30}}>
        <div className="guides__contentcontainer" id="guide-container">
          {this.renderSearchInput()}
          {this.renderOtherSites()}
          <GuideNavigator mobile loading={this.state.loading} />
          {this.renderTopic()}
          {this.renderTotalSearchResults()}
          {contentJSX}
          {scrollLoading ? <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: 20, maxWidth: 1000}} scaler={2}/> : null}
          {endOfScrollMessage ? <p className="guides__messagecontainer">{endOfScrollMessage}</p> : null}
        </div>
      </div>
    )
  }

  renderFull() {
    const { bees } = this.props.menu;
    const { loading, scrollLoading, endOfScrollMessage, topic, openSingleGuide } = this.state;

    let paddingTop = 60;
    if(this.props.menu.opened) paddingTop = 90;

    let contentJSX = null;
    if(this.state.loading) {
      contentJSX = <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}} scaler={2}/>
    } else if(openSingleGuide) {
      contentJSX = this.renderSingleGuide();
    } else {
      contentJSX = this.renderGuides();
    }

    return (
      <div key="full" className="animatedFast fadeIn guides__container--full" style={{paddingTop, marginBottom: 30}}>
        <div className="column column--wc" style={{marginRight: 40, marginLeft: 20}}>
          {this.renderOtherSites()}
          <GuideNavigator style={{marginTop: 10}} loading={this.state.loading}/>
        </div>
        <div className="guides__contentcontainer" id="guide-container" style={{marginRight: 20}}>
          {this.renderSearchInput()}
          {this.renderTopic()}
          {this.renderTotalSearchResults()}
          {contentJSX}
          {!this.state.loading && scrollLoading ? <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: 20, maxWidth: 1000}} scaler={2}/> : null}
          {endOfScrollMessage ? <p className="guides__messagecontainer">{endOfScrollMessage}</p> : null}
        </div>
        {bees ? <Bees /> : null}
        {bees ? <Bees /> : null}
        {bees ? <Bees /> : null}
      </div>
    )
  }

  render() {
    const { windowWidth } = this.props.menu;

    let arr = [];
    arr.push(<Navigator key="nav"/>);
    arr.push(windowWidth < 850 ? this.renderMobile() : this.renderFull())

    return arr;
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Guides);
