import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { history } from '../../../index.js';
import { navigate } from '../../actions/menu';
import { refreshGuides } from '../../actions/guides';
import { refreshTracking } from '../../actions/tracking';
import { refreshTopics } from '../../actions/topics';
import Fetch from '../../util/Fetch.js';

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
      container: {
        marginTop: 10,
        marginBottom: 10,
        padding: 5
      }
    }

    this.state = {
      loading: true,
      guides: [],
      search: false,
      searchValue: '',
      height: 0,
      width: 0
    }
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.updateDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions());
  }

  componentWillMount() {
    const { match } = this.props;
    this.updateDimensions();

    this.refreshData().then(() => {
      if(match.url.startsWith('/guides/g/') && match.params.guide) {
        axios.post('/guides/guide', {searchTitle: match.params.guide}).then((res) => {
          if(res.data.status === 200) {
            this.setState({loading: false, guides: [res.data.guide], search: true});
          } else {
            this.setState({loading: false});
          }
        }).catch((err) => {
          console.log(err);
        });
      } else if(match.url.startsWith('/guides/s/') && match.params.search) {
        axios.post('/guides/search', {heading: match.params.search, subHeading: match.params.search}).then((res) => {
          if(res.data.status === 200) {
            this.setState({loading: false, guides: res.data.guides, search: true});
          } else {
            this.setState({loading: false});
          }
        }).catch((err) => {
          console.log(err);
        });
      } else if(match.url.startsWith('/guides/t/') && match.params.topic) {
        axios.post('/guides/topic', {title: match.params.topic}).then((res) => {
          if(res.data.status === 200) {
            this.setState({loading: false, guides: res.data.guides, search: true});
          } else {
            this.setState({loading: false});
          }
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.setState({loading: false});
      }
    });
  }

  refreshData() {
    return new Promise((resolve, reject) => {
      let refresh = false;
      if(this.props.tracking.tracking.lastSynced &&
        this.props.topics.topics.lastSynced &&
        this.props.guides.guides.lastSynced) {

          let trls = new Date(this.props.tracking.tracking.lastSynced).getTime()/1000
          let tls = new Date(this.props.topics.topics.lastSynced).getTime()/1000
          let gls = new Date(this.props.guides.guides.lastSynced).getTime()/1000

          if(moment().subtract(trls, 'seconds').unix() > 86400 ||
             moment().subtract(tls, 'seconds').unix() > 86400 ||
             moment().subtract(gls, 'seconds').unix() > 86400) {
            refresh = true;
          }

      } else {
        refresh = true;
      }


      if(refresh) {
        Fetch().then((data) => {
          this.props.dispatch(refreshGuides(data.guides));
          this.props.dispatch(refreshTopics(data.topics));
          this.props.dispatch(refreshTracking(data.tracking));
          resolve();
        });
      }

      resolve();
    });
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

  renderSearchedGuide() {
    const { guides } = this.state;

    if(guides && guides.length > 0 && guides[0]) {
      return guides.map((post, index) => {
        let backgroundColor = index%2 === 0 ? '#f2f2f2' : 'white';
        return <Guide guide={post} key={index} style={{backgroundColor, marginTop: 5, marginBottom: 5}}/>
      });
    } else {
      return (
        <div style={{width: '100%', marginTop: 50}}>
          <Text style={{fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>
            No guide found that matched your search. Please try again.
          </Text>
        </div>
      )
    }
  }

  renderGuides() {
    const { guides } = this.props;

    return guides.guides.data.map((post, index) => {
      let backgroundColor = index%2 === 0 ? '#f2f2f2' : 'white';
      return <Guide guide={post} key={index} style={{backgroundColor, marginTop: 5, marginBottom: 5}}/>
    });
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

  renderMobile() {
    const { loading, search } = this.state;
    let jsx = null;

    if(this.state.loading) {
      jsx = <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}} scaler={2}/>
    } else if(search){
      jsx = this.renderSearchedGuide();
    } else {
      jsx = this.renderGuides();
    }

    let paddingTop = 45;
    let marginBottom = 60;
    if(this.props.menu.opened) paddingTop = 90;

    return (
      <div className="animated fadeIn" style={{display: 'flex', paddingTop, marginBottom}}>
        <div style={{...this.styles.container}}>
          {this.renderHeading()}
          {jsx}
          <GuideNavigator mobile loading={this.state.loading}/>
        </div>
      </div>
    )
  }

  renderFull() {
    const { loading, search } = this.state;
    let jsx = null;

    if(this.state.loading) {
      jsx = <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}} scaler={2}/>
    } else if(search){
      jsx = this.renderSearchedGuide();
    } else {
      jsx = this.renderGuides();
    }

    let paddingTop = 45;
    let marginBottom = 60;
    if(this.props.menu.opened) paddingTop = 90;

    return (
      <div className="animated fadeIn" style={{display: 'flex', paddingTop, marginBottom}}>
        <GuideNavigator style={{paddingTop: 25}} loading={this.state.loading}/>
        <div style={{...this.styles.container}}>
          {this.renderHeading()}
          {jsx}
        </div>
      </div>
    )
  }

  render() {
    const { width } = this.state;

    return (
      <div className="dashboard__container">
        <Navigator />
        <Menu />
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
