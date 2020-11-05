import React from 'react';

import ExtensionView from '../components/extensionView';

import ConfigurationFields from './components/fields';
import getConfigurationInitValues from './components/getInitValues';
import getConfigurationSettings from './components/getSettings';
import validateConfigurationFields from './components/validate';

export default () => (
  <ExtensionView
    getInitialValues={({ initInfo }) => ({
      ...getConfigurationInitValues(initInfo)
    })}
    getSettings={({ values }) => ({
      ...getConfigurationSettings(values)
    })}
    validate={(values) => ({
      ...validateConfigurationFields(values)
    })}
    render={() => (
      <>
        <ConfigurationFields />
      </>
    )}
  />
);
