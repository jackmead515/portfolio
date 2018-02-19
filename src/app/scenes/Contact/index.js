import React, { Component } from 'react';

import Heading from '../../components/Heading';
import LinkRef from '../../components/LinkRef';
import Text from '../../components/Text';
import Image from '../../components/Image';
import Post from '../../components/Post';
import Border from '../../components/Border';

export default class Contact extends Component {
  constructor(props) {
    super(props);

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
        marginTop: 10,
        maxWidth: 900,
        display: 'flex',
        flexDirection: 'column',
      },
      row: {
        display: 'flex',
        flexDirection: 'row'
      }
    }
  }

  render() {
    return (
      <div className="animated fadeIn" style={{...this.styles.container}}>
        <div style={{...this.styles.post, padding: 5}}>
          {/*<form action="/" method="POST">
            <div
              className="g-recaptcha"
              data-sitekey="6LcF6D4UAAAAAPpfXZfE5SjkgDFvHWM1lhq-LEGa"
            ></div>
            <input type="submit" value="Submit"/>
          </form>*/}
        </div>
      </div>
    );
  }
}
