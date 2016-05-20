/* eslint-env browser */
import React from 'react';
import { defaultGenerateClassNameList } from './utils';

export default class ArticleBodyTemplate extends React.Component {
  componentDidMount() {
    const { scrollToOffset } = this.props;
    function scrollToAnchor() {
      const hashParts = window.location.hash.split('#');
      if (hashParts.length >= 2) {
        const hash = hashParts[hashParts.length - 1];
        const element = document.querySelector(`a[name=${ hash }]`);
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
        /* eslint-disable react/no-danger, id-match */
        return (
          <p
            key={key}
            dangerouslySetInnerHTML={{ __html: contentPiece }}
          />
        );
        /* eslint-enable react/no-danger, id-match */
      }
      const SpecifiedComponent = components[contentPiece.component];
      if (!SpecifiedComponent) {
        throw new Error(`Unknown component ${ contentPiece.component }`);
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
      <section
        className={generateClassNameList('article-template__section').join(' ')}
        itemProp="articleBody"
      >
        {this.renderContents(generateClassNameList, variantName, components, content)}
      </section>
    );
  }
}

ArticleBodyTemplate.defaultProps = {
  generateClassNameList: defaultGenerateClassNameList,
  components: {
    Image: 'img',
    Pullquote: 'blockquote',
    ArticleSubHead: 'h3',
  },
  content: [],
};

if (process.env.NODE_ENV !== 'production') {
  ArticleBodyTemplate.propTypes = {
    variantName: React.PropTypes.string,
    generateClassNameList: React.PropTypes.func,
    components: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
    content: React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object,
      ]),
    ).isRequired,
    scrollToOffset: React.PropTypes.number,
  };
}
