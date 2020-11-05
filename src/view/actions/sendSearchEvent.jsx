import React from 'react';

import ExtensionView from '../components/extensionView';

import SendSearchEventFields from './sendSearchEventComponents/fields';
import getSendSearchEventInitValues from './sendSearchEventComponents/getInitValues';
import getSendSearchEventSettings from './sendSearchEventComponents/getSettings';
import validateSendSearchEventFields from './sendSearchEventComponents/validate';

export default () => (
  <ExtensionView
    getInitialValues={({ initInfo }) => ({
      ...getSendSearchEventInitValues(initInfo)
    })}
    getSettings={({ values }) => ({
      ...getSendSearchEventSettings(values)
    })}
    validate={(values) => ({
      ...validateSendSearchEventFields(values)
    })}
    render={() => (
      <>
        <SendSearchEventFields />
      </>
    )}
  />
);
