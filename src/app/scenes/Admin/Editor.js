import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FAIcon from 'react-fontawesome';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { history, SERVERIP } from '../../../index.js';
import { getKeywords } from '../../util/';
import Fetch from '../../util/Fetch';
import Navigator from '../components/Navigator';
import Authenticator from './Authenticator';
import { navigateAdmin } from '../../actions/menu';
import Loading from '../../components/Loading';
import Guide from '../../components/Guide';
import Comments from '../../components/Comments';
import Border from '../../components/Border';
import PopUpConfirm from './PopUpConfirm';
import PopUpError from '../../components/PopUpError';
import HeadingContent from '../../components/EditorContent/HeadingContent.js';
import LinkContent from '../../components/EditorContent/LinkContent.js';
import TextContent from '../../components/EditorContent/TextContent.js';
import CodeContent from '../../components/EditorContent/CodeContent.js';
import ImageContent from '../../components/EditorContent/ImageContent.js';
import VideoContent from '../../components/EditorContent/VideoContent.js';
import HTMLContent from '../../components/EditorContent/HTMLContent.js';

import editorColors from '../../styles/editorColors';

/**
 DOC: Used to configure the style when dragging and dropping items
*/
const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  margin: `0 0 ${grid}px 0`,
  ...draggableStyle,
});

/**
  DOC: So no duplicates are created!
*/
let keyCounter = 0;

class Editor extends Authenticator {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      guide: {},
      head: {},
      content: [],
      related: [],
      editor: 'view',
      confirmation: null,
      popuperror: false
    }
  }

  componentWillMount() {
    const { searchTitle } = this.props;

    if(searchTitle === 'new') {
      let template = this.createGuideTemplate();
      keyCounter = template.content.length;
      this.setState({
        guide: template,
        head: template.head,
        content: this.generateContent(template),
        editor: 'view',
        loading: false
      });
    } else {
      Fetch.adminGuide(searchTitle).then((guide) => {
        keyCounter = guide.content.length;

        Fetch.related(guide.head.heading, guide.head.subHeading, guide.head.tags).then((related) => {
          related = related.filter((r) => r.searchTitle !== guide.searchTitle);
          this.setState({related});
        });

        this.setState({
          guide,
          head: guide.head,
          content: this.generateContent(guide),
          editor: 'view',
          loading: false
        });
      }).catch((err) => {

      })
    }
  }

  createGuideTemplate() {
    let date = new Date();
    let time = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();

    return {
        searchTitle: "my-heading",
        head: {
          date: { time },
          private: true,
          tags: [],
          heading: "My Heading",
          subHeading: "My Sub Heading",
        },
        content: [
          { type: "text", content: "Text...", style: "{}" },
          { type: "code", content: "function code() {}", style: "{}" },
          { type: "link", content: "www.somelink.com", icon: "external-link-square", title: "My Link", style: "{}" },
          { type: "image", content: "url/to/image.jpg", style: "{\"marginTop\": 10, \"marginBottom\": 10}" },
          { type: "video", content: "https://www.youtube.com/embed/somevideo", style: "{\"marginTop\": 10, \"marginBottom\": 10}" }
        ]
    }
  }

  saveContent(saveContent) {
    let { content } = this.state;

    for(let i = 0; i < content.length; i++) {
      if(content[i].id === saveContent.id) {
        if(saveContent.content.type === 'text') {
          content[i] = {
            json: { ...saveContent.content },
            id: saveContent.id,
            content: (
              <TextContent
                id={saveContent.id}
                key={saveContent.id}
                content={saveContent.content}
                onClickSave={this.saveContent.bind(this)}
                onClickMinus={this.deleteContent.bind(this)}
              />
            )
          };
        } else if(saveContent.content.type === 'code') {
          content[i] = {
            json: { ...saveContent.content },
            id: saveContent.id,
            content: (
              <CodeContent
                id={saveContent.id}
                key={saveContent.id}
                content={saveContent.content}
                onClickSave={this.saveContent.bind(this)}
                onClickMinus={this.deleteContent.bind(this)}
              />
            )
          };
        } else if(saveContent.content.type === 'link') {
          content[i] = {
            json: { ...saveContent.content },
            id: saveContent.id,
            content: (
              <LinkContent
                id={saveContent.id}
                key={saveContent.id}
                content={saveContent.content}
                onClickSave={this.saveContent.bind(this)}
                onClickMinus={this.deleteContent.bind(this)}
              />
            )
          };
        } else if(saveContent.content.type === 'image') {
          content[i] = {
            json: { ...saveContent.content },
            id: saveContent.id,
            content: (
              <ImageContent
                id={saveContent.id}
                key={saveContent.id}
                content={saveContent.content}
                onClickSave={this.saveContent.bind(this)}
                onClickMinus={this.deleteContent.bind(this)}
              />
            )
          };
        } else if(saveContent.content.type === 'video') {
          content[i] = {
            json: { ...saveContent.content },
            id: saveContent.id,
            content: (
              <VideoContent
                id={saveContent.id}
                key={saveContent.id}
                content={saveContent.content}
                onClickSave={this.saveContent.bind(this)}
                onClickMinus={this.deleteContent.bind(this)}
              />
            )
          };
        } else if(saveContent.content.type === 'html') {
          content[i] = {
            json: { ...saveContent.content },
            id: saveContent.id,
            content: (
              <HTMLContent
                id={saveContent.id}
                key={saveContent.id}
                content={saveContent.content}
                onClickSave={this.saveContent.bind(this)}
                onClickMinus={this.deleteContent.bind(this)}
              />
            )
          };
        }
        break;
      }
    }

    this.setState({content});
    this.setState({guide: this.generateGuide()});
  }

  deleteContent(deleteContent) {
    let { content } = this.state;

    for(let i = 0; i < content.length; i++) {
      if(content[i].id === deleteContent.id) {
        content.splice(i, 1);
        break;
      }
    }

    this.setState({content});
    this.setState({guide: this.generateGuide()});
  }

  addContent(newContent) {
    let { content } = this.state;

    if(newContent.type === 'text') {
      content.push({
        json: { ...newContent },
        id: `content-${keyCounter}`,
        content: (
          <TextContent
            id={"content-" + keyCounter}
            key={"content-" + keyCounter}
            content={newContent}
            onClickSave={this.saveContent.bind(this)}
            onClickMinus={this.deleteContent.bind(this)}
          />
        )
      });
    } else if(newContent.type === 'code') {
      content.push({
        json: { ...newContent },
        id: `content-${keyCounter}`,
        content: (
          <CodeContent
            id={"content-" + keyCounter}
            key={"content-" + keyCounter}
            content={newContent}
            onClickSave={this.saveContent.bind(this)}
            onClickMinus={this.deleteContent.bind(this)}
          />
        )
      });
    } else if(newContent.type === 'link') {
      content.push({
        json: { ...newContent },
        id: `content-${keyCounter}`,
        content: (
          <LinkContent
            id={"content-" + keyCounter}
            key={"content-" + keyCounter}
            content={newContent}
            onClickSave={this.saveContent.bind(this)}
            onClickMinus={this.deleteContent.bind(this)}
          />
        )
      });
    } else if(newContent.type === 'image') {
      content.push({
        json: { ...newContent },
        id: `content-${keyCounter}`,
        content: (
          <ImageContent
            id={"content-" + keyCounter}
            key={"content-" + keyCounter}
            content={newContent}
            onClickSave={this.saveContent.bind(this)}
            onClickMinus={this.deleteContent.bind(this)}
          />
        )
      });
    } else if(newContent.type === 'video') {
      content.push({
        json: { ...newContent },
        id: `content-${keyCounter}`,
        content: (
          <VideoContent
            id={"content-" + keyCounter}
            key={"content-" + keyCounter}
            content={newContent}
            onClickSave={this.saveContent.bind(this)}
            onClickMinus={this.deleteContent.bind(this)}
          />
        )
      });
    } else if(newContent.type === 'html') {
      content.push({
        json: { ...newContent },
        id: `content-${keyCounter}`,
        content: (
          <HTMLContent
            id={"content-" + keyCounter}
            key={"content-" + keyCounter}
            content={newContent}
            onClickSave={this.saveContent.bind(this)}
            onClickMinus={this.deleteContent.bind(this)}
          />
        )
      });
    }

    keyCounter+=1;

    this.setState({content});
    this.setState({guide: this.generateGuide()});
  }

  generateGuide() {
    let { content, guide } = this.state;

    guide.content = content.map((item) => {
      return item.json;
    });

    return guide;
  }

  generateContent(guide) {
    return guide.content.map((content, i) => {
      if(content.type === 'text') {
        return {
          json: { ...content },
          id: `content-${i}`,
          content: (
            <TextContent
              id={"content-" + i}
              key={"content-" + i}
              content={content}
              onClickSave={this.saveContent.bind(this)}
              onClickMinus={this.deleteContent.bind(this)}
            />
          )
        };
      } else if(content.type === 'code') {
        return {
          json: { ...content },
          id: `content-${i}`,
          content: (
            <CodeContent
              id={"content-" + i}
              key={"content-" + i}
              content={content}
              onClickSave={this.saveContent.bind(this)}
              onClickMinus={this.deleteContent.bind(this)}
            />
          )
        };
      } else if(content.type === 'link') {
        return {
          json: { ...content },
          id: `content-${i}`,
          content: (
            <LinkContent
              id={"content-" + i}
              key={"content-" + i}
              content={content}
              onClickSave={this.saveContent.bind(this)}
              onClickMinus={this.deleteContent.bind(this)}
            />
          )
        };
      } else if(content.type === 'image') {
        return {
          json: { ...content },
          id: `content-${i}`,
          content: (
            <ImageContent
              id={"content-" + i}
              key={"content-" + i}
              content={content}
              onClickSave={this.saveContent.bind(this)}
              onClickMinus={this.deleteContent.bind(this)}
            />
          )
        };
      } else if(content.type === 'video') {
        return {
          json: { ...content },
          id: `content-${i}`,
          content: (
            <VideoContent
              id={"content-" + i}
              key={"content-" + i}
              content={content}
              onClickSave={this.saveContent.bind(this)}
              onClickMinus={this.deleteContent.bind(this)}
            />
          )
        };
      } else if(content.type === 'html') {
        return {
          json: { ...content },
          id: `content-${i}`,
          content: (
            <HTMLContent
              id={"content-" + i}
              key={"content-" + i}
              content={content}
              onClickSave={this.saveContent.bind(this)}
              onClickMinus={this.deleteContent.bind(this)}
            />
          )
        };
      }
    });
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const content = this.reorder(
      this.state.content,
      result.source.index,
      result.destination.index
    );

    this.setState({ content });
    this.setState({guide: this.generateGuide()});
  }

  renderEditor() {
    const { head, content, topics } = this.state;

    return (
      <div className="editor__editor" style={{marginBottom: 100}}>
        <HeadingContent
          content={head}
          onClickSave={(head) => {
            let { guide } = this.state;
            guide.head = head;
            guide.searchTitle = guide.head.heading.replace(/\s/g, '-').toLowerCase();
            this.setState({guide});
          }}
        />
        <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {content.map(item => (
                  <Draggable key={item.id} draggableId={item.id}>
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          style={getItemStyle(
                            provided.draggableStyle,
                            snapshot.isDragging
                          )}
                          {...provided.dragHandleProps}
                        >
                          {item.content}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {this.renderEditorWidgets()}
      </div>
    )
  }

  renderEditorWidgets() {
    return (
      <div className="editor__widgets__container" style={{marginTop: 5}}>
        <button
           style={{marginRight: 5, backgroundColor: editorColors.text}}
           className="adminnavigator__button"
           onClick={() => {
             this.addContent({
                 type: "text",
                 content: "Text...",
                 style: "{}"
             })
           }}
        >
           Add Text<FAIcon name="plus" style={{marginLeft: 5}}/>
        </button>
        <button
           style={{marginRight: 5, backgroundColor: editorColors.code}}
           className="adminnavigator__button"
           onClick={() => {
              this.addContent({
                 type: "code",
                 content: "function code() {}",
                 style: "{}"
             });
           }}
        >
           Add Code<FAIcon name="plus" style={{marginLeft: 5}}/>
        </button>
        <button
          style={{marginRight: 5, backgroundColor: editorColors.link}}
           className="adminnavigator__button"
           onClick={() => {
            this.addContent({
                 type: "link",
                 content: "www.somelink.com",
                 icon: "external-link-square",
                 title: "My Link",
                 style: "{}"
             });
           }}
        >
           Add Link<FAIcon name="plus" style={{marginLeft: 5}}/>
        </button>
        <button
          style={{marginRight: 5, backgroundColor: editorColors.image}}
           className="adminnavigator__button"
           onClick={() => {
              this.addContent({
                 type: "image",
                 content: "www.somelink.com",
                 style: "{}"
             });
           }}
        >
           Add Image<FAIcon name="plus" style={{marginLeft: 5}}/>
        </button>
        <button
          style={{marginRight: 5, backgroundColor: editorColors.video}}
           className="adminnavigator__button"
           onClick={() => {
              this.addContent({
                 type: "video",
                 content: "https://www.youtube.com/embed/somevideo",
                 style: "{}"
             });
           }}
        >
           Add Video<FAIcon name="plus" style={{marginLeft: 5}}/>
        </button>
        <button
          style={{marginRight: 5, backgroundColor: editorColors.html}}
           className="adminnavigator__button"
           onClick={() => {
              this.addContent({
                 type: "html",
                 content: "<b>Hello there!</b>",
                 style: "{}"
             });
           }}
        >
           Add HTML<FAIcon name="plus" style={{marginLeft: 5}}/>
        </button>
        <button
          title="Delete the last section added"
          style={{backgroundColor: 'rgb(255, 26, 26)'}}
           className="adminnavigator__button"
           onClick={() => {
             let { content } = this.state;
             content.pop();
             this.setState({content});
           }}
        >
           Delete<FAIcon name="trash" style={{marginLeft: 5}}/>
        </button>
      </div>
    )
  }

  renderEditContent() {
    return (
      <div className="editor__guidecontainer">
        <div style={{display: 'flex', position: 'fixed', zIndex: 5}}>
          <button
            style={{marginRight: 10}}
             className="adminnavigator__button"
             onClick={() => this.setState({editor: 'view'}, () => {window.scrollTo(0, 0)})}
          >
             View<FAIcon name="file-text" style={{marginLeft: 5}}/>
          </button>
          <button
             className="adminnavigator__button"
             onClick={() => this.setState({editor: 'raw'}, () => {window.scrollTo(0, 0)})}
          >
             Raw<FAIcon name="clipboard" style={{marginLeft: 5}}/>
          </button>
        </div>
        <div style={{marginTop: 40}}>
          {this.renderEditor()}
        </div>
      </div>
    )
  }

  renderRawContent() {
    const onChangeRawContent = (e) => {
      try {
        const g = JSON.parse(e.target.value);
        this.setState({guide: g, head: g.head, content: g.content});
      } catch(e) {}
    }

    return (
      <div className="editor__guidecontainer" style={{width: '100%', minWidth: '100%'}}>
        <div style={{display: 'flex', position: 'fixed', zIndex: 5}}>
          <button
            style={{marginRight: 10}}
             className="adminnavigator__button"
             onClick={() => this.setState({editor: 'view'}, () => {window.scrollTo(0, 0)})}
          >
             View<FAIcon name="file-text" style={{marginLeft: 5}}/>
          </button>
          <button
             className="adminnavigator__button"
             onClick={() => this.setState({editor: 'edit'}, () => {window.scrollTo(0, 0)})}
          >
             Edit<FAIcon name="edit" style={{marginLeft: 5}}/>
          </button>
        </div>
        <textarea
          style={{marginTop: 40}}
          className="editor__content__rawcontainer"
          onKeyDown={(e) => onChangeRawContent(e)}
          onChange={(e) => onChangeRawContent(e)}
        >
          {JSON.stringify(this.state.guide)}
        </textarea>
      </div>
    )
  }

  renderViewContent() {
    const { guide, related } = this.state;
    return (
      <div className="editor__guidecontainer">
        <div style={{display: 'flex', position: 'fixed', zIndex: 5}}>
          <button
             style={{marginRight: 10}}
             className="adminnavigator__button"
             onClick={() => this.setState({editor: 'edit'}, () => {window.scrollTo(0, 0)})}
          >
             Edit<FAIcon name="edit" style={{marginLeft: 5}}/>
          </button>
          <button
              style={{marginRight: 10}}
             className="adminnavigator__button"
             onClick={() => this.setState({editor: 'raw'}, () => {window.scrollTo(0, 0)})}
          >
             Raw<FAIcon name="clipboard" style={{marginLeft: 5}}/>
          </button>
          <button
              style={{marginRight: 10}}
             className="adminnavigator__button"
             onClick={() => {
               this.setState({confirmation: {
                 message: "Are you sure you want to save this guide?",
                 yes: () => this.onSaveGuide(),
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
                 message: "Are you sure you want to DELETE this guide forever?",
                 yes: () => this.onDeleteGuide(),
                 no: () => this.setState({confirmation: null})
               }}, () => {window.scrollTo(0, 0)})
             }}
          >
             Delete<FAIcon name="trash" style={{marginLeft: 5}}/>
          </button>
        </div>
        <Guide guide={this.state.guide} opened={true} mobile={true} style={{backgroundColor: 'white', marginTop: 40}} doNotTrack />
        <Border style={{marginTop: 30, marginBottom: 30}}/>
        <div style={{width: '100%'}}>
            <h3 style={{marginTop: 0, marginBottom: 10}}>Related Guides</h3>
              {related.map((r, i) => {
                return (
                  <a
                    key={'related-'+i}
                    className="guidenav__post"
                    style={{display: 'block'}}
                    href={''}
                  >
                     {r.head.heading}
                  </a>
                )
              })}
        </div>
        <Border style={{marginTop: 30, marginBottom: 30}}/>
        <Comments admin guide={guide}/>
      </div>
    )
  }

  onSaveGuide() {
    const { guide } = this.state;
    let token = localStorage.getItem('portfolio_auth_token');

    this.setState({loading: true});

    axios.post('/admin/save', {guide, token}).then((res) => {
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

  onDeleteGuide() {
    const { guide } = this.state;
    let token = localStorage.getItem('portfolio_auth_token')

    this.setState({loading: true});

    axios.post('/admin/delete', {guide, token}).then((res) => {
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

  renderContent() {
    if(!this.state.authenticated) return <div></div>

    let paddingTop = 60;
    if(this.props.menu.opened) paddingTop = 90;
    let contentJSX = null;
    if(this.state.loading) {
      contentJSX = <Loading scaler={2} containerStyles={{display: 'flex', justifyContent: 'center', marginTop: '30vh'}} backColor={'rgba(0,0,0,0)'}/>
    } else if(this.state.editor === 'edit') {
      contentJSX = this.renderEditContent();
    } else if (this.state.editor === 'raw'){
      contentJSX = this.renderRawContent();
    } else if (this.state.editor === 'view'){
      contentJSX = this.renderViewContent();
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

export default connect(mapStateToProps)(Editor);
