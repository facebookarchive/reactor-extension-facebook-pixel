import React from 'react';
import { TextField, Flex } from '@adobe/react-spectrum';
import WrappedField from '../../components/wrappedField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedField
      name="value"
      component={TextField}
      autoFocus
      width="size-4600"
      label="Value"
      necessityIndicator="label"
      supportDataElement
    />

    <WrappedField
      name="currency"
      component={TextField}
      width="size-4600"
      label="Currency"
      necessityIndicator="label"
      supportDataElement
    />
  </Flex>
);
