import React from 'react';
import Checkbox from '@coralui/redux-form-react-coral/lib/Checkbox';
import { Field } from 'redux-form';

import DisclosureButton from './disclosureButton';
import './advancedOptions.styl';

export default class AdvancedEventOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  toggleSelected = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    let advancedPanel;

    if (this.state.expanded) {
      advancedPanel = (
        <div className="u-gapTop">
          <Field
            name="sendDataToAdobe"
            className="u-block"
            component={ Checkbox }
          >
            Send data to Facebook and Adobe (demo only)
          </Field>
        </div>
      );
    }

    return (
      <div>
        <div className="AdvancedOptions-disclosureButtonContainer">
          <DisclosureButton
            label="Advanced"
            selected={ this.state.expanded }
            onClick={ this.toggleSelected }
          />
        </div>
        { advancedPanel }
      </div>
    );
  }
}

export const formConfig = {
  settingsToFormValues(values, settings) {
    return {
      ...values,
      sendDataToAdobe: settings.sendDataToAdobe
    };
  },
  formValuesToSettings(settings, values) {
    return {
      ...settings,
      sendDataToAdobe: values.sendDataToAdobe
    };
  }
};
