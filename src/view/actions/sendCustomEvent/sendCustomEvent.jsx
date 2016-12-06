import React from 'react';
import { Field, FieldArray } from 'redux-form';
import Textfield from '@coralui/redux-form-react-coral/lib/Textfield';
import DecoratedInput from '@reactor/react-components/lib/reduxForm/decoratedInput';
import Button from '@coralui/react-coral/lib/Button';

const renderParameters = ({ fields }) => {
  const rows = fields.map((field, index) => (
    <tr key={ index }>
      <td>
        <Field
          name={ `${field}.key` }
          component={ DecoratedInput }
          inputComponent={ Textfield }
        />
      </td>
      <td>
        <span className="Label u-gapLeft u-gapRight">=</span>
      </td>
      <td>
        <Field
          name={ `${field}.value` }
          component={ DecoratedInput }
          inputComponent={ Textfield }
          supportDataElement
        />
      </td>
      <td>
        {
          fields.length > 1 ?
            <Button
              className="u-gapLeft2x"
              variant="quiet"
              icon="close"
              iconSize="S"
              square
              onClick={ fields.remove.bind(this, index) }
            /> : null
        }
      </td>
    </tr>
  ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              Key
            </th>
            <th />
            <th>
              Value
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
      <Button
        onClick={ () => fields.push({}) }
        className="u-gapTop"
      >
        Add
      </Button>
    </div>
  );
};

export default () => (
  <div>
    <label>
      <span className="Label">Event Name</span>
      <div className="u-gapBottom2x">
        <Field
          name="name"
          component={ DecoratedInput }
          inputComponent={ Textfield }
          supportDataElement
        />
      </div>
    </label>
    <FieldArray
      name="parameters"
      component={ renderParameters }
    />
  </div>
);

export const formConfig = {
  settingsToFormValues(values, settings) {
    const parameters = settings.parameters || [];

    if (!parameters.length) {
      parameters.push({});
    }

    return {
      ...values,
      name: settings.name,
      parameters
    };
  },
  formValuesToSettings(settings, values) {
    let { parameters } = values;

    parameters = parameters
      .filter(parameter => parameter.key && parameter.value)
      .map((parameter) => {
        parameter = {
          ...parameter
        };

        return parameter;
      });

    settings = {
      ...settings,
      name: values.name
    };

    if (parameters.length) {
      settings = {
        ...settings,
        parameters
      };
    }

    return settings;
  },
  validate(errors, values) {
    // The intent here is that we want to allow users to have rows where neither an parameter key
    // nor a parameter value is provided. We can ignore these rows when we're outputting settings.
    // However, at least one customerId must be configured.
    const configuredParameters = [];

    const parametersErrors = (values.parameters || []).map((parameter) => {
      const parameterErrors = {};

      if (parameter.key && !parameter.value) {
        parameterErrors.value = 'Please provide a value';
      } else if (!parameter.key && parameter.value) {
        parameterErrors.key = 'Please provide a key';
      }

      if (configuredParameters.indexOf(parameter.key) !== -1) {
        parameterErrors.key =
          `Key ${parameter.key} is already configured`;
      } else if (parameter.key) {
        configuredParameters.push(parameter.key);
      }

      return parameterErrors;
    });

    let nameErrors = '';
    if (!values.name) {
      nameErrors = 'Please provide an event name';
    }

    return {
      ...errors,
      name: nameErrors,
      parameters: parametersErrors
    };
  }
};
