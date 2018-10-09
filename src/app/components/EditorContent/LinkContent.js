import React, { Component } from 'react';

import FAIcon from 'react-fontawesome';
import Widgets from './Widgets';

import editorColors from '../../styles/editorColors';

export default class CodeContent extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        border: '5px solid ' + editorColors.link,
      },
      column: {
        display: 'flex',
        flexDirection: 'column'
      }
    }

    this.state = {
      editing: false,
      content: props.content
    }
  }

  renderWidgets() {
    const { editing, content } = this.state;
    const { onClickMinus, onClickSave, id } = this.props;

    return (
      <Widgets
        editing={editing}
        onClickSave={() => {
          this.setState({editing: false});
          onClickSave({id, content});
        }}
        onClickEdit={() => this.setState({editing: true})}
        onClickMinus={() => onClickMinus({id, content})}
      />
    )
  }

  renderLink() {
    const { content } = this.state;
    return (
      <div style={{...this.styles.column}}>
        <input
          title="Enter in proper React inline styles in JSON form."
          placeholder="json-react inline style..."
          type="text"
          value={content.style ? content.style : '{}'}
          style={{marginBottom: 5}}
          className="editor__content__titleinput"
          onChange={(e) => {
            let { content } = this.state;
            content.style = e.target.value;
            this.setState({content});
          }}
        />
        <input
          placeholder="font awesome icon name..."
          type="text"
          value={content.icon}
          style={{marginBottom: 5}}
          className="editor__content__titleinput"
          onChange={(e) => {
            let { content } = this.state;
            content.icon = e.target.value;
            this.setState({content});
          }}
        />
        <input
          placeholder="title..."
          type="text"
          value={content.title}
          style={{marginBottom: 5}}
          className="editor__content__titleinput"
          onChange={(e) => {
            let { content } = this.state;
            content.title = e.target.value;
            this.setState({content});
          }}
        />
        <textarea
          placeholder="link..."
          autoFocus
          className="editor__content__textarea"
          value={content.content}
          onChange={(e) => {
            let { content } = this.state;
            content.content = e.target.value;
            this.setState({content});
          }}
        />
      </div>
    );
  }

  renderContent() {
    const { editing, content } = this.state;

    if(editing) {
      return this.renderLink();
    } else {
      return content.content;
    }
  }

  render() {
    return (
      <div className="editor__content" style={{...this.styles.container}}>
        <div className="editor__content__content">
          {this.renderContent()}
        </div>
        {this.renderWidgets()}
      </div>
    );
  }
}
