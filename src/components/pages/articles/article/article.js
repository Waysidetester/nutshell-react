import React from 'react';
import firebase from 'firebase/app';
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
              <button className='btn btn-danger'>X</button>
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
