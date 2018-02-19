import React, { Component } from 'react';
import { connect } from 'react-redux';

class Skill extends Component {
  constructor(props) {
      super(props);

      this.interval = null;

      this.styles = {
        container: {
          textDecoration: 'none',
          margin: 0,
          padding: 4,
          fontSize: 15
        }
      }

      this.state = {
        color: 'black',
        fontWeight: 'normal',
      }

      this.colors = {
        index: 0,
        colors: [ 'red','green','blue','yellow' ]
      }
  }

  delayToggleColorChange() {
    setTimeout(() => {
       this.toggleColorChange();
    }, Math.floor((Math.random() * 600) + 1))
  }

  componentWillUnMount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.menu.skills !== this.props.menu.skills) {
      this.toggleColorChange();
    }
  }

  toggleColorChange() {
    if(this.interval === null) {
      this.setState({fontWeight: 'bold'});
      this.interval = setInterval(() => {
        let { index, colors } = this.colors;
        index = index >= colors.length-1 ? 0 : index+1;
        this.colors.index = index;

        this.setState({color: colors[index]});
      }, Math.floor((Math.random() * 600) + 100));
    } else {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({color: 'black', fontWeight: 'normal'});
    }
  }

  render() {
    const { toggleable, text } = this.props;
    const { color, fontWeight } = this.state;

    return (
      <a
        className="content__skill"
        style={{
          ...this.props.style,
          ...this.styles.container,
          color,
          fontWeight
        }}
        onClick={() => this.toggleColorChange()}
      >
        {text}
      </a>
    );
  }
}

const mapStateToProps = (state) => {
  return { menu: state.menu };
}

export default connect(mapStateToProps)(Skill);
