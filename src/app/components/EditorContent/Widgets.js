import React, { Component } from 'react';

import FAIcon from 'react-fontawesome';

export default class Widgets extends Component {
  render() {
    const {
      editing,
      onClickSave,
      onClickEdit,
      onClickMinus,
      required
    } = this.props;

    let deleteButton = null;
    if(!required) {
      deleteButton = (
        <button
          className="editor__content__button"
          onClick={() => onClickMinus()}
        >
            Delete<FAIcon name="trash" style={{marginLeft: 5}}/>
        </button>
      )
    }


    if(editing) {
      return (
        <div className="editor__content__button__container">
          <button
             className="editor__content__button"
             onClick={() => onClickSave()}
          >
             Save<FAIcon name="save" style={{marginLeft: 5}}/>
          </button>
        </div>
      )
    } else {
      return (
        <div className="editor__content__button__container">
          <button
             className="editor__content__button"
             onClick={() => onClickEdit()}
          >
             Edit<FAIcon name="edit" style={{marginLeft: 5}}/>
          </button>
          {deleteButton}
        </div>
      )
    }
  }
}
