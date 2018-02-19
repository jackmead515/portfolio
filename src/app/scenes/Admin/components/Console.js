import React, { Component } from 'react';
import { connect } from 'react-redux';
import Authenticator from '../Authenticator';
import AdminNavigator from './AdminNavigator';
import { navigateAdmin } from '../../../actions/menu';
import { refreshGuides, refreshTracking } from '../../../actions/guides';
import Loading from '../../../components/Loading';
import Guide_Window from './Guide_Window';
import PieGraph from '../../../components/PieGraph';
import LineGraph from '../../../components/LineGraph';

import axios from 'axios';
import FAIcon from 'react-fontawesome';

import * as d3 from 'd3';
import _ from 'lodash';

class Console extends Authenticator {
  constructor(props) {
    super(props);

    this.state = {
      guides: [],
      tracking: [],
      loading: true
    }
  }

  componentWillMount() {
    this.refreshGuides();
  }

  createGuideTemplate() {
    return {
        searchTitle: "my-heading",
        head: {
          date: {
            time: "12/12/12",
          },
          heading: "My Heading",
          subHeading: "My Sub Heading",
        },
        content: [
          {
              type: "text",
              content: "Text...",
              style: "{}"
          },
          {
              type: "code",
              content: "function code() {}",
              style: "{}"
          },
          {
              type: "link",
              content: "www.somelink.com",
              icon: "external-link-square",
              title: "My Link",
              style: "{}"
          },
          {
              type: "image",
              content: "url/to/image.jpg",
              style: "{\"marginTop\": 10, \"marginBottom\": 10}",
          },
          {
              type: "video",
              content: "https://www.youtube.com/embed/somevideo",
              style: "{\"marginTop\": 10, \"marginBottom\": 10}",
          }
        ]
    }
  }

  refreshGuides() {
    this.setState({loading: true});
    axios.post('/guides').then((res) => {
      if(res.data.status === 200) {

        this.props.dispatch(refreshGuides(res.data.guides));
        this.setState({guides: res.data.guides});

        axios.post('/tracking/get_tracking').then((res) => {
          if(res.data.status === 200) {

            let { tracking } = res.data;

            tracking = tracking.map((g) => {
              return {
                heading: g.head.heading,
                links: g.activeLinks,
                views: g.activeViews,
                searches: g.activeSearches
              };
            });

            this.props.dispatch(refreshTracking(tracking));

            this.setState({loading: false});

          } else {
            Promise.reject('Server Error');
          }
        }).catch((err) => {
          Promise.reject('Server Error');
        });
      } else {
        Promise.reject('Server Error');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  renderGuides() {
    const { guides } = this.state;

    let data =  guides.map((guide, index) => {
      return (
        <Guide_Window
          key={"guide-" + index}
          heading={guide.head.heading}
          time={guide.head.date.time}
          onClickEdit={() => this.props.dispatch(navigateAdmin('EDITOR', guide))}
          onClickGraph={() => this.props.dispatch(navigateAdmin('GRAPHS', guide))}
        />
      );
    });

    return (
      <div style={{marginTop: 20}}>
        <button
          style={{marginLeft: 5}}
           className="adminnavigator__button"
           onClick={() => this.props.dispatch(navigateAdmin('EDITOR', this.createGuideTemplate()))}
        >
           New Guide<FAIcon name="new" style={{marginLeft: 5}}/>
        </button>
        <div style={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>
          {data}
        </div>
      </div>
    );
  }

  renderGraphs() {
    let { data } = this.props.guides.tracking;

    return (
          <div style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 20
          }}>
            <PieGraph
              style={{marginRight: 10}}
              divId='viewed-graphs'
              element='views'
              data={data}
              title='Top 10 Viewed Guides'
            />
            <PieGraph
              style={{marginRight: 10}}
              divId='linked-graphs'
              element='links'
              data={data}
              title='Top 10 Linked Guides'
            />
            <PieGraph
              style={{marginRight: 10}}
              divId='searches-graphs'
              element='searches'
              data={data}
              title='Top 10 Searched Guides'
            />
          </div>
      );
  }

  filterGuides(key, value) {
    if(key.which === 13) {
      let { guides } = this.state;

      let results = guides.filter((g) => {
          let r = new RegExp(value, 'g');
          return r.test(g.head.heading) && !r.test(g.head.subHeading)
      });

      console.log(results);

      this.setState({guides: results});
    }
  }

  render() {
    if(!this.state.authenticated) return <div></div>

    let jsx = <Loading scaler={2} />
    if(!this.state.loading) {
      jsx = (
        <div>
          {this.renderGraphs()}
          {this.renderGuides()}
        </div>
      );
    }

    return (
      <div className="console__container">
        <AdminNavigator
          onClickLogOut={() => this.logout()}
          onClickBack={() => this.logout()}
          onEnterSearch={(key, value) => {
            this.filterGuides(key, value);
          }}
        />
        <div className="console__wrapper animatedFast slideInLeft">
          {jsx}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(Console);
