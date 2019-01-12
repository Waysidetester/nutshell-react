import React from 'react';
import firebase from 'firebase/app';
import smashRequest from '../../../helpers/db/smashRequest';
import Article from './article/article';
import 'firebase/auth';
import './articles.scss';


class Articles extends React.Component {
  state = {
    shownArticles: [],
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
    return (
    <div>
      <p>Articles</p>
      {articleBuilder}
    </div>
    );
  }
}

export default Articles;
