import React from 'react';
import { TextField } from '@adobe/react-spectrum';
import WrappedField from '../../components/wrappedField';

export default () => (
  <WrappedField
    name="name"
    component={TextField}
    width="size-4600"
    label="Event Name"
    isRequired
    necessityIndicator="label"
    autoFocus
    supportDataElement
  />
);
