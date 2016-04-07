import ArticleBodyTemplate from './body';
import Picture from '@economist/component-picture';
import React from 'react';
import { defaultGenerateClassNameList } from './utils';

const defaultVariant = '';
export default function ArticleTemplate({
  variantName = defaultVariant,
  generateClassNameList = defaultGenerateClassNameList,
  components = {},
  sectionName,
  content = [],
  scrollToOffset = 0,
  ...rest,
}) {
  const props = {
    variantName,
    generateClassNameList,
    components,
    sectionName,
    content,
    scrollToOffset,
    ...rest,
  };
  const {
    ArticleHeader,
    ArticleSubheader,
    ArticleBody = ArticleBodyTemplate,
    ArticleFooter,
  } = components;
  let ArticleHeaderEl = null;
  if (ArticleHeader) {
    ArticleHeaderEl = <ArticleHeader {...props} />;
  }
  let ArticleSubheaderEl = null;
  if (ArticleSubheader) {
    ArticleSubheaderEl = <ArticleSubheader {...props} />;
  }
  let ArticleFooterEl = null;
  if (ArticleFooter) {
    ArticleFooterEl = <ArticleFooter {...props} />;
  }
  return (
    <article
      className={generateClassNameList('article-template').join(' ')}
      data-section={sectionName}
      itemScope
      itemType="http://schema.org/NewsArticle"
    >
      {ArticleHeaderEl}
      {ArticleSubheaderEl}
      <ArticleBody
        variantName={variantName}
        generateClassNameList={generateClassNameList}
        content={content}
        scrollToOffset={scrollToOffset}
      />
      {ArticleFooterEl}
    </article>
  );
}

if (process.env.NODE_ENV !== 'production') {
  ArticleTemplate.propTypes = {
    id: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
    generateClassNameList: React.PropTypes.func,
    variantName: React.PropTypes.string,
    components: React.PropTypes.shape({
      ArticleHeader: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.func ]),
      ArticleSubheader: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.func ]),
      ArticleBody: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.func ]),
      ArticleFooter: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.func ]),
    }),
    scrollToOffset: React.PropTypes.number,
    title: React.PropTypes.string.isRequired,
    flytitle: React.PropTypes.string.isRequired,
    rubric: React.PropTypes.string.isRequired,
    mainImage: React.PropTypes.shape(Picture.propTypes),
    content: React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object,
      ]),
    ).isRequired,
    sectionName: React.PropTypes.string.isRequired,
  };
}
