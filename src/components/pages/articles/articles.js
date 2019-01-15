import React from 'react';
import firebase from 'firebase/app';
import smashRequest from '../../../helpers/db/smashRequest';
import Article from './article/article';
import 'firebase/auth';
import './articles.scss';


class Articles extends React.Component {
  state = {
    shownArticles: [],
    adding: false,
  }

  getArticles = () => {
    const uid = firebase.auth().currentUser.uid;
    smashRequest.getArticlesFromMeAndFriends(uid)
      .then((data) => {
        this.setState({ shownArticles: data });
      })
      .catch(err => console.error(err));
  };

  updateArticles = () => {
    this.getArticles();
  }

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const articleBuilder = this.state.shownArticles.map((singleArticle) => {
      return (<Article
      key={singleArticle.id}
      articleUid={singleArticle.uid}
      id={singleArticle.id}
      articleTitle={singleArticle.title}
      articleSynopsis={singleArticle.synopsis}
      articleUrl={singleArticle.url}
      updateArticles={this.updateArticles}
      />);
    });

    if (this.state.adding) {
      return (<div>
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
      </div>);
    }

    return (
    <div>
      <p>Articles</p>
      <button className='btn btn-outline-success'>Add Article</button>
      {articleBuilder}
    </div>
    );
  }
}

export default Articles;
