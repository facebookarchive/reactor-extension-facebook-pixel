import React from 'react';
import { TextField, Flex } from '@adobe/react-spectrum';
import WrappedField from '../../components/wrappedField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedField
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
