import React from 'react';
import { defaultGenerateClassNameList } from './utils';

export default function ArticleFooterContainer({
  generateClassNameList = defaultGenerateClassNameList,
  children,
}) {
  return (
    <footer className={generateClassNameList('article-template__footer').join(' ')}>
      {children}
    </footer>
  );
}

if (process.env.NODE_ENV !== 'production') {
  ArticleFooterContainer.propTypes = {
    generateClassNameList: React.PropTypes.func,
    children: React.PropTypes.node,
  };
}
