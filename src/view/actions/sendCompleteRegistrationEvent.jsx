import React from 'react';

import ExtensionView from '../components/extensionView';

import ValueCurrency from './fields/valueCurrency'
import ContentName from './fields/contentName'
import Status from './fields/status'

import initialValues from './helpers/getInitValues'
import settings from './helpers/getSettings'
import validate from './helpers/validate'

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
        <Status />
        <ContentName />

      </>
    )}
  />
);
