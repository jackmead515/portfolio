import React, { Component } from 'react';
import { connect } from 'react-redux';
import FAIcon from 'react-fontawesome';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Authenticator from '../Authenticator';
import AdminNavigator from './AdminNavigator';
import { navigateAdmin } from '../../../actions/menu';
import Loading from '../../../components/Loading';
import Guide from '../../../components/Guide';
import HeadingContent from '../../../components/EditorContent/HeadingContent.js';
import LinkContent from '../../../components/EditorContent/LinkContent.js';
import TextContent from '../../../components/EditorContent/TextContent.js';
import CodeContent from '../../../components/EditorContent/CodeContent.js';
import ImageContent from '../../../components/EditorContent/ImageContent.js';
import VideoContent from '../../../components/EditorContent/VideoContent.js';

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

    let guide = props.menu.admin.extra;

    this.state = {
      loading: false,
      guide,
      head: guide.head,
      content: this.generateContent(guide),
      editor: 'view'
    }

    keyCounter = this.state.content.length;
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
           style={{marginRight: 5, backgroundColor: 'rgba(102, 255, 102, 0.7)'}}
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
           style={{marginRight: 5, backgroundColor: 'rgba(255, 153, 255, 0.7)'}}
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
          style={{marginRight: 5, backgroundColor: 'rgba(0, 204, 204, 0.7)'}}
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
          style={{marginRight: 5, backgroundColor: 'rgba(255, 153, 51, 0.7)'}}
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
          style={{marginRight: 5, backgroundColor: 'rgba(179, 134, 0, 0.7)'}}
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
          style={{backgroundColor: 'rgba(255, 26, 26, 0.7)'}}
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
             onClick={() => this.setState({editor: 'view'})}
          >
             View<FAIcon name="file-text" style={{marginLeft: 5}}/>
          </button>
          <button
             className="adminnavigator__button"
             onClick={() => this.setState({editor: 'raw'})}
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
    return (
      <div className="editor__guidecontainer">
        <div style={{display: 'flex', position: 'fixed', zIndex: 5}}>
          <button
            style={{marginRight: 10}}
             className="adminnavigator__button"
             onClick={() => this.setState({editor: 'view'})}
          >
             View<FAIcon name="file-text" style={{marginLeft: 5}}/>
          </button>
          <button
             className="adminnavigator__button"
             onClick={() => this.setState({editor: 'edit'})}
          >
             Edit<FAIcon name="edit" style={{marginLeft: 5}}/>
          </button>
        </div>
        <div className="editor__content__rawcontainer" style={{marginTop: 40}}>
          {JSON.stringify(this.state.guide)}
        </div>
      </div>
    )
  }

  renderViewContent() {
    return (
      <div className="editor__guidecontainer">
        <div style={{display: 'flex', position: 'fixed', zIndex: 5}}>
          <button
             style={{marginRight: 10}}
             className="adminnavigator__button"
             onClick={() => this.setState({editor: 'edit'})}
          >
             Edit<FAIcon name="edit" style={{marginLeft: 5}}/>
          </button>
          <button
              style={{marginRight: 10}}
             className="adminnavigator__button"
             onClick={() => this.setState({editor: 'raw'})}
          >
             Raw<FAIcon name="clipboard" style={{marginLeft: 5}}/>
          </button>
          <button
              style={{marginRight: 10}}
             className="adminnavigator__button"
             onClick={() => this.onSaveGuide()}
          >
             Save<FAIcon name="save" style={{marginLeft: 5}}/>
          </button>
          <button
             className="adminnavigator__button"
             onClick={() => this.onDeleteGuide()}
          >
             Delete<FAIcon name="trash" style={{marginLeft: 5}}/>
          </button>
        </div>
        <Guide guide={this.state.guide} style={{backgroundColor: 'white', marginTop: 40}} doNotTrack />
      </div>
    )
  }

  onSaveGuide() {
    const { guide } = this.state;
    let token = localStorage.getItem('portfolio_auth_token')

    this.setState({loading: true});

    axios.post('/guides/save', {guide, token}).then((res) => {
      if(res.data.status === 200) {
          this.props.dispatch(navigateAdmin('CONSOLE'))
      } else {
        Promise.reject(res.data.message);
        this.setState({loading: false});
      }
    }).catch((err) => {
      console.log(err);
      this.setState({loading: false});
    });
  }

  onDeleteGuide() {
    const { guide } = this.state;
    let token = localStorage.getItem('portfolio_auth_token')

    this.setState({loading: true});

    axios.post('/guides/delete', {guide, token}).then((res) => {
      if(res.data.status === 200) {
        this.props.dispatch(navigateAdmin('CONSOLE'))
      } else {
        Promise.reject(res.data.message);
        this.setState({loading: false});
      }
    }).catch((err) => {
      console.log(err);
      this.setState({loading: false});
    });
  }

  renderContent() {
    if(this.state.editor === 'edit') {
      return this.renderEditContent();
    } else if (this.state.editor === 'raw'){
      return this.renderRawContent();
    } else if (this.state.editor === 'view'){
      return this.renderViewContent();
    }
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

export default connect(mapStateToProps)(Editor);
