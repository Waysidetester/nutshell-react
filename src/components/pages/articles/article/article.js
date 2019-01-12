import React from 'react';
import './article.scss';

class Article extends React.Component {
  render() {
    return (
        <div>
          <h2>{this.props.articleTitle}</h2>
          <p>{this.props.articleSynopsis}</p>
          <p>
            <a href={this.props.articleUrl}>{this.props.articleUrl}</a>
          </p>
        </div>
    );
  }
}

export default Article;
