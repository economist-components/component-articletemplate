import 'babel-polyfill';
import ArticleHeaderContainer, { ImageContainer } from '../src/header';
import ArticleFooterContainer from '../src/footer';
import ArticleSubheaderContainer from '../src/subheader';
import Articletemplate from '../src';
import React from 'react';
import article from '../example-data/article';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';

chai.use(chaiEnzyme()).should();

describe('ArticleHeaderContainer', () => {
  it('renders a React element', () => {
    React.isValidElement(<ArticleHeaderContainer />).should.equal(true);
  });
});

describe('ImageContainer', () => {
  it('renders a React element', () => {
    React.isValidElement(<ImageContainer />).should.equal(true);
  });
});

describe('ArticleSubheaderContainer', () => {
  it('renders a React element', () => {
    React.isValidElement(<ArticleSubheaderContainer />).should.equal(true);
  });
});

describe('ArticleFooterContainer', () => {
  it('renders a React element', () => {
    React.isValidElement(<ArticleFooterContainer />).should.equal(true);
  });
});

describe('Articletemplate', () => {
  let props = null;
  beforeEach(() => {
    props = {
      id: article.id,
      slug: article.attributes.slug,
      title: article.attributes.title,
      flytitle: article.attributes.flytitle,
      rubric: article.attributes.rubric,
      mainImage: article.attributes.mainimage,
      content: article.attributes.content,
      sectionName: article.attributes.section,
    };
  });

  it('renders a React element', () => {
    React.isValidElement(<Articletemplate {...props} />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let articletemplate = null;
    beforeEach(() => {
      rendered = mount(<Articletemplate {...props} />);
      articletemplate = rendered.find('.article-template');
    });

    it('renders a top level div.articletemplate', () => {
      articletemplate.should.have.tagName('article');
      articletemplate.should.have.attr('itemtype', 'http://schema.org/NewsArticle');
    });

    describe('with components', () => {
      let extendedProps = null;
      const ArticleHeader = 'foo';
      const ArticleSubheader = 'bar';
      const ArticleFooter = 'baz';
      beforeEach(() => {
        extendedProps = {
          components: {
            ArticleHeader,
            ArticleSubheader,
            ArticleFooter,
          },
          ...props,
        };
        rendered = mount(<Articletemplate {...extendedProps} />);
        articletemplate = rendered.find('.article-template');
      });

      it('should render a header', () => {
        articletemplate.should.to.have.descendants('foo');
      });

      it('should render a subheader', () => {
        articletemplate.should.to.have.descendants('bar');
      });

      it('should render a footer', () => {
        articletemplate.should.to.have.descendants('baz');
      });
    });
  });
});
