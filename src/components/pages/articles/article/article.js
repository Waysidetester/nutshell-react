import React from 'react';
import firebase from 'firebase/app';
import articleRequest from '../../../../helpers/db/articleRequest';
import 'firebase/auth';
import './article.scss';

class Article extends React.Component {
  render() {
    const currentUid = firebase.auth().currentUser.uid;
    if (this.props.articleUid === currentUid) {
      return (
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{this.props.articleTitle}</h5>
            <p className='card-text'>{this.props.articleSynopsis}</p>
            <a href={this.props.articleUrl} className='card-link'>{this.props.articleUrl}</a>
            <div>
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
              }>X</button>
            </div>
          </div>
        </div>
      );
    }

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
