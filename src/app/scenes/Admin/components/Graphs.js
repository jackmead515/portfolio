import React, { Component } from 'react';
import { connect } from 'react-redux';
import Authenticator from '../Authenticator';
import AdminNavigator from './AdminNavigator';
import { navigateAdmin } from '../../../actions/menu';
import { refreshTracking } from '../../../actions/guides';
import Loading from '../../../components/Loading';
import Guide_Window from './Guide_Window';

import axios from 'axios';
import FAIcon from 'react-fontawesome';

import PieGraph from '../../../components/PieGraph';
import ScatterGraph from '../../../components/ScatterGraph';
import LineGraph from '../../../components/LineGraph';

import * as d3 from 'd3';
import _ from 'lodash';

class Graphs extends Authenticator {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      guide: props.menu.admin.extra,
      tracking: null
    }

    this.styles = {
      container: {
        display: 'flex',
        flexDirection: 'column'
      },
      heading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
      },
      graphContainer: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: 500
      },
      graph: {
        margin: 5
      },
      graphHeading: {
        fontSize: 20,
        color: 'white',
        borderBottom: '1px dashed white',
        paddingBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        marginTop: 10
      }
    }
  }

  componentWillMount() {
    const { data } = this.props.guides.tracking;
    const { guide } = this.state;

    let tracking = null;
    for(let i = 0; i < data.length; i++) {
      if(guide.head.heading === data[i].heading) {
        tracking = data[i]; break;
      }
    }

    this.setState({tracking});
  }

  renderViews() {
    const { tracking } = this.state;

    return (
      <div>
        <div style={{...this.styles.graphHeading}}>
          View Count
        </div>
        <div style={{...this.styles.graphContainer}}>
          <ScatterGraph
            style={{...this.styles.graph}}
            divId={'tracking-views-scatter'}
            data={tracking}
            element={'views'}
          />
          <LineGraph
            style={{...this.styles.graph}}
            divId={'tracking-views-line'}
            data={tracking}
            element={'views'}
          />
        </div>
      </div>
    );
  }

  renderLinks() {
    const { tracking } = this.state;

    return (
      <div>
        <div style={{...this.styles.graphHeading}}>
          Clicked Links Count
        </div>
        <div style={{...this.styles.graphContainer}}>
          <ScatterGraph
            style={{...this.styles.graph}}
            divId={'tracking-links-scatter'}
            data={tracking}
            element={'links'}
          />
          <LineGraph
            style={{...this.styles.graph}}
            divId={'tracking-links-line'}
            data={tracking}
            element={'links'}
          />
        </div>
      </div>
    );
  }

  renderSearches() {
    const { tracking } = this.state;

    return (
      <div>
        <div style={{...this.styles.graphHeading}}>
          Searches Count
        </div>
        <div style={{...this.styles.graphContainer}}>
          <ScatterGraph
            style={{...this.styles.graph}}
            divId={'tracking-searches-scatter'}
            data={tracking}
            element={'searches'}
          />
          <LineGraph
            style={{...this.styles.graph}}
            divId={'tracking-searches-line'}
            data={tracking}
            element={'searches'}
          />
        </div>
      </div>
    );
  }

  renderGraphs() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {this.renderViews()}
        {this.renderLinks()}
        {this.renderSearches()}
      </div>
    );
  }

  render() {
    if(!this.state.authenticated) return <div></div>

    let jsx = <Loading scaler={2} />
    if(!this.state.loading) {
      jsx = this.renderGraphs();
    }

    return (
      <div className="console__container">
        <AdminNavigator
          onClickBack={() => this.props.dispatch(navigateAdmin('CONSOLE'))}
          onClickLogOut={() => this.logout()}
          onEnterSearch={(key, value) => {
            console.log(value);
          }}
        />
        <div className="console__wrapper animatedFast slideInLeft">
          <div style={{...this.styles.container}}>
            <div style={{...this.styles.heading}}>
              {this.state.guide.head.heading}
            </div>
            {jsx}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Graphs);
