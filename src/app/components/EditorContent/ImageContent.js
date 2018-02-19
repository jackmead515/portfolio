import React, { Component } from 'react';

import FAIcon from 'react-fontawesome';
import Widgets from './Widgets';
import EditorInput from './EditorInput';

export default class ImageContent extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        backgroundColor: 'rgba(255, 153, 51, 0.7)',
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
          onClickSave({id, content})
        }}
        onClickEdit={() => this.setState({editing: true})}
        onClickMinus={() => onClickMinus({id, content})}
      />
    )
  }

  renderImage() {
    const { content } = this.state;
    return (
      <div style={{...this.styles.column}}>
        <EditorInput
          title="Enter in proper React inline styles in JSON form."
          placeholder="json-react inline styles..."
          style={{marginBottom: 5}}
          value={content.style ? content.style : '{}'}
          onChange={(e) => {
            let { content } = this.state;
            content.style = e.target.value;
            this.setState({content});
          }}

        />
        <textarea
          autoFocus
          placeholder="Image source..."
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
      return this.renderImage();
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
