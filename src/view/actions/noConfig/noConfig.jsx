import React from 'react';
import Alert from '@coralui/react-coral/lib/Alert';

export default () => (
  <Alert header="INFO">
    This delegate doesn&apos;t have any configuration properties.
  </Alert>
);

export const formConfig = {
  settingsToFormValues(values, settings) {
    return {
      ...values,
      ...settings
    };
  },
  formValuesToSettings(settings, values) {
    return {
      ...settings,
      ...values
    };
  }
};
