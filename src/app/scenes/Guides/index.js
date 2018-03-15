import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { history } from '../../../index.js';
import { navigate } from '../../actions/menu';

import Loading from '../../components/Loading';

import Heading from '../../components/Heading';
import Text from '../../components/Text';
import Post from '../../components/Post';
import Border from '../../components/Border';
import Guide from '../../components/Guide';

import Footer from '../components/Footer';
import Navigator from '../components/Navigator';
import Menu from '../components/Navigator/Menu';

import GuideNavigator from './GuideNavigator/';
var FAIcon = require('react-fontawesome');

class Guides extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      post: {
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
        padding: 5
      },
      searchInput: {
        margin: 0,
        padding: 0,
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%'
      },
      messageContainer: {
        width: '100%',
        maxWidth: 1000,
        marginTop: 40,
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center'
      },
      guidesContainer: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: 5
      },
      topicContainer: {
        maxWidth: 1000,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }
    }

    this.state = {
      loading: true,
      guides: [],
      searchValue: '',
      height: 0,
      width: 0,
      startIndex: 0,
      endIndex: 5,
      topic: null,
      openSingleGuide: false,
      scrollRefresh: false,
      scrollLoading: false,
      endOfScrollMessage: null
    }
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.updateDimensions());
    window.addEventListener("scroll", () => this.updateScrollPosition());

    (window.adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-2478872111392737",
      enable_page_level_ads: true
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions());
    window.removeEventListener("scroll", () => this.updateScrollPosition());
  }

  componentWillMount() {
    const { match } = this.props;
    const { startIndex, endIndex } = this.state;

    if(match.url.startsWith('/guides/g/') && match.params.guide) {
      axios.post('/guides/guide', {searchTitle: match.params.guide}).then((res) => {
        if(res.data.status === 200) {
          this.setState({loading: false, guides: [res.data.guide], openSingleGuide: true});
        } else {
          this.setState({loading: false});
        }

        this.updateDimensions();
        this.updateScrollPosition();
      }).catch((err) => {
        console.log(err);
      });
    } else if(match.url.startsWith('/guides/s/') && match.params.search) {
      axios.post('/guides/search', {heading: match.params.search, subHeading: match.params.search, start: startIndex, end: endIndex}).then((res) => {
        if(res.data.status === 200) {
          this.setState({loading: false, guides: res.data.guides, scrollRefresh: true});
        } else {
          this.setState({loading: false});
        }

        this.updateDimensions();
        this.updateScrollPosition();
      }).catch((err) => {
        console.log(err);
      });
    } else if(match.url.startsWith('/guides/t/') && match.params.topic) {
      axios.post('/guides/topic', {title: match.params.topic, start: startIndex, end: endIndex}).then((res) => {
        if(res.data.status === 200) {
          this.setState({loading: false, guides: res.data.guides, scrollRefresh: true, topic: match.params.topic});
        } else {
          this.setState({loading: false});
        }

        this.updateDimensions();
        this.updateScrollPosition();
      }).catch((err) => {
        console.log(err);
      });
    } else if(match.url.startsWith('/guides')) {
      axios.post('/guides', {start: startIndex, end: endIndex}).then((res) => {
        if(res.data.status === 200) {
          this.setState({loading: false, guides: res.data.guides, scrollRefresh: true});
        } else {
          this.setState({loading: false});
        }

        this.updateDimensions();
        this.updateScrollPosition();
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.setState({loading: false});
    }
  }

  updateScrollPosition() {
    var scrollTop = (window.pageYOffset || window.scrollTop)  - (window.clientTop || 0);
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;

    if(scrollTop + window.innerHeight >= scrollHeight && this.state.scrollRefresh && !this.state.openSingleGuide) {
      this.scrollRefreshData();
    } else if(scrollHeight === window.innerHeight && !this.state.openSingleGuide) {
      this.scrollRefreshData();
    }
  }

  scrollRefreshData() {
    let { startIndex, endIndex } = this.state;
    const { match } = this.props;
    startIndex = endIndex;
    endIndex+=5;

    if(this.state.scrollLoading) { return; }

    if(match.url.startsWith('/guides/t/') && match.params.topic) {
      this.setState({scrollLoading: true, startIndex, endIndex});
      axios.post('/guides/topic', {title: match.params.topic, start: startIndex, end: endIndex}).then((res) => {
        if(res.data.status === 200) {

          if(isEndOfScroll(res.data.guides)) {
            this.setState({scrollRefresh: false, scrollLoading: false, endOfScrollMessage: 'End of query. Try again later! Thanks!!'});
          } else {
            let { guides } = this.state;
            guides = guides.concat(res.data.guides);
            this.setState({guides, scrollRefresh: true, scrollLoading: false});
          }

        } else {
          this.setState({scrollRefresh: false, scrollLoading: false, endOfScrollMessage: 'Woops. Server is broken. Please refresh the page.'});
        }
      }).catch((err) => {
        console.log(err);
      });
    } else if(match.url.startsWith('/guides')) {

      this.setState({scrollLoading: true, startIndex, endIndex});
      axios.post('/guides', {start: startIndex, end: endIndex}).then((res) => {
        if(res.data.status === 200) {

          if(isEndOfScroll(res.data.guides)) {
            this.setState({scrollRefresh: false, scrollLoading: false, endOfScrollMessage: 'End of query. Try again later! Thanks!!'});
          } else {
            let { guides } = this.state;
            guides = guides.concat(res.data.guides);
            this.setState({guides, scrollRefresh: true, scrollLoading: false});
          }

        } else {
          this.setState({scrollRefresh: false, scrollLoading: false, endOfScrollMessage: 'Woops. Server is broken. Please refresh the page.'});
        }
      }).catch((err) => {
        console.log(err);
      });
    }

    const isEndOfScroll = (newGuides) => {
      let { guides } = this.state;
      if(newGuides.length <= 0) { return true; }
      for(let i = 0; i < guides.length; i++) {
        let ng = newGuides.find((ng) => ng._id === guides[i]._id);
        if(ng) { return true; }
      }
      return false;
    }
  }

  updateDimensions() {
    var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    this.setState({height, width});
  }

  renderGuides() {
    const { guides } = this.state;

    if(guides && guides.length > 0 && guides[0]) {
      return guides.map((post, index) => {
        let backgroundColor = index%2 === 0 ? '#f2f2f2' : 'white';
        return (
          <Guide
            guide={post}
            key={index}
            style={{backgroundColor, marginTop: 5, marginBottom: 5}}
          />
        )
      });
    } else {
      return (
          <Text style={{...this.styles.messageContainer}}>
            No guide found that matched your search. Please try again.
          </Text>
      )
    }
  }

  renderSingleGuide() {
    const { guides } = this.state;

    if(guides && guides.length > 0 && guides[0]) {
      return <Guide guide={guides[0]} opened={true} style={{marginTop: 5, marginBottom: 5}}/>
    } else {
      return (
        <Text style={{...this.styles.messageContainer}}>
          No guide found that matched your search. Please try again.
        </Text>
      );
    }
  }

  renderHeading() {
    return (
      <div className="guide__container" style={{marginBottom: 20}}>
        <Heading title="Welcome to my guides section!"/>
          <Text>
            Call it my blog, but I'd rather call them guides as the purpose of them is to
            educate. I hope you learn something valuable!
          </Text>
        <Text style={{marginTop: 10}}>Try searching for a guide by typing 'search guides (heading / subheading / time)' into the menu input!</Text>
        <Text>Or just search for your guide below!!</Text>
        <input
          type="text"
          placeholder="Search for guides by heading or sub heading..."
          style={{...this.styles.searchInput}}
          value={this.state.searchValue}
          onChange={(e) => {
            let { searchValue } = this.state;
            searchValue = e.target.value;
            this.setState({searchValue});
          }}
          onKeyDown={(key) => {
            if(key.which === 13 && this.state.searchValue.length > 0) {
              history.push('/guides/s/' + this.state.searchValue);
            }
          }}
        />
      </div>
    )
  }

  renderTopic() {
    const { topic } = this.state;

    if(topic) {
      return (
        <div style={{...this.styles.topicContainer}}>
          <FAIcon name="book" style={{marginRight: 10, fontSize: 25}}/>
          <Heading title={topic} />
        </div>
      )
    }
  }

  renderMobile() {
    const { loading, scrollLoading, endOfScrollMessage } = this.state;
    let jsx = null;

    if(this.state.loading) {
      jsx = <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}} scaler={2}/>
    } else {
      jsx = this.renderGuides();
    }

    let paddingTop = 60;
    let marginBottom = 60;
    if(this.props.menu.opened) paddingTop = 90;

    return (
      <div className="animated fadeIn" style={{display: 'flex', paddingTop, marginBottom}}>
        <div style={{...this.styles.guidesContainer, flexDirection: 'column'}} id="guide-container">
          <GuideNavigator mobile loading={this.state.loading}/>
          {jsx}
          {scrollLoading ? <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: 20, maxWidth: 1000}} scaler={2}/> : null}
          {endOfScrollMessage ? <Text style={{...this.styles.messageContainer}}>{endOfScrollMessage}</Text> : null}
        </div>
      </div>
    )
  }

  renderFull() {
    const { loading, scrollLoading, endOfScrollMessage, topic, openSingleGuide } = this.state;
    let jsx = null;

    if(this.state.loading) {
      jsx = <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}} scaler={2}/>
    } else if(openSingleGuide) {
      jsx = this.renderSingleGuide();
    } else {
      jsx = this.renderGuides();
    }

    let paddingTop = 60;
    let marginBottom = 60;
    if(this.props.menu.opened) paddingTop = 90;

    return (
      <div className="animated fadeIn" style={{display: 'flex', paddingTop, marginBottom}}>
        <div>
          <GuideNavigator style={{marginTop: 5}} loading={this.state.loading}/>
        </div>
        <div style={{...this.styles.guidesContainer}} id="guide-container">
          {this.renderTopic()}
          {jsx}
          {scrollLoading ? <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: 20, maxWidth: 1000}} scaler={2}/> : null}
          {endOfScrollMessage ? <Text style={{...this.styles.messageContainer}}>{endOfScrollMessage}</Text> : null}
        </div>
      </div>
    )
  }

  render() {
    const { width } = this.state;
    const { opened } = this.props.menu;

    return (
      <div className="dashboard__container">
        <Navigator />
        {opened ? <Menu/> : null}
        {width < 750 ? this.renderMobile() : this.renderFull()}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Guides);
