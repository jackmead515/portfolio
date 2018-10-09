import React, { Component } from 'react';

import FAIcon from 'react-fontawesome';
import Widgets from './Widgets';
import EditorInput from './EditorInput';

export default class TopicContent extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        border: '5px solid black',
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
    const { onClickSave } = this.props;

    return (
      <Widgets
        required
        editing={editing}
        onClickSave={() => {
          this.setState({editing: false});
          onClickSave(content);
        }}
        onClickEdit={() => this.setState({editing: true})}
        onClickMinus={() => {}}
      />
    )
  }

  renderTopic() {
    const { content } = this.state;
    return (
      <div style={{...this.styles.column}}>
        <EditorInput
          title="Enter in a uniqe Topic title"
          placeholder="Programming, AI, Science..."
          value={content ? content : ''}
          onChange={(e) => {
            let { content } = this.state;
            content = e.target.value;
            this.setState({content});
          }}
          style={{marginBottom: 5}}
        />
      </div>
    );
  }

  renderContent() {
    const { editing, content } = this.state;

    if(editing) {
      return this.renderTopic();
    } else {
      return content;
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
