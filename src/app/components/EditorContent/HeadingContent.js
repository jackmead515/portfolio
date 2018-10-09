import React, { Component } from 'react';
import moment from 'moment';

import Widgets from './Widgets';
import EditorInput from './EditorInput';

export default class CodeContent extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        border: '5px solid black',
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
      tagsString: props.content.tags ? props.content.tags.join(" ") : '',
      head: props.content
    }
  }

  componentWillMount() {
    let { head } = this.state;
    let time = moment(head.date.time).valueOf();
    head.date.time = isNaN(time) ? 'null' : time;
    this.setState({head});
  }

  renderWidgets() {
    const { editing, head } = this.state;
    const { onClickSave } = this.props;

    return (
      <Widgets
        required
        editing={editing}
        onClickSave={() => {
          let { head, tagsString } = this.state;
          let tags = tagsString ? tagsString.trim().replace(/\s/g, " ").split(" ") : [];
          head.tags = tags;
          this.setState({editing: false, head}, () => {
            onClickSave(this.state.head)
          });
        }}
        onClickEdit={() => this.setState({editing: true})}
        onClickMinus={() => {}}
      />
    )
  }

  renderHeading() {
    const { head, tagsString } = this.state;
    return (
      <div style={{...this.styles.column}}>
        <div className="row" style={{padding: 5}}>
          <input
            type={"checkbox"}
            checked={head.private}
            onChange={(e) => {
              let { head } = this.state;
              head.private = e.target.checked;
              this.setState({head})
            }}
          />
          <div>Private</div>
        </div>
        <EditorInput
          title="Seperate tags by spaces"
          placeholder="Programming Science Javascript Travel ..."
          value={tagsString}
          style={{marginBottom: 5}}
          onChange={(e) => this.setState({tagsString: e.target.value})}
        />
        <EditorInput
          title="Format must be: mm/dd/yyyy"
          type="date"
          value={moment(head.date.time).format('YYYY-MM-DD')}
          style={{marginBottom: 5}}
          onChange={(e) => {
            let { head } = this.state;
            let time = moment(e.target.value).valueOf();
            head.date.time = isNaN(time) ? 'null' : time;
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
