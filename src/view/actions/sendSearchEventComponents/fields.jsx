import React from 'react';
import { TextField, Flex } from '@adobe/react-spectrum';
import WrappedField from '../../components/wrappedField';

export default () => (
  <Flex direction="column" gap="size-65">
    <WrappedField
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
