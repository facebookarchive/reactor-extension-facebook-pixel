/* eslint-disable no-template-curly-in-string */
// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent, screen } from '@testing-library/react';

export const getKeyValueInputs = (template, index) => {
  const { queryByLabelText } = screen;

  return {
    keyInput: queryByLabelText(`${template.replace('${index}', index)}[key]`),
    valueInput: queryByLabelText(
      `${template.replace('${index}', index)}[value]`
    ),
    deleteButton: queryByLabelText(
      `${template.replace('${index}', index)}[delete]`
    )
  };
};

export const inputOnChange = (input, value) =>
  fireEvent.change(input, {
    target: { value }
  });
