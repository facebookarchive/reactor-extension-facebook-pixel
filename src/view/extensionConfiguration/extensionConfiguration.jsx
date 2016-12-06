import React from 'react';
import Textfield from '@coralui/redux-form-react-coral/lib/Textfield';
import { Field } from 'redux-form';
import DecoratedInput from '@reactor/react-components/lib/reduxForm/decoratedInput';
import AdvancedOptions, { formConfig as advancedOptionsFormConfig } from './components/advancedOptions';
import { mergeConfigs } from '../utils/formConfigUtils';

export default ({ ...props }) => (
  <div>
    <label>
      <span className="Label">Pixel ID</span>
      <div>
        <Field
          name="pixelId"
          component={ DecoratedInput }
          inputComponent={ Textfield }
          supportDataElement
        />
      </div>
    </label>
    <AdvancedOptions fields={ props.fields } />
  </div>
);

export const formConfig = mergeConfigs(
  advancedOptionsFormConfig,
  {
    settingsToFormValues: (values, settings) => ({
      ...values,
      pixelId: settings.pixelId
    }),
    formValuesToSettings: (settings, values) => ({
      ...settings,
      pixelId: values.pixelId
    }),
    validate(errors, values) {
      errors = {
        ...errors
      };

      if (!values.pixelId) {
        errors.pixelId = 'Please specify your Facebook Pixel ID';
      }

      return errors;
    }
  }
);
