import React, { Component } from 'react';
import { connect } from 'react-redux';

var FAIcon = require('react-fontawesome');

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
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

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.updateDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions());
  }

  renderFooterText() {
    const { iconColor } = this.props.theme;

    if(this.state.width < 450) return null;

    return (
      <div className="footer__text" style={{color: iconColor}}>Best in Chrome.</div>
    )
  }

  render() {
    const { backgroundColor, iconColor } = this.props.theme;

    return (
      <div className="footer__container" style={{backgroundColor}}>
        <button
          className="footer__button"
          onClick={() => {
            var win = window.open('https://stackoverflow.com/users/5132605/vocojax', '_blank');
            if(win) win.focus();
          }}
        >
          <FAIcon name='stack-overflow' style={{color: iconColor}}/>
        </button>

        <button
          className="footer__button"
          onClick={() => {
            var win = window.open('https://github.com/jackmead515', '_blank');
            if(win) win.focus();
          }}
        >
          <FAIcon name='github-square' style={{color: iconColor}}/>
        </button>

        <button
          className="footer__button"
          onClick={() => {
            var win = window.open('https://www.freecodecamp.org/jackmead515', '_blank');
            if(win) win.focus();
          }}
        >
          <FAIcon name='free-code-camp' style={{color: iconColor}}/>
        </button>

        <button
          className="footer__button"
          onClick={() => {
            var win = window.open('https://www.linkedin.com/in/jack-mead-687507a2/', '_blank');
            if(win) win.focus();
          }}
        >
          <FAIcon name='linkedin-square' style={{color: iconColor}}/>
        </button>

        <button
          className="footer__button"
          onClick={() => {
            var win = window.open('https://www.quora.com/profile/Jack-Mead-3', '_blank');
            if(win) win.focus();
          }}
        >
          <FAIcon name='quora' style={{color: iconColor}}/>
        </button>

        <button
          className="footer__button"
          onClick={() => {
            var win = window.open('https://www.youtube.com/channel/UCFXk8QukN7_GXBiuHMoXHLw', '_blank');
            if(win) win.focus();
          }}
        >
          <FAIcon name='youtube-square' style={{color: iconColor}}/>
        </button>

        {this.renderFooterText()}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { theme: state.menu.theme };
}

export default connect(mapStateToProps)(Footer);
