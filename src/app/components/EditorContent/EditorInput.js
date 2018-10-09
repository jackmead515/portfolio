import React, { Component } from 'react';

import FAIcon from 'react-fontawesome';

export default class EditorInput extends Component {
  render() {
    const { value, onChange, onEnter, placeholder, style, title, type } = this.props;

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
          type={type ? type : "text"}
          value={value}
          style={{...style}}
          className="editor__content__titleinput"
          onChange={(e) => onChange ? onChange(e): null}
          onKeyDown={(e) => {
            if(e.which === 13 && onEnter) {
              onEnter(e);
            }
          }}
        />
      </div>
    );
  }
}
