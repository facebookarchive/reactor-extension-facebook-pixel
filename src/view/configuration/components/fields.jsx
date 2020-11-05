import React from 'react';
import { TextField, Flex } from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="pixelId"
      component={TextField}
      width="size-4600"
      label="Pixel ID"
      isRequired
      necessityIndicator="label"
      supportDataElement
    />
  </Flex>
);
