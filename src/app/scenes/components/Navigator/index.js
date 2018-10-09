import React, { Component } from 'react';
import { pushCommand, autoComplete } from './commandHandler';
import { changeTheme, refreshCommands } from '../../../actions/menu';
import { connect } from 'react-redux';

var FAIcon = require('react-fontawesome');

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      command: '',
      output: [],
      placeholder: this.getPlaceholder()
    }

    this.placeholderInterval = null;

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
      "What are you waiting for?",
      "Be bold.",
      "You can do it.",
      "May your query strike righteously.",
      "I live in the terminal...",
      "Commands be at your back.",
      "Tell me your secrets...",
      "May the query be with you.",
      "Are you jammin?",
      "I'm in the matrix..."
    ];

    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  appendCommand(command) {
    let { commands, commandIndex } = this.props.menu;
    if(commands.length > 5) {
      commands.shift()
    }
    commands.unshift(command);
    this.props.dispatch(refreshCommands(commandIndex, commands));
  }

  upCommand() {
    const { commandIndex, commands } = this.props.menu;
    if(commandIndex > commands.length-2) {
      this.setState({command: commands[commandIndex]});
    } else {
      this.props.dispatch(refreshCommands(commandIndex+1, commands));
      this.setState({command: commands[commandIndex]});
    }
  }

  downCommand() {
    const { commandIndex, commands } = this.props.menu;
    if(commandIndex <= 0) {
      this.props.dispatch(refreshCommands(0, commands));
      this.setState({command: commands[commandIndex], commandIndex: 0});
    } else {
      this.props.dispatch(refreshCommands(commandIndex-1, commands));
      this.setState({commandIndex: commandIndex-1, command: commands[commandIndex-1]});
    }
  }

  onEnterCommand(e) {
    const { commands } = this.props.menu;
    const { command } = this.state;
    const key = e.which || e.keyCode;

    if(key === 13) {
      //Enter
      if(pushCommand(command)) {
        this.appendCommand(command);
        this.props.dispatch(refreshCommands(0, commands));
        this.setState({command: ''});
      } else {
        //shake?
      }
    } else if(key === 38) {
      this.upCommand(); //Up Arrow
    } else if(key === 40) {
      this.downCommand(); //Down Arrow
    } else if(key === 9) {
        e.preventDefault();
        const cm = autoComplete(command);
        if(Array.isArray(cm)) {
          this.setState({output: cm});
        } else if(cm) {
          this.props.dispatch(refreshCommands(0, commands));
          this.setState({command: cm, output: []});
        }
    }
  }

  randomizeColors() {
    let { themeIndex } = this.props.menu.theme;
    themeIndex >= this.themes.length-1 ? themeIndex=0 : themeIndex+=1;
    const {textColor, backgroundColor, iconColor} = this.themes[themeIndex];
    this.props.dispatch(changeTheme({ textColor, backgroundColor, iconColor, themeIndex }));
  }

  renderOutput() {
    const { theme } = this.props.menu;
    let { output } = this.state;

    if(output.length > 0) {
      if(output.length > 30) { output = output.slice(0, 30); }
      output = output.map((o, i) => {
        if(i === output.length-1) {
          return ( <div className="navigator__output--option" style={{color: theme.textColor}}>{o}</div> )
        } else {
          return ( <div className="navigator__output--option" style={{color: theme.textColor}}>{o},</div> )
        }
      });
      return (
        <div className="navigator__output" style={{backgroundColor: theme.backgroundColor}}>
          {output}
        </div>
      );
    }
  }

  render() {
    const { theme } = this.props.menu;
    const { command } = this.state;

    return (
      <div className="navigator__container" style={{backgroundColor: theme.backgroundColor}}>
        <input
          className="navigator__input"
          value={command}
          type="text"
          max={500}
          maxLength={500}
          placeholder={">> " + this.state.placeholder}
          style={{backgroundColor: theme.backgroundColor, color: theme.textColor}}
          onChange={(e) => {
            this.props.dispatch(refreshCommands(0, this.props.menu.commands));
            this.setState({command: e.target.value, commandIndex: 0, output: []})
          }}
          onKeyDown={(e) => this.onEnterCommand(e)}
        />
      {this.renderOutput()}
        <button
          className="navigator__button"
          onClick={() => this.setState({command: '', commandIndex: 0, output: []})}
        >
          <FAIcon name="close" style={{fontSize: 28, color: theme.iconColor}}/>
        </button>
        <button
          style={{paddingTop: 3, marginRight: 10}}
          className="navigator__button"
          onClick={() => this.randomizeColors()}
        >
          <FAIcon name="tint" style={{fontSize: 28, color: theme.iconColor}}/>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Navigator);
