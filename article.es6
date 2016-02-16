import React, { Component, PropTypes } from 'react';

import ArticleBodyTemplate from './body';

import { defaultGenerateClassNameList, passthroughComponentPropTypesOnly } from './utils';
import { isComponent, isImage, isSectionArticles } from './proptypes';

const DefaultArticleHeader = 'div';
const DefaultArticleSubheader = 'div';
const DefaultArticleBody = ArticleBodyTemplate;
const DefaultArticleFooter = 'div';
function ArticleContainer({ generateClassNameList, sectionName, children }) {
  return (
    <article
      className={generateClassNameList(`ArticleTemplate--container`).join(' ')}
      data-section={sectionName}
      itemScope
      itemType="http://schema.org/NewsArticle"
    >
      {children}
    </article>
  );
}
ArticleContainer.propTypes = {
  generateClassNameList: PropTypes.func,
  sectionName: PropTypes.string,
  children: PropTypes.node,
};

const defaultVariant = '';
class ArticleTemplate extends Component {

  static get propTypes() {
    return {
      generateClassNameList: PropTypes.func,
      variantName: PropTypes.string,
      components: PropTypes.shape({
        ArticleHeader: isComponent,
        ArticleSubheader: isComponent,
        ArticleBody: isComponent,
        ArticleFooter: isComponent,
      }),
      scrollToOffset: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      flytitle: PropTypes.string.isRequired,
      rubric: PropTypes.string.isRequired,
      mainImage: isImage.isRequired,
      content: PropTypes.array.isRequired,
      sectionName: PropTypes.string.isRequired,
      sections: isSectionArticles,
    };
  }

  static get defaultProps() {
    return {
      variantName: defaultVariant,
      generateClassNameList: defaultGenerateClassNameList,
      components: {
        ArticleHeader: DefaultArticleHeader,
        ArticleSubheader: DefaultArticleSubheader,
        ArticleBody: DefaultArticleBody,
        ArticleFooter: DefaultArticleFooter,
      },
      sections: [],
    };
  }

  render() {
    const { variantName, generateClassNameList, sectionName, content, scrollToOffset } = this.props;
    const { ArticleHeader, ArticleSubheader, ArticleBody, ArticleFooter } = this.props.components;
    return (
      <ArticleContainer generateClassNameList={generateClassNameList} sectionName={sectionName}>
        <ArticleHeader {...passthroughComponentPropTypesOnly(ArticleHeader, this.props)} />
        <ArticleSubheader {...passthroughComponentPropTypesOnly(ArticleSubheader, this.props)} />
        <ArticleBody
          variantName={variantName}
          generateClassNameList={generateClassNameList}
          content={content}
          scrollToOffset={scrollToOffset}
        />
        <ArticleFooter {...passthroughComponentPropTypesOnly(ArticleFooter, this.props)} />
      </ArticleContainer>
    );
  }
}

export default ArticleTemplate;
