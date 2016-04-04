import 'babel-polyfill';
import ArticleTemplate from './';
import React from 'react';
import article from '../example-data/article';
export default (
  <ArticleTemplate
    id={article.id}
    slug={article.attributes.slug}
    title={article.attributes.title}
    flytitle={article.attributes.flytitle}
    rubric={article.attributes.rubric}
    mainImage={article.attributes.mainimage}
    content={article.attributes.content}
    sectionName={article.attributes.section}
  />
);
