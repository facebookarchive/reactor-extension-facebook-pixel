import React from 'react';

import ExtensionView from '../components/extensionView';

import ValueCurrency from './fields/valueCurrency';
import ContentCategory from './fields/contentCategory';
import ContentIds from './fields/contentIds';
import Contents from './fields/contents';
import ContentType from './fields/contentType';
import ContentName from './fields/contentName';

import initialValues from './helpers/getInitValues';
import settings from './helpers/getSettings';
import validate from './helpers/validate';

export default () => (
  <ExtensionView
    getInitialValues={({ initInfo }) => ({
      ...initialValues(initInfo)
    })}
    getSettings={({ values }) => ({
      ...settings(values)
    })}
    validate={(values) => ({
      ...validate(values)
    })}
    render={() => (
      <>
        <ValueCurrency />
        <ContentCategory />
        <ContentIds />
        <Contents />
        <ContentType />
        <ContentName />
      </>
    )}
  />
);
