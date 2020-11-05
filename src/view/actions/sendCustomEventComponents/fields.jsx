import React from 'react';
import { TextField } from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

export default () => (
  <WrappedTextField
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
