import React, { Component } from 'react';
import { connect } from 'react-redux';

var FAIcon = require('react-fontawesome');

class Support extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }

  render() {
    const { backgroundColor, iconColor } = this.props.theme;
    const { visible } = this.state;

    let classNames = "support__widgets__container"
    visible ? classNames += " animatedFast zoomIn" : classNames += " animatedFast zoomOut";

    return (
      <div>
        <div
          className="support__container"
          onClick={() => this.setState({visible: !this.state.visible})}>
          <FAIcon name="share-alt"/>
        </div>
        <div className={classNames} style={{backgroundColor}}>
          <FAIcon name="cc-paypal" style={{padding: 5, fontSize: 30, color: iconColor}}/>
          <FAIcon name="money" style={{padding: 5, fontSize: 30, color: iconColor}}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { theme: state.menu.theme };
}

export default connect(mapStateToProps)(Support);
