import React from 'react';
import { defaultGenerateClassNameList } from './utils';

const extendedSubheaderClasses = [
  'margin-l-1',
  'gutter-l',
  'col-10',
];
export default function ArticleSubheaderContainer({
  generateClassNameList = defaultGenerateClassNameList,
  children,
}) {
  return (
    <header
      className={[ ...generateClassNameList('article-template__subheader'), ...extendedSubheaderClasses ].join(' ')}
    >
      {children}
    </header>
  );
}

if (process.env.NODE_ENV !== 'production') {
  ArticleSubheaderContainer.propTypes = {
    generateClassNameList: React.PropTypes.func,
    children: React.PropTypes.node,
  };
}
