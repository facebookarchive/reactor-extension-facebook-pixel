import React from 'react';
import Textfield from '@coralui/redux-form-react-coral/lib/Textfield';
import { Field } from 'redux-form';
import DecoratedInput from '@reactor/react-components/lib/reduxForm/decoratedInput';

export default () => (
  <div>
    <label>
      <span className="Label">Search String</span>
      <div>
        <Field
          name="searchString"
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
    searchString: settings.searchString
  }),
  formValuesToSettings: (settings, values) => ({
    ...settings,
    searchString: values.searchString
  }),
  validate(errors, values) {
    errors = {
      ...errors
    };

    if (!values.searchString) {
      errors.searchString = 'Please specify a search string';
    }

    return errors;
  }
};
