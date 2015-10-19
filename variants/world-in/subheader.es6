import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { ArticleSubheaderContainer } from '../../subheader';

const ArticleSubheaderItem = ({ generateClassNameList, SubheaderItemComponent = 'h2', className, itemProp, children }) => (
  <SubheaderItemComponent
    className={classnames(
      generateClassNameList(className),
      'margin-l-1',
      'gutter-l',
      'col-10'
    )}
    itemProp={itemProp}
  >
    {children}
  </SubheaderItemComponent>
);
const Byline = ({ generateClassNameList, children }) => (
  <ArticleSubheaderItem
    generateClassNameList={generateClassNameList}
    SubheaderItemComponent={'h2'}
    className="ArticleTemplate--byline"
    itemProp="byline">
    {children}
  </ArticleSubheaderItem>
);
const PublishDate = ({ generateClassNameList, children }) => (
  <ArticleSubheaderItem
    generateClassNameList={generateClassNameList}
    SubheaderItemComponent={'h2'}
    className="ArticleTemplate--pubdate"
    itemProp="publishdate">
    {children}
  </ArticleSubheaderItem>
);
const Section = ({ generateClassNameList, children }) => (
  <ArticleSubheaderItem
    generateClassNameList={generateClassNameList}
    SubheaderItemComponent={'h2'}
    className="ArticleTemplate--section-section"
    itemProp="section">
    {children}
  </ArticleSubheaderItem>
);

export class WinSubheader extends React.Component {
  static get propTypes() {
    return {
      generateClassNameList: PropTypes.func,
      sectionName: PropTypes.string,
    };
  }

  render() {
    const { generateClassNameList, sectionName } = this.props;
    return (
      <ArticleSubheaderContainer generateClassNameList={generateClassNameList}>
        <Byline generateClassNameList={generateClassNameList}>By-line to follow</Byline>
        <PublishDate generateClassNameList={generateClassNameList}>Publish date to follow</PublishDate>
        <Section generateClassNameList={generateClassNameList}>{sectionName}</Section>
      </ArticleSubheaderContainer>
    );
  }
}

export class WinLeaderSubheader extends React.Component {
  static get propTypes() {
    return {
      generateClassNameList: PropTypes.func,
      sectionName: PropTypes.string,
    };
  }

  render() {
    const { generateClassNameList, sectionName } = this.props;
    return (
      <ArticleSubheaderContainer generateClassNameList={generateClassNameList}>
        <PublishDate generateClassNameList={generateClassNameList}>Publish date to follow</PublishDate>
        <Section generateClassNameList={generateClassNameList}>{sectionName}</Section>
      </ArticleSubheaderContainer>
    );
  }
}
