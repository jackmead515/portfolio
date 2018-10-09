import React, { Component } from 'react';
import { connect } from 'react-redux';
import FAIcon from 'react-fontawesome';
import axios from 'axios';

import { history, SERVERIP } from '../../../index.js';
import Navigator from '../components/Navigator';
import Authenticator from './Authenticator';
import { navigateAdmin } from '../../actions/menu';
import Loading from '../../components/Loading';

import PopUpConfirm from './PopUpConfirm';
import PopUpError from '../../components/PopUpError';
import TopicContent from '../../components/EditorContent/TopicContent.js';

class TopicEditor extends Authenticator {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      topic: {},
      title: "",
      guidesInTopic: [],
      guides: [],
      confirmation: null,
      popuperror: false
    }

    this.styles = {
      guideColumn: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }
    }
  }

  componentWillMount() {
    const { topicTitle, guides } = this.props;
    const topics = this.props.topics.topics.data;

    if(topicTitle === 'new') {
      const topic = this.createTopicTemplate();

      this.setState({
        topic,
        title: topic.title,
        guidesInTopic: [],
        guides: guides.guides.data
      });

    } else {
      const topic = topics.find((t) => t.title === topicTitle);

      let guidesNotInTopic = guides.guides.data.filter((g) => {
        return !topic.guides.find((tg) => tg.guideId === g._id);
      });

      this.setState({
        topic,
        title: topic.title,
        guidesInTopic: topic.guides,
        guides: guidesNotInTopic
      })
    }
  }

  createTopicTemplate() {
    return {
      title: "My Topic",
      guides: []
    }
  }

  renderGuides() {
    return this.state.guides.map((g, i) => {
      return (
        <div
          key={'guide-' + i}
          className="guidenav__post"
          onClick={() => {
            let { guidesInTopic, guides } = this.state;

            guidesInTopic.push({
              heading: g.head ? g.head.heading : g.heading,
              searchTitle: g.searchTitle,
              guideId: g.guideId ? g.guideId : g._id
            })

            guides = guides.filter((gd) => {
              let gdId = gd.guideId ? gd.guideId : gd._id;
              let id = g.guideId ? g.guideId : g._id;
              return gdId !== id;
            });

            this.setState({guides, guidesInTopic});
          }}
        >
          {g.head ? g.head.heading : g.heading}
        </div>
      )
    });
  }

  renderGuidesInTopic() {
    return this.state.guidesInTopic.map((g, i) => {
        return (
          <div
            key={'guideintopic-' + i}
            className="guidenav__post"
            onClick={() => {
              let { guidesInTopic, guides } = this.state;

              guides.push({
                heading: g.head ? g.head.heading : g.heading,
                searchTitle: g.searchTitle,
                guideId: g.guideId ? g.guideId : g._id
              })

              guidesInTopic = guidesInTopic.filter((gd) => {
                let gdId = gd.guideId ? gd.guideId : gd._id;
                let id = g.guideId ? g.guideId : g._id;
                return gdId !== id;
              });

              this.setState({guides, guidesInTopic});
            }}
          >
             {g.head ? g.head.heading : g.heading}
          </div>
        );
    });
  }

  renderTopic() {
    return (
      <div className="editor__guidecontainer">
        <div style={{display: 'flex', position: 'fixed', zIndex: 5}}>
          <button
              style={{marginRight: 10}}
             className="adminnavigator__button"
             onClick={() => {
               this.setState({confirmation: {
                 message: "Are you sure you want to save this topic?",
                 yes: () => this.onSaveTopic(),
                 no: () => this.setState({confirmation: null})
               }}, () => {window.scrollTo(0, 0)})
             }}
          >
             Save<FAIcon name="save" style={{marginLeft: 5}}/>
          </button>
          <button
             className="adminnavigator__button"
             onClick={() => {
               this.setState({confirmation: {
                 message: "Are you sure you want to DELETE this topic forever?",
                 yes: () => this.onDeleteTopic(),
                 no: () => this.setState({confirmation: null})
               }}, () => {window.scrollTo(0, 0)})
             }}
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
        <div style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
            <div style={{...this.styles.guideColumn, borderRight: '3px solid #e8e8e8'}}>
              {this.renderGuides()}
            </div>
            <div style={{...this.styles.guideColumn}}>
              {this.renderGuidesInTopic()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  onDeleteTopic() {
    let { title, guidesInTopic } = this.state;
    let token = localStorage.getItem('portfolio_auth_token')

    this.setState({loading: true});

    axios.post('/topics/delete', {title, token}).then((res) => {
      if(res.data.status === 200) {
        history.push('/admin');
        this.setState({loading: false, confirmation: null});
      } else {
        this.setState({loading: false, confirmation: null, popuperror: res.data.message});
      }
    }).catch((err) => {

      this.setState({loading: false, confirmation: null, popuperror: err.message});
    });
  }

  onSaveTopic() {
    let { title, guidesInTopic } = this.state;
    let token = localStorage.getItem('portfolio_auth_token')

    let topic = {title, guides: guidesInTopic};

    this.setState({loading: true});

    axios.post('/topics/save', {topic, token}).then((res) => {
      if(res.data.status === 200) {
        history.push('/admin');
        this.setState({loading: false, confirmation: null});
      } else {
        this.setState({loading: false, confirmation: null,popuperror: res.data.message});
      }
    }).catch((err) => {
      this.setState({loading: false, confirmation: null,popuperror: err.message});
    });
  }

  renderContent() {
    let paddingTop = 60;
    if(this.props.menu.opened) paddingTop = 90;
    let contentJSX = null;
    if(this.state.loading) {
      contentJSX = <Loading scaler={2} containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}} backColor={'rgba(0,0,0,0)'}/>
    } else {
      contentJSX = this.renderTopic();
    }

    return (
      <div className="animatedFast fadeIn guides__container--full" style={{paddingTop, marginBottom: 30, margin: 'auto'}}>
        <div className="guides__contentcontainer">
          {contentJSX}
        </div>
      </div>
    )
  }

  renderConfirmation() {
    const { confirmation, loading } = this.state;

    if(confirmation && !loading) {
      return (
          <PopUpConfirm
            message={confirmation.message}
            onClickYes={() => {
              confirmation.yes();
            }}
            onClickNo={() => {
              confirmation.no();
            }}
          />
      )
    }
  }

  renderPopUpError() {
    const { popuperror } = this.state;

    if(popuperror) {
      return (
        <PopUpError
          message={popuperror}
          onConfirm={() => this.setState({popuperror: false})}
        />
      )
    }
  }

  render() {
    if(!this.state.authenticated) return <div></div>

    return (
      <div>
        <Navigator />
        {this.renderPopUpError()}
        {this.renderConfirmation()}
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

export default connect(mapStateToProps)(TopicEditor);
