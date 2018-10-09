import React, { Component } from 'react';
import axios from 'axios';

import Fetch from '../util/Fetch.js';

import { SERVERIP } from '../../index.js';
import moment from 'moment';

import Date from './Date';
import LinkRef from './LinkRef';
import DropDown from './DropDown';
import Text from './Text';
import Image from './Image';
import Video from './Video';
import Code from './Code';
import HTML from './HTML';

var FAIcon = require('react-fontawesome');

export default class Guide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showShareButtons: false,
      commentAmount: null,
      tracking: null
    }
  }

  componentWillMount() {
    const { guide } = this.props;

    Fetch.commentAmount(guide.searchTitle).then((amount) => {
      this.setState({commentAmount: {amount}});
    });

    Fetch.guideTracking(guide.searchTitle).then((tracking) => {
      this.setState({tracking});
    });
  }

  renderContent() {
    const { guide } = this.props;

    if(!guide.content) { return null; }

    return guide.content.map((c, index) => {
      let style = {};
      if(c.style) {
        try {
          style = JSON.parse(c.style);
        } catch(e) { /*must be a pure json string!*/ }
      }

      if(c.type === "text") {
        return (
          <Text
            key={"text-" + index}
            style={style}
          >
            {c.content}
          </Text>
        )
      } else if(c.type === "code") {
        return (
          <Code
            style={style}
            key={"code-" + index}
          >
            {c.content}
          </Code>
        )
      } else if(c.type === "link") {
        return (
          <LinkRef
            key={"link-" + index}
            icon={c.icon}
            style={style}
            link={c.content}
            title={c.title}
            onClickLink={(clicked) => {
              if(!clicked) axios.post('tracking/clicked_link', {searchTitle: guide.searchTitle});
            }}
          />
        )
      } else if(c.type === "image"){
        return (
          <Image
            key={"image-" + index}
            source={c.content}
            style={style}
          />
        )
      } else if(c.type === "video") {
        return (
          <Video
            key={"video-" + index}
            source={c.content}
            style={style}
          />
        )
      } else if(c.type === "html") {
        return (
          <HTML
            key={"html-" + index}
            content={c.content}
            style={style}
          />
        )
      } else {
        return null;
      }
    });
  }

  renderImage() {
    const { guide } = this.props;

    if(guide.image) {
      return <img src={guide.image.content} className="guide__titleimage" alt=""/>
    } else {
      return null;
    }
  }

  renderTitle() {
    const { guide, mobile, titleLink } = this.props;

    let imageComponent = this.renderImage();

    let tLink = titleLink ? titleLink :  (SERVERIP + "/g/" + guide.searchTitle);

    let heading = null;
    if(!guide.content) {
      heading = (
        <a href={tLink} className="guide__title__link">
          <div className="guide__title">{guide.head.heading}</div>
        </a>
      );
    } else {
      heading = <h1 className="guide__title">{guide.head.heading}</h1>;
    }

    if(!mobile && imageComponent) {
      return (
        <div className="guide__titleimage__container">
          <div style={{marginRight: 20}}>
            {heading}
            <h2 className="guide__subtitle">{guide.head.subHeading}</h2>
          </div>
          {imageComponent}
        </div>
      );
    } else {
      return (
        <div className="guide__title__container">
          {heading}
          <h2 className="guide__subtitle">{guide.head.subHeading}</h2>
        </div>
      )
    }
  }

  renderAnalytics() {
    const { commentAmount, tracking } = this.state;

    if(tracking && commentAmount) {
      return (
        <div className="row guide__analytics" style={{marginBottom: 10}}>
          {tracking.views}<FAIcon name="eye" style={{marginRight: 10, marginLeft: 5}}/>
          {tracking.searches}<FAIcon name="search" style={{marginRight: 10, marginLeft: 5}}/>
          {tracking.links}<FAIcon name="link" style={{marginRight: 10, marginLeft: 5}}/>
          {commentAmount.amount}<FAIcon name="comments" style={{marginLeft: 5}}/>
        </div>
      );
    }
  }

  renderShareButtons() {
    const { showShareButtons } = this.state;
    const { guide, mobile } = this.props;

    if(showShareButtons || mobile) {
      return (
        <div className="row" style={{marginLeft: 20}}>
          <a style={{marginRight: 10}} href={"https://twitter.com/share?url=" + SERVERIP + "/g/" + guide.searchTitle + "&amp;text=" + guide.head.heading + "&amp;hashtags=speblog"} target="_blank" rel="noopener noreferrer">
            <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" className="guide__sharebutton__img"/>
          </a>
          <a style={{marginRight: 10}} href={"http://reddit.com/submit?url=" + SERVERIP + "/g/" + guide.searchTitle + "&amp;title=" + guide.head.heading} target="_blank" rel="noopener noreferrer">
            <img src="https://simplesharebuttons.com/images/somacro/reddit.png" alt="Reddit" className="guide__sharebutton__img"/>
          </a>
          <a href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com" target="_blank" rel="noopener noreferrer">
            <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" className="guide__sharebutton__img"/>
          </a>
        </div>
      );
    }
  }

  renderDate() {
    const { time } = this.props.guide.head.date;

    let displayTime = null;
    let newDate = null;
    let t = moment(time);
    let n = moment().diff(t);

    displayTime = t.format('MMMM Do, YYYY');

    if(n < 432000000) {
        newDate = <span style={{color: '#00e600', fontWeight: 'bold'}}>{'*NEW* '}</span>
    }

    return (
      <div className="guide__date">
        {newDate}{displayTime}
      </div>
    );

  }

  render() {
    const { guide, style } = this.props;

    return (
      <div
        className="guide__container"
        style={{...style}}
      >
        {this.renderAnalytics()}
        <div className="row">
          {this.renderDate()}
          {this.renderShareButtons()}
        </div>
        {this.renderTitle()}
        {this.renderContent()}
      </div>
    );
  }
}
