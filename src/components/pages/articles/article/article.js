import React from 'react';
import firebase from 'firebase/app';
import articleRequest from '../../../../helpers/db/articleRequest';
import 'firebase/auth';
import './article.scss';

class Article extends React.Component {
  state = {
    article: {
      title: this.props.articleTitle,
      synopsis: this.props.articleSynopsis,
      url: this.props.articleUrl,
      uid: this.props.articleUid,
    },
    editing: false,
  }

  // ==================== Edit section =================

  // checks validity of edited input
  editValidator = () => {
    let validUrl;
    if (this.state.article.url.includes('http://') || this.state.article.url.includes('https://')) {
      validUrl = true;
    }
    return validUrl;
  }

  startEditing = () => {
    this.setState({ editing: true });
  }

  editFields = (input, e) => {
    e.preventDefault();
    const tempArticle = { ...this.state.article };
    tempArticle[input] = e.target.value;
    this.setState({ article: tempArticle });
  };


  titleChange = e => this.editFields('title', e);

  synopsisChange = e => this.editFields('synopsis', e);

  urlChange = e => this.editFields('url', e);

  completeEdit = (articleId, article) => {
    articleRequest.updateArticle(articleId, article)
      .then(() => {
        this.props.updateArticles();
      });
    this.setState({ editing: false });
  };

  passEditValues = () => {
    if (this.editValidator()) {
      this.completeEdit(this.props.id, this.state.article);
    }
  }

  // =================== End edit section ==============

  render() {
    // get UID
    const currentUid = firebase.auth().currentUser.uid;
    const deleteArticleCall = () => {
      articleRequest.deleteArticle(this.props.id)
        .then(() => {
          this.props.updateArticles();
        })
        .catch((err) => {
          console.error('deleting article error', err);
        });
    };

    // checks if UID matched article UID
    if (this.state.article.uid === currentUid) {
      // checks if user wants to edit their article
      if (this.state.editing) {
        // builds article in editing state
        return (
          <div className='card'>
          <div className='card-body'>

          {/* title input feild */}
          <div className='input-group mb-3'>
            <input
            className='form-control'
            aria-label='Default'
            aria-describedby='inputGroup-sizing-default'
            value={this.state.article.title}
            onChange={this.titleChange}
            />
            <div className='input-group-prepend'>
              <span className='input-group-text' id='inputGroup-sizing-default'>Title</span>
            </div>
          </div>
          {/* synopsis input feild */}
          <div className='input-group mb-3'>
            <input
            className='form-control'
            aria-label='Default'
            aria-describedby='inputGroup-sizing-default'
            value={this.state.article.synopsis}
            onChange={this.synopsisChange}
            />
            <div className='input-group-prepend'>
              <span className='input-group-text' id='inputGroup-sizing-default'>Synopsis</span>
            </div>
          </div>
          {/* url input feild */}
          <div className='input-group mb-3'>
            <input
            className='form-control'
            aria-label='Default'
            aria-describedby='inputGroup-sizing-default'
            value={this.state.article.url}
            onChange={this.urlChange}
            />
            <div className='input-group-prepend'>
              <span className='input-group-text' id='inputGroup-sizing-default'>URL</span>
            </div>
          </div>
            <div>
              <button
              className='btn btn-primary'
              onClick={this.passEditValues}
              >Update</button>
            </div>
          </div>
        </div>
        );
      }

      // builds article with alteration buttons
      return (
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{this.state.article.title}</h5>
            <p className='card-text'>{this.state.article.synopsis}</p>
            <a href={this.state.article.url} className='card-link'>{this.state.article.url}</a>
            <div>
              {/* places article in editing state */}
              <button
              className='btn btn-warning'
              onClick={this.startEditing}>Edit</button>
              {/* deletes article from database */}
              <button
              className='btn btn-danger'
              onClick={deleteArticleCall}
              >Delete</button>
            </div>
          </div>
        </div>
      );
    }

    // builds default article
    return (
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{this.props.articleTitle}</h5>
            <p className='card-text'>{this.props.articleSynopsis}</p>
            <a href={this.props.articleUrl} className='card-link'>{this.props.articleUrl}</a>
          </div>
        </div>
    );
  }
}

export default Article;
