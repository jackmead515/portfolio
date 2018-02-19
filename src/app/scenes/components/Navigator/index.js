import React, { Component } from 'react';
import commandHandler from './commandHandler';
import { toggleMenu, changeTheme, navigate } from '../../../actions/menu';
import { connect } from 'react-redux';

var FAIcon = require('react-fontawesome');

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commandIndex: 0,
      commands: [],
      command: '',
      placeholder: this.getPlaceholder()
    }

    this.placeholderInterval = null;

    this.styles = {
      icon: { fontSize: 28 }
    }

    this.themes = [
      {
        textColor: 'black',
        backgroundColor: 'white',
        iconColor: 'black'
      },
      {
        textColor: '#00e600',
        backgroundColor: '#d9d9d9',
        iconColor: '#005c99'
      },
      {
        textColor: '#b30000',
        backgroundColor: '#b3d9ff',
        iconColor: '#269900'
      },
      {
        textColor: 'white',
        backgroundColor: 'black',
        iconColor: 'white'
      }
    ];
  }

  componentDidMount() {
    this.placeholderInterval = setInterval(() => {
      this.setState({placeholder: this.getPlaceholder()});
    }, 8000);
  }

  componentWillUnMount() {
    clearInterval(this.placeholderInterval);
  }

  getPlaceholder() {
    const phrases = [
      "Click the question in the menu for help.",
      "What are you waiting for?",
      "Be bold.",
      "You can do it.",
      "May your query strike righteously.",
      "Commands be at your back.",
      "Tell me your secrets..."
    ];

    return phrases[Math.floor(Math.random() * 7)];
  }

  appendCommand(command) {
    const { commands } = this.state;
    commands.length > 5 ? commands.shift() : null;
    commands.unshift(command);
  }

  upCommand() {
    const { commandIndex, commands } = this.state;
    if(commandIndex > commands.length-2) {
      this.setState({command: commands[commandIndex]});
    } else {
      this.setState({commandIndex: commandIndex+1, command: commands[commandIndex]});
    }
  }

  downCommand() {
    const { commandIndex, commands } = this.state;
    if(commandIndex <= 0) {
      this.setState({command: commands[commandIndex], commandIndex: 0});
    } else {
      this.setState({commandIndex: commandIndex-1, command: commands[commandIndex-1]});
    }
  }

  onEnterCommand(key) {
    if(key.which === 13) {
      //Enter
      const { command } = this.state;
      if(commandHandler(command)) {
        this.appendCommand(command);
        this.setState({command: '', commandIndex: 0});
      } else {
        //shake?
      }
    } else if(key.which === 38) {
      //Up Arrow
      this.upCommand();
    } else if(key.which === 40) {
      //Down Arrow
      this.downCommand();
    }
  }

  randomizeColors() {
    let { themeIndex } = this.props.menu.theme;
    themeIndex >= this.themes.length-1 ? themeIndex=0 : themeIndex+=1;
    const {textColor, backgroundColor, iconColor} = this.themes[themeIndex];
    this.props.dispatch(changeTheme({ textColor, backgroundColor, iconColor, themeIndex }));
  }

  render() {
    const { theme } = this.props.menu;
    const { command } = this.state;

    return (
      <div className="navigator__container" style={{backgroundColor: theme.backgroundColor}}>
        <button
          className="navigator__button"
          onClick={() => this.props.dispatch(toggleMenu(!this.props.menu.opened))}
        >
          <FAIcon name="bars" style={{...this.styles.icon, color: theme.iconColor}}/>
        </button>
        <input
          className="navigator__input"
          value={command}
          type="text"
          max={500}
          maxLength={500}
          placeholder={">> " + this.state.placeholder}
          style={{backgroundColor: theme.backgroundColor, color: theme.textColor}}
          onChange={(e) => this.setState({command: e.target.value, commandIndex: 0})}
          onKeyDown={(key) => this.onEnterCommand(key)}
        />
          <button
            className="navigator__button"
            onClick={() => this.setState({command: '', commandIndex: 0})}
          >
            <FAIcon name="close" style={{...this.styles.icon, color: theme.iconColor}}/>
          </button>
          <button
            style={{paddingTop: 3}}
            className="navigator__button"
            onClick={() => this.randomizeColors()}
          >
            <FAIcon name="tint" style={{...this.styles.icon, color: theme.iconColor}}/>
          </button>
          <div
            style={{
              marginLeft: 8,
              marginRight: 8,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div
              className="g-ytsubscribe"
              data-channelid="UCFXk8QukN7_GXBiuHMoXHLw"
              data-layout="default"
              data-count="hidden"
            ></div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Navigator);
