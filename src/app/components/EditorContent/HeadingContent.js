import React, { Component } from 'react';

import FAIcon from 'react-fontawesome';
import Widgets from './Widgets';
import EditorInput from './EditorInput';

export default class CodeContent extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
      },
      column: {
        display: 'flex',
        flexDirection: 'column'
      },
      row: {
        display: 'flex'
      }
    }

    this.state = {
      editing: false,
      head: props.content
    }
  }

  renderWidgets() {
    const { editing, head } = this.state;
    const { onClickSave } = this.props;

    return (
      <Widgets
        required
        editing={editing}
        onClickSave={() => {
          this.setState({editing: false});
          onClickSave(head)
        }}
        onClickEdit={() => this.setState({editing: true})}
        onClickMinus={() => {}}
      />
    )
  }

  renderHeading() {
    const { head } = this.state;
    return (
      <div style={{...this.styles.column}}>
        <EditorInput
          title="Format must be: mm/dd/yy"
          placeholder="Date..."
          value={head.date.time}
          style={{marginBottom: 5}}
          onChange={(e) => {
            let { head } = this.state;
            head.date.time = e.target.value;
            this.setState({head})
          }}
        />
        <EditorInput
          title="Heading of the guide"
          placeholder="Heading..."
          style={{marginBottom: 5}}
          value={head.heading}
          onChange={(e) => {
            let { head } = this.state;
            head.heading = e.target.value;
            this.setState({head})
          }}
        />
        <EditorInput
          title="Sub heading of the guide"
          placeholder="Sub-Heading..."
          value={head.subHeading}
          onChange={(e) => {
            let { head } = this.state;
            head.subHeading = e.target.value;
            this.setState({head})
          }}
        />
      </div>
    );
  }

  renderContent() {
    const { editing, head } = this.state;

    if(editing) {
      return this.renderHeading();
    } else {
      return head.heading;
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
