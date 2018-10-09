import React, { Component } from 'react';

export default class FeedGuideAd extends Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  render() {
    return (
      <div style={{...this.props.style}}>
        <ins className="adsbygoogle"
             style={{display: "block"}}
             data-ad-format="fluid"
             data-ad-layout-key="-fb+5w+4e-db+86"
             data-ad-client="ca-pub-2478872111392737"
             data-ad-slot="2888784113"></ins>
      </div>
    );
  }
}
