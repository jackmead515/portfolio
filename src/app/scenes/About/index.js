import React, { Component } from 'react';
import { connect } from 'react-redux';

import Heading from '../../components/Heading';
import LinkRef from '../../components/LinkRef';
import Text from '../../components/Text';
import Image from '../../components/Image';
import Post from '../../components/Post';
import Border from '../../components/Border';
import Skill from '../../components/Skill';
import Loading from '../../components/Loading';
import SlideShow from '../../components/SlideShow';

import Footer from '../components/Footer';
import Navigator from '../components/Navigator';
import Menu from '../components/Navigator/Menu';

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'resume'
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
        marginTop: 10,
        marginBottom: 10,
        maxWidth: 900,
        padding: 5
      },
      row: {
        display: 'flex',
        flexDirection: 'row'
      },
    }
  }

  renderResume() {
    return (
      <div>
        <Post style={{...this.styles.post}}>
          <div stlye={{...this.styles.row, width: '100%', justifyContent: 'center'}}>
            <Heading title="Jack S Mead" subtitle="Modern Full-Stack Web Guru" />
          </div>
          <div style={{...this.styles.row, width: '100%', justifyContent: 'center', flexWrap: 'wrap', marginTop: 10}}>
            <Skill toggleable text="Javascript"/>
            <Skill toggleable text="JQuery"/>
            <Skill toggleable text="Bootstrap"/>
            <Skill toggleable text="React"/>
            <Skill toggleable text="React-Native"/>
            <Skill toggleable text="MongoDB"/>
            <Skill toggleable text="SQL"/>
            <Skill toggleable text="Node.js"/>
            <Skill toggleable text="Express.js"/>
            <Skill toggleable text="Python"/>
            <Skill toggleable text="Django"/>
            <Skill toggleable text="Socket.io"/>
            <Skill toggleable text="D3.js"/>
            <Skill toggleable text="Redis" />
            <Skill toggleable text="Java"/>
          </div>
        </Post>
        <Post style={{...this.styles.post}}>
          <Text>Type  'toggle skills'  in the menu input above...</Text>
        </Post>
        <Post style={{...this.styles.post}}>
          <Heading title="Who I Am" />
          <Border style={{marginTop: 5}}/>
          <Text style={{margin: 10}}>
            I am a programmer, scentist, DIY'er, food enthusiast, adventurer, traveler, skater, and lover of music.
            I love to program just about anything. I also love to teach the concepts I learn in a fun and entertaining way.
          </Text>
          <Image
            source={"/images/puertorico.jpg"}
          />
          <Text style={{margin: 10}}>
            I'm the type of guy whose office constantly looks like this...
          </Text>
          <Image
            source={"/images/messydesk.jpeg"}
          />
        </Post>
        <Post style={{...this.styles.post}}>
          <Heading title="Experience" />
          <Border style={{marginTop: 5}}/>
          <Heading style={{marginTop: 20}} subtitle="Lead Systems Engineer - Schnable Laboratory, Iowa State University" />
          <Text style={{margin: 10}} text="In charge of program whose goal was to take high quality images of plants over more than a month's period for genetics research."/>
          <Text style={{margin: 10}}>
            Programmed a client to server relationship using <Skill toggleable text="Java"/> which downloaded photos to a central hard drive,
            synced information about client’s health, and accepted various commands from a web interface. Commands
            included an ‘Update Software’ command which downloaded and re-compiled a new update.
          </Text>
          <Text style={{margin: 10}}>
            Contracted to upgrade system for remote control and uploading of photos to central server.
          </Text>
          <Text style={{margin: 10}}>
            Designed an easy to use, responsive web interface using <Skill toggleable text="HTML"/>, <Skill toggleable text="CSS"/>,
            <Skill toggleable text="Bootstrap"/>, <Skill toggleable text="Jquery"/>, <Skill toggleable text="PHP"/>, and
            pure <Skill toggleable text="Javascript"/> on an <Skill toggleable text="Apache"/> server to control and configure clients.
          </Text>
          <Text style={{margin: 10}}>
            Worked on <Skill toggleable text="Node.js"/> (with <Skill toggleable text="Express.js"/>) replacement utilizing more <Skill toggleable text="JSON"/>
            file structures and faster non-blocking IO performance. Also included <Skill toggleable text="MongoDB"/> database to monitor camera's performance over time.
          </Text>
          <Text style={{margin: 10}}>
            Experimented with a <Skill toggleable text="Keras"/> deep learning image classifier to reject corrupted photos.
          </Text>
          <Heading style={{marginTop: 20}} subtitle="Information Technology Assistant - Winterset High School" />
          <Text style={{margin: 10}}>
            Served as a service technician for mechanical and software related issues on school’s computer systems.
            Assisted students and faculty alike to assess and learn from technology related issues. Researched and
            administered software updates/patches for <Skill toggleable text="Windows"/>, <Skill toggleable text="Macintosh"/>,
            and <Skill toggleable text="Linux"/> operating systems.
          </Text>
          <Heading style={{marginTop: 20}} subtitle="Mathematics/Physics​ ​Tutor​ - Des Moines Area Community College" />
          <Text style={{margin: 10}}>
            Instructed and advised students on fundamental techniques for problem solving in <Skill toggleable text="Calculus"/>
            and <Skill toggleable text="Physics"/>. Was dedicated to seeing improvement and success in students and took necessary
            steps to nurture an “independent study” mentality."
          </Text>
        </Post>
        <Post style={{...this.styles.post}}>
          <Heading title="Education" />
          <Border style={{marginTop: 5}}/>
          <Heading style={{marginTop: 20}} subtitle="Des Moines Area Community College - Pre-Engineering" />
          <Text style={{margin: 10}} text="Cumulative GPA: 3.58 / 4.00" />
          <Text style={{margin: 10}} text="Provost’s Award for High Scholastic Achievement – Spring 2015 – GPA: 3.87" />
          <Text style={{margin: 10}} text="Dean’s Award for High Scholastic Achievement – Fall 2015 – GPA: 3.70" />
          <Text style={{margin: 10}} text="Dean’s Award for High Scholastic Achievement – Spring 2016 – GPA: 3.94" />
          <Text style={{margin: 10}} text="NET 123 – Computer Hardware Basics, NET 139 – Microsoft Desktop Operating System, NET 166 – Applied Computer Security, NET 484 – Net+ Certification, EGR 155 – C/C++" />
          <Heading style={{marginTop: 20}} subtitle="Iowa State University" />
          <Text style={{margin: 10}} text="Dean's List for High Scholastic Achievement - Spring 2016 - GPA: 3.67" />
          <Text style={{margin: 10}} text="COMS 227 – Java Fundamentals, EE 201 – Electric Circuits, MATH 267 – Differential Equations" />
          <Heading style={{marginTop: 20}} subtitle="Udemy.com" />
          <Text style={{margin: 10}} text="Complete Node.js Developer Course" />
          <Text style={{margin: 10}} text="Full-Stack Web Apps with Meteor and React" />
          <Text style={{margin: 10}} text="Python and Django Full Stack Web Developer Bootcamp" />
          <Text style={{margin: 10}} text="Artificial Intelligence A-Z" />
          <Text style={{margin: 10}} text="Machine Learning A-Z" />
          <Text style={{margin: 10}} text="The Complete React Native and Redux Course" />
          <Heading style={{marginTop: 20}} subtitle="FreeCodeCamp.com" />
          <Text style={{margin: 10}} text="Basic HTML, CSS, Javascript, JQuery, and Bootstrap" />
        </Post>
        <Post style={{...this.styles.post}}>
          <Heading title="Volunteer" />
          <Border style={{marginTop: 5}}/>
          <Heading style={{marginTop: 20}} subtitle="Lead​ ​Designer/Programmer​ - DMACC STEM Festival" />
          <Text style={{margin: 10}}>
            Designed and constructed an automated PVC pipe hydroponics system. Design sustained itself using the
            Arduino microcontroller. Booth allowed students to interact with the device to learn about plant growth and
            nutrients, <Skill toggleable text="C"/>/<Skill toggleable text="C++"/> code and the <Skill toggleable text="Arduino"/>
            platform, and the future of food.
          </Text>
          <Heading style={{marginTop: 20}} subtitle="Lead​ ​Designer/Programmer​ - Drake University STEM Festival" />
          <Text style={{margin: 10}}>
            Designed, programmed and constructed <Skill toggleable text="Arduino"/>-run, TV remote controlled robots from scratch. Robots aimed
            to show the ease and cost effectiveness of taking disposed electronics/materials and repurposing them into
            something useful. Booth allowed students to learn about <Skill toggleable text="C"/>/<Skill toggleable text="C++"/> code
            and the <Skill toggleable text="Arduino"/> platform, navigate and race the robots through a track, and introduce a new, creative,
            intellectual, cheap, and fun hobby.
          </Text>
        </Post>
      </div>
    )
  }

  render() {
    const { extra } = this.props.menu;
    let jsx = this.renderResume();

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
        <div className="animated fadeIn" style={{...this.styles.container, paddingTop, marginBottom}}>
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

export default connect(mapStateToProps)(About);
