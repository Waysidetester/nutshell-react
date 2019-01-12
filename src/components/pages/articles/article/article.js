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

  startEditing = () => {
    this.setState({ editing: true });
  }

  render() {
    const editFields = (input, e) => {
      e.preventDefault();
      const tempArticle = { ...this.state.newListing };
      tempArticle[input] = e.target.value;
      this.setState({ article: tempArticle });
    };

    // get UID
    const currentUid = firebase.auth().currentUser.uid;

    // checks if UID matched article UID
    if (this.state.article.uid === currentUid) {

      // checks if user wants to edit their article
      if (this.state.editing) {
        // builds article in editing state
        return (
          <div className='card'>
          <div className='card-body'>
          
          {/* title input feild */}
          <div class='input-group mb-3'>
            <input className='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.article.title}/>
            <div class='input-group-prepend'>
              <span class='input-group-text' id='inputGroup-sizing-default'>Title</span>
            </div>
          </div>
          {/* synopsis input feild */}
          <div class='input-group mb-3'>
            <input className='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.article.synopsis}/>
            <div class='input-group-prepend'>
              <span class='input-group-text' id='inputGroup-sizing-default'>Synopsis</span>
            </div>
          </div>
          {/* url input feild */}
          <div class='input-group mb-3'>
            <input className='form-control' aria-label='Default' aria-describedby='inputGroup-sizing-default' value={this.state.article.url}/>
            <div class='input-group-prepend'>
              <span class='input-group-text' id='inputGroup-sizing-default'>URL</span>
            </div>
          </div>
            <div>
              <button className='btn btn-primary'>Update</button>
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
              onClick={
                () => {
                  articleRequest.deleteArticle(this.props.id)
                    .then(() => {
                      this.props.updateArticles();
                    })
                    .catch((err) => {
                      console.error('deleting article error', err);
                    });
                }
              }>Delete</button>
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
