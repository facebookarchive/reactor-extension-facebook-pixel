import React from 'react';
import {
  TextField,
  Flex,
  Content,
  Heading,
  Text,
  ActionButton
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import Delete from '@spectrum-icons/workflow/Delete';
import { useFormContext, useFieldArray } from 'react-hook-form';
import WrappedTextField from '../../components/wrappedTextField';

const getEmptyRow = (keyProperty, valueProperty) => {
  const newRow = {};
  newRow[keyProperty] = '';
  newRow[valueProperty] = '';

  return newRow;
};

export default ({
  keyLabel,
  keyProperty,
  valueLabel,
  valueProperty,
  formKeyName
}) => {
  const { control, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: formKeyName
  });

  return (
    <Flex direction="column">
      <Flex direction="row">
        <Heading
          level={4}
          marginBottom="size-100"
          minWidth="size-4600"
          marginStart="size-100"
        >
          {keyLabel}
        </Heading>
        <Content marginTop="size-65" minWidth="size-300">
          &nbsp;
        </Content>
        <Heading level={4} marginBottom="size-100" minWidth="size-4600">
          {valueLabel}
        </Heading>
      </Flex>

      {fields.map((item, index, allValues) => {
        let showDeleteButton = true;

        // We don't want to show the delete button when there is only one row
        // and all fields of the row are empty.
        if (allValues.length === 1) {
          const formValues = getValues()[formKeyName];
          if (
            formValues &&
            !formValues[index][keyProperty] &&
            !formValues[index][valueProperty]
          ) {
            showDeleteButton = false;
          }
        }

        return (
          <Flex key={item.id} direction="row" gap="size-100">
            <WrappedTextField
              name={`${formKeyName}[${index}][${keyProperty}]`}
              aria-label={`${formKeyName}[${index}][${keyProperty}]`}
              component={TextField}
              width="size-4600"
              isRequired
              defaultValue={item[keyProperty]}
            />
            <Content marginTop="size-65">=</Content>
            <WrappedTextField
              name={`${formKeyName}[${index}][${valueProperty}]`}
              aria-label={`${formKeyName}[${index}][${valueProperty}]`}
              component={TextField}
              width="size-4600"
              isRequired
              supportDataElement
              defaultValue={item[valueProperty]}
            />
            {showDeleteButton ? (
              <ActionButton
                aria-label={`${formKeyName}[${index}][delete]`}
                onPress={() => {
                  remove(index);

                  // It seems you cannot remove and add an empty row at the same time.
                  if (allValues.length === 1) {
                    setTimeout(() =>
                      append(getEmptyRow(keyProperty, valueProperty))
                    );
                  }
                }}
              >
                <Delete />
              </ActionButton>
            ) : null}
          </Flex>
        );
      })}

      <ActionButton
        aria-label="add new row"
        marginTop="size-200"
        width="size-1250"
        onPress={() => append(getEmptyRow(keyProperty, valueProperty))}
      >
        <Add />
        <Text>Add</Text>
      </ActionButton>
    </Flex>
  );
};
