import React from 'react';
import firebase from 'firebase/app';
import smashRequest from '../../../helpers/db/smashRequest';
import articleRequest from '../../../helpers/db/articleRequest';
import Article from './article/article';
import 'firebase/auth';
import './articles.scss';

let uid;

class Articles extends React.Component {
  state = {
    shownArticles: [],
    adding: false,
  }

  activateAddArticle = () => this.setState({ adding: true });

  deactivateAddArticle = () => this.setState({ adding: false });

  getArticles = () => {
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
    uid = firebase.auth().currentUser.uid;
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

    // ======================== builder for adding article ===================

    const valueGetter = targetId => document.getElementById(targetId).value;

    const newArticle = () => {
      const newTitle = valueGetter('add-title');
      const newSynopsis = valueGetter('add-synopsis');
      const newUrl = valueGetter('add-url');
      const newArtUid = uid;
      const newArticleObject = {
        title: newTitle,
        synopsis: newSynopsis,
        url: newUrl,
        uid: newArtUid,
      };
      articleRequest.postRequest(newArticleObject)
        .then(() => {
          this.deactivateAddArticle();
          this.updateArticles();
        })
        .catch((err) => {
          console.error('bad post request for articles', err);
        });
    };

    const addArticle = () => {
      if (this.state.adding) {
        return (<div>
          <div className='input-group mb-3'>
            <input
            id='add-title'
            className='form-control'
            aria-label='Default'
            aria-describedby='inputGroup-sizing-default'
            />
            <div className='input-group-prepend'>
              <span className='input-group-text'>Title</span>
            </div>
          </div>
          <div className='input-group mb-3'>
            <input
            id='add-synopsis'
            className='form-control'
            aria-label='Default'
            aria-describedby='inputGroup-sizing-default'
            />
            <div className='input-group-prepend'>
              <span className='input-group-text'>Synopsis</span>
            </div>
          </div>
          <div className='input-group mb-3'>
            <input
            id='add-url'
            className='form-control'
            aria-label='Default'
            aria-describedby='inputGroup-sizing-default'
            />
            <div className='input-group-prepend'>
              <span className='input-group-text'>URL</span>
            </div>
          </div>
          <button
      className='btn btn-outline-primary'
      onClick={newArticle}
      >Submit Article</button>
        </div>);
      }
      // ============================= End add article builder ======================
      return (<button
      className='btn btn-outline-success'
      onClick={this.activateAddArticle}
      >Add Article</button>);
    };


    return (
    <div>
      <p>Articles</p>
      {addArticle()}
      {articleBuilder}
    </div>
    );
  }
}

export default Articles;
