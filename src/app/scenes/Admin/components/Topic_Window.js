import React, { Component } from 'react';
import FAIcon from 'react-fontawesome';

export default class Topic_Window extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      icon: {
        paddingLeft: 10,
        paddingRight: 10,
        color: 'white',
        fontSize: 15
      },
      heading: {
        color: 'white',
        fontWeight: 'bold',
        paddingRight: 10
      }
    }
  }

  render() {
    const { title, onClickEdit } = this.props;

    return (
      <div className="console__guidewindow" style={{...this.props.style, ...this.styles.container}}>
        <div className="console__guidewindow__button" onClick={() => onClickEdit()} title="Edit">
            <FAIcon name="edit" style={{...this.styles.icon}}/>
        </div>
        <div style={{...this.styles.heading}}>{title}</div>
      </div>
    );
  }
}
