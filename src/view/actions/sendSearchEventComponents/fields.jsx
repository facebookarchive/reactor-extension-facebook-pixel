import React from 'react';
import { TextField, Flex } from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedTextField
      name="searchString"
      component={TextField}
      width="size-4600"
      label="Search String"
      isRequired
      necessityIndicator="label"
      supportDataElement
    />
  </Flex>
);
