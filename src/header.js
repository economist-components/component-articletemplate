import React from 'react';
import { defaultGenerateClassNameList } from './utils';

export default function ArticleHeaderContainer({
  generateClassNameList = defaultGenerateClassNameList,
  children,
}) {
  return (
    <header className={generateClassNameList('article-template__header').join(' ')}>
      {children}
    </header>
  );
}

if (process.env.NODE_ENV !== 'production') {
  ArticleHeaderContainer.propTypes = {
    generateClassNameList: React.PropTypes.func,
    children: React.PropTypes.node,
  };
}

export function ImageContainer({
  generateClassNameList = defaultGenerateClassNameList,
  children,
}) {
  return (
    <div className={generateClassNameList('article-template__imagecontainer').join(' ')}>
      <div className={generateClassNameList('article-template__imagecontainer-inner').join(' ')}>
        {children}
      </div>
    </div>
  );
}

if (process.env.NODE_ENV !== 'production') {
  ImageContainer.propTypes = {
    generateClassNameList: React.PropTypes.func,
    children: React.PropTypes.node,
  };
}
