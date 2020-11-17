import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  TextField,
  Flex,
  RadioGroup,
  Radio,
  Checkbox
} from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

export default () => {
  const { control } = useFormContext();
  const [showLduOption, setShowLduOption] = useState(true);

  return (
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

      <Controller
        control={control}
        name="lduEnabled"
        defaultValue=""
        render={({ onChange, value }) => {
          return (
            <Checkbox
              isSelected={value}
              onChange={(v) => {
                onChange(v);
                setShowLduOption(v);
              }}
            >
              Enable Limited Data Use
            </Checkbox>
          );
        }}
      />

      <Controller
        control={control}
        name="lduOption"
        defaultValue=""
        render={({ onChange, value }) => {
          return showLduOption ? (
            <RadioGroup
              label="Data processing options"
              value={value}
              onChange={onChange}
            >
              <Radio value="auto">Auto Detect</Radio>
              <Radio value="california">Only California</Radio>
            </RadioGroup>
          ) : null;
        }}
      />
    </Flex>
  );
};
