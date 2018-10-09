import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

import FAIcon from 'react-fontawesome';

import { SERVERIP } from '../../index';
import Fetch from '../util/Fetch';
import Loading from './Loading';
import Border from './Border';

export default class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      disabled: false,
      comment: '',
      name: '',
      comments: []
    }
  }

  componentWillMount() {
    this.fetchComments();
  }

  deleteComment(commentId) {
    const { guide } = this.props;
    this.setState({loading: true});

    axios.post('/comments/delete', {searchTitle: guide.searchTitle, commentId: commentId, token: localStorage.getItem('portfolio_auth_token')}).then((res) => {
      if(res.data.status === 200) {
        this.fetchComments();
      } else {
        this.setState({loading: false});
      }
    }).catch((err) => {
      this.setState({loading: false});
    });
  }

  fetchComments() {
    const { guide } = this.props;
    this.setState({loading: true});
    Fetch.comments(guide.searchTitle).then((comments) => {
      setTimeout(() => {
        if(comments) {
          this.setState({comments: comments.comments, loading: false});
        } else {
          this.setState({loading: false});
        }
      }, 500);
    }).catch((err) => {
      this.setState({disabled: true});
    });
  }

  sendComment() {
    const { guide } = this.props;
    const { comment, name } = this.state;

    if(comment && comment.length <= 2000 && comment.length > 0 &&
       name && name.length <= 50 && name.length > 0) {

         this.setState({comment: '', name: ''});

         axios.post('/comments/save', {
           searchTitle: guide.searchTitle,
           guideId: guide._id,
           heading: guide.head.heading,
           comment,
           name
         }).then((res) => {
           this.fetchComments();
         });

       }
  }

  renderForm() {
    const { comments } = this.state;
    if(!comments || comments.length >= 50) return null;
    return (
      <div className="comments__form__container">
        <input
          type="text"
          placeholder="Name"
          className="comments__form__input"
          value={this.state.name}
          onChange={(e) => {
            let name = e.target.value;
            if(name.length < 50) {
              this.setState({name});
            }
          }}
        />
        <textarea
          placeholder="What do you think?"
          className="comments__form__textarea"
          value={this.state.comment}
          onChange={(e) => {
            let comment = e.target.value;
            if(comment.length < 2000) {
              this.setState({comment});
            }
          }}
        />
      <div className="comments__form__button" onClick={() => this.sendComment()}>
          Send
        </div>
      </div>
    )
  }

  renderComments() {
    const { comments } = this.state;

    let commentArr = [];

    if(this.props.admin) {
      comments.map((comment, i) => {
        commentArr.push((
          <div key={"comment-" + i} className="comments__admincontent__wrapper">
            <div title="Delete Comment" className="comments__admincontent__button" onClick={() => this.deleteComment(comment._id)}>
              <FAIcon name="times" />
            </div>
            <div className="comments__admincontent__content">
              <div className="comments__content__date">
                {moment(comment.date).format('MMM Do, YYYY')}
              </div>
              <div className="comments__content__name">
                {comment.name}
              </div>
              <div className="comments__content__comment">
                {comment.comment}
              </div>
            </div>
          </div>
        ));

        if(i !== comments.length-1) {
          commentArr.push(<Border key={"border-" + i} />);
        }
      });
    } else {
      comments.map((comment, i) => {
        commentArr.push((
          <div key={"comment-" + i} className="comments__content__wrapper">
            <div className="comments__content__date">
              {moment(comment.date).format('MMM Do, YYYY')}
            </div>
            <div className="comments__content__name">
              {comment.name}
            </div>
            <div className="comments__content__comment">
              {comment.comment}
            </div>
          </div>
        ));

        if(i !== comments.length-1) {
          commentArr.push(<Border key={"border-" + i} />);
        }
      });
    }

    return commentArr;
  }

  render() {
    return (
      <div className="comments__container">
        <h3 style={{marginTop: 0, marginBottom: 10}}>Comments</h3>
        {this.state.loading ? <div className="comments__loading"><Loading scaler={2}/></div> : this.renderForm()}
        {this.renderComments()}
      </div>
    );
  }
}
