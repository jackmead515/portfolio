import React, { Component } from 'react';
import { connect } from 'react-redux';
import FAIcon from 'react-fontawesome';
import axios from 'axios';

import Authenticator from '../Authenticator';
import AdminNavigator from './AdminNavigator';
import { navigateAdmin } from '../../../actions/menu';
import Loading from '../../../components/Loading';

import TopicContent from '../../../components/EditorContent/TopicContent.js';
import TGuide_Window from './TGuide_Window';

class TopicEditor extends Authenticator {
  constructor(props) {
    super(props);

    let topic = props.menu.admin.extra;

    this.state = {
      loading: false,
      topic,
      title: topic.title,
      guidesInTopic: topic.guides,
      guides: props.guides.guides.data
    }
  }

  renderGuides() {
    return this.state.guides.map((g, i) => {
      return (
        <TGuide_Window
          key={'guide-' + i}
          icon="plus"
          guide={g}
          title={g.head ? g.head.heading : g.heading}
          onClickAdd={(guide) => {
            let { guidesInTopic, guides } = this.state;

            guidesInTopic.push({
              heading: g.head ? g.head.heading : g.heading,
              searchTitle: guide.searchTitle,
              guideId: guide.guideId ? guide.guideId : guide._id
            })

            guides = guides.filter((gd) => {
              let gdId = gd.guideId ? gd.guideId : gd._id;
              let id = guide.guideId ? guide.guideId : guide._id;
              return gdId !== id;
            });

            this.setState({guides, guidesInTopic});
          }}
        />
      )
    });
  }

  renderGuidesInTopic() {
    return this.state.guidesInTopic.map((g, i) => {
      return (
        <TGuide_Window
          key={'guideintopic-' + i}
          icon="minus"
          guide={g}
          title={g.head ? g.head.heading : g.heading}
          onClickAdd={(guide) => {
            let { guidesInTopic, guides } = this.state;

            guides.push({
              heading: g.head ? g.head.heading : g.heading,
              searchTitle: guide.searchTitle,
              guideId: guide.guideId ? guide.guideId : guide._id
            })

            guidesInTopic = guidesInTopic.filter((gd) => {
              let gdId = gd.guideId ? gd.guideId : gd._id;
              let id = guide.guideId ? guide.guideId : guide._id;
              return gdId !== id;
            });

            this.setState({guides, guidesInTopic});
          }}
        />
      )
    });
  }

  renderContent() {
    return (
      <div className="editor__guidecontainer">
        <div style={{display: 'flex', position: 'fixed', zIndex: 5}}>
          <button
              style={{marginRight: 10}}
             className="adminnavigator__button"
             onClick={() => this.onSaveTopic()}
          >
             Save<FAIcon name="save" style={{marginLeft: 5}}/>
          </button>
          <button
             className="adminnavigator__button"
             onClick={() => this.onDeleteTopic()}
          >
             Delete<FAIcon name="trash" style={{marginLeft: 5}}/>
          </button>
        </div>
        <div className="editor__editor" style={{marginBottom: 100, marginTop: 40}}>
          <TopicContent
            content={this.state.title}
            onClickSave={(title) => {
              this.setState({title});
            }}
          />
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div>
              {this.renderGuides()}
            </div>
            <div>
              {this.renderGuidesInTopic()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  onSaveTopic() {
    let { title, guidesInTopic } = this.state;
    let token = localStorage.getItem('portfolio_auth_token')

    let topic = {title, guides: guidesInTopic};

    this.setState({loading: true});

    axios.post('/topics/save', {topic, token}).then((res) => {
      if(res.data.status === 200) {
        this.props.dispatch(navigateAdmin('CONSOLE'))
      } else {
        console.log(res.data.message);
        this.setState({loading: false});
      }
    }).catch((err) => {
      console.log(err);
      this.setState({loading: false});
    });
  }

  onDeleteTopic() {

  }

  render() {
    if(!this.state.authenticated) return <div></div>

    let jsx = <Loading scaler={2} containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}} backColor={'rgba(0,0,0,0)'}/>
    if(!this.state.loading) {
      jsx = this.renderContent();
    }

    return (
      <div className="console__container">
        <AdminNavigator
          onClickBack={() => this.props.dispatch(navigateAdmin('CONSOLE'))}
          onClickLogOut={() => this.logout()}
          onEnterSearch={() => {}}
        />
        <div className="editor__container animatedFast slideInLeft">
          {jsx}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(TopicEditor);
