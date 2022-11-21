import React from 'react';
import { TextField, Flex } from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="num_items"
      component={TextField}
      autoFocus
      width="size-4600"
      label="Num. Items"
      necessityIndicator="label"
      supportDataElement
    />
  </Flex>
);
