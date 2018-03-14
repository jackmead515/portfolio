import React, { Component } from 'react';
import FAIcon from 'react-fontawesome';
import moment from 'moment';

export default class Guide_Window extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      widgets: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px dashed white',
        paddingBottom: 5,
        marginBottom: 5
      },
      subwidgets: {
        display: 'flex'
      },
      icon: {
        paddingLeft: 10,
        paddingRight: 10,
        color: 'white',
        fontSize: 15
      },
      time: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13
      },
      heading: {
        color: 'white',
        fontWeight: 'bold'
      }
    }
  }

  render() {
    const { heading, time, onClickEdit, onClickGraph } = this.props;

    return (
      <div className="console__guidewindow" style={{...this.props.style}}>
        <div style={{...this.styles.widgets}}>
          <div style={{...this.styles.subwidgets}}>
            <div className="console__guidewindow__button" onClick={() => onClickEdit()} title="Edit">
                <FAIcon name="edit" style={{...this.styles.icon}}/>
            </div>
            <div className="console__guidewindow__button" onClick={() => onClickGraph()} title="Analytics">
                <FAIcon name="bar-chart" style={{...this.styles.icon}}/>
            </div>
          </div>
          <div style={{...this.styles.time}}>{'[ ' + moment(time).format('MM-DD-YYYY') + ' ]'}</div>
        </div>
        <div style={{...this.styles.heading}}>{heading}</div>
      </div>
    );
  }
}
