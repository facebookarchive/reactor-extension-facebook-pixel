import React from 'react';
import { TextField, Flex } from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="value"
      component={TextField}
      autoFocus
      width="size-4600"
      label="Value"
      necessityIndicator="label"
      supportDataElement
    />

    <WrappedTextField
      name="currency"
      component={TextField}
      width="size-4600"
      label="Currency"
      necessityIndicator="label"
      supportDataElement
    />
  </Flex>
);
