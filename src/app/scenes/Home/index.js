import React, { Component } from 'react';
import { connect } from 'react-redux';

import Heading from '../../components/Heading';
import Text from '../../components/Text';
import Post from '../../components/Post';
import Date from '../../components/Date';
import Border from '../../components/Border';
import Video from '../../components/Video';
import Loading from '../../components/Loading';

import Footer from '../components/Footer';
import Navigator from '../components/Navigator';
import Menu from '../components/Navigator/Menu';

import VotingWidget from '../../components/VotingWidget';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }

    this.styles = {
      container: {
        maxWidth: 900,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      post: {
        margin: 5,
        maxWidth: 900,
        display: 'flex',
        flexDirection: 'column',
      },
      row: {
        display: 'flex'
      },
      border: {
        marginTop: 20,
        marginBottom: 20
      }
    }
  }

  renderHome() {
    return (
      <div className="animatedFast fadeIn" style={{...this.styles.container}}>
        <div style={{...this.styles.post, padding: 5}}>
          <Heading title="Welcome!"/>
          <Text style={{marginTop: 10}}>Use the command line at the top to navigate around the site, and do other fun stuff! Click on the question in the menu bar for help!</Text>
          <Text style={{marginTop: 10}}>And while your at it, subscribe! Or whatever. No pressure :)</Text>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
            <div className="g-ytsubscribe" data-channelid="UCFXk8QukN7_GXBiuHMoXHLw" data-layout="full" data-count="default"></div>
          </div>
        </div>
        <div style={{marginTop: 50}}>
          <Post style={{...this.styles.post}}>
            <Date heading="Posted: " time="12/28/17" displayNew/>
            <Heading title="Persistent React-Redux app! This website is built off of that..." />
            <Video source="https://www.youtube.com/embed/CVrXupl6uH8"/>
          </Post>
          <Border style={{...this.styles.border}}/>
          <Post style={{...this.styles.post}}>
            <Date heading="Posted: " time="12/16/17" />
            <Heading subtitle="Pytorch Deep Learning AI Java Game Tutorial: Realms and Data Structures!" />
            <Video source="https://www.youtube.com/embed/ge8KyOZihwA"/>
          </Post>
          <Border style={{...this.styles.border}}/>
          <Post style={{...this.styles.post, marginBottom: 50}}>
            <Date heading="Posted: " time="9/11/17" />
            <Heading title="Got my first official web development position!" />
            <Text style={{marginTop: 5}}>Well, my previous job was still as a programmer. In fact, I was the only programmer writing a completely
                        custom application for a university lab. It was fun, but it came with the obvious perks: none. So, I starting
                        applying around and got a job as a React-Native developer!</Text>
          </Post>
        </div>
      </div>
    )
  }

  render() {
    let jsx = this.renderHome();

    if(this.state.loading) {
      jsx = <Loading containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}} scaler={2}/>
    }

    let paddingTop = 45;
    let marginBottom = 60;
    if(this.props.menu.opened) paddingTop = 90;

    return (
      <div className="dashboard__container">
        <Navigator />
        <Menu />
        <div style={{paddingTop, marginBottom}}>
          {jsx}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Home);
