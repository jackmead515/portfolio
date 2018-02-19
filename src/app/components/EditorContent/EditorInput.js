import React, { Component } from 'react';

import FAIcon from 'react-fontawesome';

export default class EditorInput extends Component {
  render() {
    const { value, onChange, placeholder, style, title } = this.props;

    return (
      <div className="editor__content__inputcontainer">
        <div
          title={title}
          style={{
            paddingBottom: 5,
            marginRight: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <FAIcon name="question-circle-o" />
        </div>
        <input
          placeholder={placeholder}
          type="text"
          value={value}
          style={{...style}}
          className="editor__content__titleinput"
          onChange={(e) => onChange(e)}
        />
      </div>
    );
  }
}
