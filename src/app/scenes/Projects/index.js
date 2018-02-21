import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../actions/menu';

import Loading from '../../components/Loading';
import Bees from '../../components/Extra/Bees';

import Heading from '../../components/Heading';
import LinkRef from '../../components/LinkRef';
import Text from '../../components/Text';
import Image from '../../components/Image';
import Post from '../../components/Post';
import Border from '../../components/Border';

import Footer from '../components/Footer';
import Navigator from '../components/Navigator';
import Menu from '../components/Navigator/Menu';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }

    this.styles = {
      container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: 'auto'
      },
      post: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        maxWidth: 500,
        padding: 5
      },
      row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10
      },
    }
  }

  renderProjects() {
    return (
      <div className="animated fadeIn" style={{...this.styles.container}}>

        <Post style={{...this.styles.post}}>
          <Heading title="This Website!!" />
          <div style={{...this.styles.row}}>
            <LinkRef link="https://github.com/jackmead515/portfolio" title="Github Repo" icon="external-link-square"/>
            <LinkRef link="http://127.0.0.1:3000/guides/g/making-my-blog" title="Guide" icon="external-link-square"/>
          </div>
          <Image source="/images/admin_portfolio.png"/>
          <Text text="I made this portfolio, blog, whatever to promote my ideas and have fun sharing them with you! That picture is of the admin side where I can create custom guides!" />
        </Post>

        <Post style={{...this.styles.post}}>
          <Heading title="TV Remote Controlled Arduino Robots" />
          <div style={{...this.styles.row}}>
            <LinkRef link="https://github.com/jackmead515/ir_robot" title="Github Repo" icon="external-link-square"/>
          </div>
          <Image source="/images/tvremoterobots.jpeg"/>
          <Text text="Arudino based robots made from pizza boxes and recycled electronic parts, configured to be controlled via a tv remote controller." />
        </Post>

        <Post style={{...this.styles.post}}>
          <Heading title="Phenotyping Timelapse System" />
          <div style={{...this.styles.row}}>
            <LinkRef link="https://github.com/jackmead515/ai_life" title="Github Repo" icon="external-link-square"/>
            <LinkRef link="https://github.com/jackmead515/ai_life" title="Research Paper" icon="external-link-square"/>
          </div>
          <Image source="/images/phenotypingsystem.jpg"/>
          <Text text="A Java-based time-lapse photography system built to monitor plant growth long term for genetics research." />
        </Post>

        <Post style={{...this.styles.post}}>
          <Heading title="AI Life" />
          <div style={{...this.styles.row}}>
            <LinkRef link="https://github.com/jackmead515/ai_life" title="Github Repo" icon="external-link-square"/>
          </div>
          <Image source="/images/ai_life.JPG"/>
          <Text text="A Java-based game about exploration which integrates a Pytorch Deep-Q Neural Network over a Python Flask API to simulate wilderness survival." />
        </Post>

        <Post style={{...this.styles.post}}>
          <Heading title="Simple MMO" />
          <div style={{...this.styles.row}}>
            <LinkRef link="https://github.com/jackmead515/multiplayerGame" title="Github Repo" icon="external-link-square"/>
            <LinkRef link="/images/ai_life.JPG" title="Download It!"/>
          </div>
          <Image source="/images/multiplayer_game.JPG"/>
          <Text>A 2D shooter game with a real-time chat interface, website with user accounts, and a full-fledged multiplayer ability.</Text>
        </Post>

        <Post style={{...this.styles.post}}>
          <Heading title="Chat App" />
          <LinkRef link="https://github.com/jackmead515/socketapp" title="Github Repo" icon="external-link-square"/>
          <Text>A simple socket.io chat app. Features customizable chat rooms and ability to send location via Google API.</Text>
        </Post>

        <Post style={{...this.styles.post}}>
          <Heading title="Weather App" />
          <div style={{...this.styles.row}}>
            <LinkRef link="https://github.com/jackmead515/simpleweather" title="Github Repo" icon="external-link-square"/>
          </div>
          <Image source="/images/simpleweather.jpeg"/>
          <Text>A simple weather app built with React-Native. Displays full-day and 7-day forecasts. Added ability of saving favorite locations.</Text>
        </Post>

        <Post style={{...this.styles.post, marginBottom: 10}}>
          <Heading title="Loading Animation!" />
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: 20, paddingBottom: 20}}>
            <Loading />
            <Loading reverse />
            <Loading scaler={2} />
            <Loading scaler={0.5} />
            <Loading speed={150} />
          </div>
          <Text>I thought I'd try something fun for this portfolio so I created a loading animation. Wohoo!</Text>
        </Post>

        <Post style={{...this.styles.post}}>
          <Heading title="Wander Algorithm" />
          <div style={{...this.styles.row}}>
            <LinkRef link="https://www.youtube.com/watch?v=31NmbY_8T-4" title="Youtube Video!" icon="youtube-play"/>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>
            <Bees />
          </div>
          <Text>I really like looking into the algorithms of games and how the AI's behave. This little bee uses SVG with a really simple wandering algorithm to move around :)</Text>
        </Post>

      </div>
    )
  }

  render() {
    const { extra } = this.props.menu;
    let jsx = this.renderProjects();

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

export default connect(mapStateToProps)(Projects);
