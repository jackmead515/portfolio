import React, { Component } from 'react';
import axios from 'axios';

import { SERVERIP } from '../../index.js';

import Date from './Date';
import LinkRef from './LinkRef';
import DropDown from './DropDown';
import Heading from './Heading';
import Text from './Text';
import Image from './Image';
import Video from './Video';
import Code from './Code';
import ShareButton from './ShareButton';

export default class Guide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
    }
  }

  renderContent() {
    const { guide } = this.props;

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
              if(!clicked) axios.post('tracking/clicked_link', {_id: guide._id});
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
      } else {
        return null;
      }
    });
  }

  render() {
    const { guide, style, doNotTrack } = this.props;

    return (
      <div className="guide__container" style={{...style}}>
        <div className="guide__date-share__container">
          <Date heading={guide.head.date.heading} time={guide.head.date.time} displayNew />
          <ShareButton
            style={{marginLeft: 10}}
            link={"http://" + SERVERIP + "/guides/g/" + guide.head.heading.replace(/\s/g, '-').toLowerCase()}
          />
        </div>
        <div className="guide__title__container">
          <div className="guide__title">{guide.head.heading}</div>
          <div className="guide__subtitle">{guide.head.subHeading}</div>
        </div>
        <DropDown
          opened={this.state.opened}
          onClick={(clicked) => {
            if(!clicked && !doNotTrack) axios.post('tracking/view_guide', {_id: guide._id});
          }}
        >
          {this.renderContent()}
        </DropDown>
      </div>
    );
  }
}
