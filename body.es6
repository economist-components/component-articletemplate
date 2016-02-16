import React, { Component, PropTypes } from 'react';
import { defaultGenerateClassNameList } from './utils';

export function ArticleBodyContainer({ generateClassNameList, children }) {
  return (
    <section
      className={generateClassNameList('ArticleTemplate--section').join(' ')}
      itemProp="articleBody"
    >
      {children}
    </section>
  );
}

ArticleBodyContainer.propTypes = {
  generateClassNameList: PropTypes.func,
  children: PropTypes.node,
};

class ArticleBodyTemplate extends Component {
  static get propTypes() {
    return {
      variantName: PropTypes.string,
      generateClassNameList: PropTypes.func,
      components: PropTypes.object,
      content: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])).isRequired,
      scrollToOffset: PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      generateClassNameList: defaultGenerateClassNameList,
      components: {
        Image: 'img',
        Pullquote: 'blockquote',
        ArticleSubHead: 'h3',
      },
      content: [],
      scrollToOffset: 0,
    };
  }

  componentDidMount() {
    const { scrollToOffset } = this.props;
    function scrollToAnchor() {
      const hashParts = window.location.hash.split('#');
      if (hashParts.length >= 2) {
        const hash = hashParts[hashParts.length - 1];
        const element = document.querySelector(`a[name=${hash}]`);
        if (element) {
          const top = Math.floor(element.getBoundingClientRect().top - scrollToOffset);
          window.scrollTo(0, top);
        }
      }
    }

    if (window && window.location && window.location.hash) {
      scrollToAnchor();
      window.onhashchange = scrollToAnchor;
    } else {
      window.scrollTo(0, 0);
    }
  }

  renderContents(generateClassNameList, variantName, components, contents = []) {
    if (Array.isArray(contents) === false || contents.length === 0) {
      return [];
    }

    return contents.map((contentPiece, key) => {
      if (typeof contentPiece === 'string') {
        // `dangerouslySetInnerHTML` is used here to support `<a>`, `<em>`
        // `<strong>`, etc, tags within the paragraph strings.
        // See: https://github.com/economist-components/component-articletemplate/pull/11#discussion_r43002610
        return (
          <p
            key={key}
            dangerouslySetInnerHTML={{ __html: contentPiece }} // eslint-disable-line react/no-danger, id-match
          />
        );
      }
      const SpecifiedComponent = components[contentPiece.component];
      if (!SpecifiedComponent) {
        throw new Error(`Unknown component ${contentPiece.component}`);
      }
      const children = this.renderContents(generateClassNameList, variantName, components, contentPiece.content);
      return (
        <SpecifiedComponent
          key={key}
          variantName={variantName}
          generateClassNameList={generateClassNameList}
          {...contentPiece.props}
        >
          {children}
        </SpecifiedComponent>
      );
    });
  }

  render() {
    const { variantName, generateClassNameList, content, components } = this.props;
    return (
      <ArticleBodyContainer generateClassNameList={generateClassNameList}>
        {this.renderContents(generateClassNameList, variantName, components, content)}
      </ArticleBodyContainer>
    );
  }

}

export default ArticleBodyTemplate;
