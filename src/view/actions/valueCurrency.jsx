import React from 'react';

import ExtensionView from '../components/extensionView';

import ValueCurrencyFields from './valueCurrencyComponents/fields';
import getValueCurrencyInitValues from './valueCurrencyComponents/getInitValues';
import getValueCurrencySettings from './valueCurrencyComponents/getSettings';
import validateValueCurrencyFields from './valueCurrencyComponents/validate';

export default () => (
  <ExtensionView
    getInitialValues={({ initInfo }) => ({
      ...getValueCurrencyInitValues(initInfo)
    })}
    getSettings={({ values }) => ({
      ...getValueCurrencySettings(values)
    })}
    validate={(values) => ({
      ...validateValueCurrencyFields(values)
    })}
    render={() => (
      <>
        <ValueCurrencyFields />
      </>
    )}
  />
);
