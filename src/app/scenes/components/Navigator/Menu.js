import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { history } from '../../../../index.js';
import { navigate, toggleMenu } from '../../../actions/menu';
var FAIcon = require('react-fontawesome');

class Menu extends Component {
  render() {
    const { opened, theme } = this.props.menu;
    const { backgroundColor, iconColor } = theme;

    let itemClassNames = "navigator__menu__item animatedFast";
    let wrapperClassNames = "navigator__menu animatedFast";
    itemClassNames = opened ? itemClassNames.concat(' bounceInLeft') : itemClassNames.concat(' bounceOutLeft');
    wrapperClassNames = opened ? wrapperClassNames.concat(' fadeIn') : wrapperClassNames.concat(' fadeOut');

    return (
        <div className={wrapperClassNames} style={{backgroundColor}}>

          <button
            data-tip="React-tooltip"
            data-for="home-tooltip"
            id="navigator-home-item"
            className={itemClassNames}
            onClick={() => {
              this.props.dispatch(toggleMenu(false));
              history.push('/home');
            }}
          >
            <FAIcon name="home" style={{color: iconColor}} />
          </button>
          <ReactTooltip id="home-tooltip" place="bottom" type="dark" effect="float">
            <span>Home</span>
          </ReactTooltip>


          <button
            data-tip="React-tooltip"
            data-for="about-tooltip"
            id="navigator-home-item"
            className={itemClassNames}
            onClick={() => {
              this.props.dispatch(toggleMenu(false));
              history.push('/about');
            }}
          >
            <FAIcon name="child" style={{color: iconColor}} />
          </button>
          <ReactTooltip id="about-tooltip" place="bottom" type="dark" effect="float">
            <span>About</span>
          </ReactTooltip>


          <button
            data-tip="React-tooltip"
            data-for="projects-tooltip"
            id="navigator-home-item"
            className={itemClassNames}
            onClick={() => {
              this.props.dispatch(toggleMenu(false));
              history.push('/projects');
            }}
          >
            <FAIcon name="code" style={{color: iconColor}} />
          </button>
          <ReactTooltip id="projects-tooltip" place="bottom" type="dark" effect="float">
            <span>Projects</span>
          </ReactTooltip>

          <button
            data-tip="React-tooltip"
            data-for="guides-tooltip"
            id="navigator-home-item"
            className={itemClassNames}
            onClick={() => {
              this.props.dispatch(toggleMenu(false));
              history.push('/guides');
            }}
          >
            <FAIcon name="book" style={{color: iconColor}} />
          </button>
          <ReactTooltip id="guides-tooltip" place="bottom" type="dark" effect="float">
            <span>Guides</span>
          </ReactTooltip>


          <button
            data-tip="React-tooltip"
            data-for="contact-tooltip"
            id="navigator-home-item"
            className={itemClassNames}
            onClick={() => {
              this.props.dispatch(toggleMenu(false));
              history.push('/contact');
            }}
          >
            <FAIcon name="envelope" style={{color: iconColor}} />
          </button>
          <ReactTooltip id="contact-tooltip" place="bottom" type="dark" effect="float">
            <span>Contact</span>
          </ReactTooltip>


          <button
            data-tip="React-tooltip"
            data-for="help-tooltip"
            id="navigator-home-item"
            className={itemClassNames}
            onClick={() => {
              this.props.dispatch(toggleMenu(false));
              history.push('/help');
            }}
          >
            <FAIcon name="question-circle" style={{color: iconColor}} />
          </button>
          <ReactTooltip id="help-tooltip" place="bottom" type="dark" effect="float">
            <span>Help</span>
          </ReactTooltip>


        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Menu);
