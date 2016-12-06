import React from 'react';
import Textfield from '@coralui/redux-form-react-coral/lib/Textfield';
import { Field } from 'redux-form';
import DecoratedInput from '@reactor/react-components/lib/reduxForm/decoratedInput';

export default () => (
  <div>
    <label>
      <span className="Label">Value</span>
      <div>
        <Field
          name="value"
          component={ DecoratedInput }
          inputComponent={ Textfield }
          supportDataElement
        />
      </div>
    </label>
    <label>
      <span className="Label">Currency</span>
      <div>
        <Field
          name="currency"
          component={ DecoratedInput }
          inputComponent={ Textfield }
          supportDataElement
        />
      </div>
    </label>
  </div>
);

export const formConfig = {
  settingsToFormValues: (values, settings) => ({
    ...values,
    value: settings.value,
    currency: settings.currency
  }),
  formValuesToSettings: (settings, values) => ({
    ...settings,
    value: values.value,
    currency: values.currency
  })
};
