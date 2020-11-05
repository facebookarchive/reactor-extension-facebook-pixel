/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* eslint-disable no-template-curly-in-string */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import SendCustomEvent from '../sendCustomEvent';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

import {
  inputOnChange,
  getKeyValueInputs
} from '../../__tests_helpers__/jsDomHelpers';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getFromFields = () => {
  const { queryByLabelText } = screen;

  return {
    eventNameInput: queryByLabelText(/name/i),
    addButton: queryByLabelText(/add new row/i)
  };
};

describe('Configuration view', () => {
  beforeEach(() => {
    render(<SendCustomEvent />);
  });

  test('sets form values from settings', async () => {
    await act(async () => {
      extensionBridge.init({
        settings: {
          name: 'custom event',
          parameters: [{ key: 'a', value: 'b' }]
        }
      });
    });

    const { eventNameInput } = getFromFields();
    expect(eventNameInput.value).toBe('custom event');

    const { keyInput, valueInput } = getKeyValueInputs(
      'parameters[${index}]',
      0
    );
    expect(keyInput.value).toBe('a');
    expect(valueInput.value).toBe('b');
  });

  test('sets settings from form values', async () => {
    await act(async () => {
      extensionBridge.init({
        settings: {
          name: 'custom event',
          parameters: [{ key: 'a', value: 'b' }]
        }
      });
    });

    const { eventNameInput } = getFromFields();

    await act(async () => {
      inputOnChange(eventNameInput, 'custom event 2');
    });

    const { keyInput, valueInput } = getKeyValueInputs(
      'parameters[${index}]',
      0
    );

    await act(async () => {
      inputOnChange(keyInput, 'aa');
      inputOnChange(valueInput, 'bb');
    });

    expect(extensionBridge.getSettings()).toEqual({
      name: 'custom event 2',
      parameters: [{ key: 'aa', value: 'bb' }]
    });
  });

  test('handles form validation correctly', async () => {
    await act(async () => {
      extensionBridge.init({
        settings: {
          name: 'custom event',
          parameters: [{ key: 'a', value: 'b' }]
        }
      });
    });

    const { eventNameInput } = getFromFields();

    // Validate case when inputs have empty values.
    // 1. Check fields are not invalid.
    expect(eventNameInput).not.toHaveAttribute('aria-invalid');

    // 2. Change input values.
    inputOnChange(eventNameInput, '');

    await act(async () => {
      extensionBridge.validate();
    });

    // 3. Assert result.
    expect(eventNameInput).toHaveAttribute('aria-invalid', 'true');

    // Validate case when key input is not empty and value input is empty.
    // 1. Check fields are not invalid.

    let { keyInput, valueInput } = getKeyValueInputs('parameters[${index}]', 0);

    expect(keyInput).not.toHaveAttribute('aria-invalid');
    expect(valueInput).not.toHaveAttribute('aria-invalid');

    // 2. Change input values.
    await act(async () => {
      inputOnChange(valueInput, '');
    });

    // 3. Assert result.
    expect(keyInput).not.toHaveAttribute('aria-invalid');
    expect(valueInput).toHaveAttribute('aria-invalid');

    // Validate case when key input is empty and value input is not empty.

    await act(async () => {
      extensionBridge.init({
        settings: {
          name: 'custom event',
          parameters: [{ key: 'a', value: 'b' }]
        }
      });
    });

    // 1. Check fields are not invalid.
    ({ keyInput, valueInput } = getKeyValueInputs('parameters[${index}]', 0));

    expect(keyInput).not.toHaveAttribute('aria-invalid');
    expect(valueInput).not.toHaveAttribute('aria-invalid');

    // 2. Change input values.
    await act(async () => {
      inputOnChange(keyInput, '');
    });

    // 3. Assert result.
    expect(keyInput).toHaveAttribute('aria-invalid');
    expect(valueInput).not.toHaveAttribute('aria-invalid');

    // Validate case when key input is duplicated.

    await act(async () => {
      extensionBridge.init({
        settings: {
          name: 'custom event',
          parameters: [
            { key: 'a', value: 'b' },
            { key: 'c', value: 'd' }
          ]
        }
      });
    });

    // 1. Check fields are not invalid.
    ({ keyInput, valueInput } = getKeyValueInputs('parameters[${index}]', 0));
    const { keyInput: keyInput1, valueInput: valueInput1 } = getKeyValueInputs(
      'parameters[${index}]',
      1
    );

    expect(keyInput).not.toHaveAttribute('aria-invalid');
    expect(valueInput).not.toHaveAttribute('aria-invalid');
    expect(keyInput1).not.toHaveAttribute('aria-invalid');
    expect(valueInput1).not.toHaveAttribute('aria-invalid');

    // 2. Change input values.
    await act(async () => {
      inputOnChange(keyInput1, 'a');
    });

    // 3. Assert result.
    expect(keyInput1).toHaveAttribute('aria-invalid');
    expect(valueInput1).not.toHaveAttribute('aria-invalid');
  });

  describe('key value editor', () => {
    test('allows you to add a new row', async () => {
      await act(async () => {
        extensionBridge.init({
          settings: {
            name: 'custom event',
            parameters: [{ key: 'a', value: 'b' }]
          }
        });
      });

      await act(async () => {
        const { addButton } = getFromFields();
        fireEvent.click(addButton);
      });

      await act(async () => {
        const { keyInput, valueInput } = getKeyValueInputs(
          'parameters[${index}]',
          1
        );

        inputOnChange(keyInput, 'c');
        inputOnChange(valueInput, 'd');
      });

      expect(extensionBridge.getSettings()).toEqual({
        name: 'custom event',
        parameters: [
          { key: 'a', value: 'b' },
          { key: 'c', value: 'd' }
        ]
      });
    });

    test('allows you to delete a row', async () => {
      await act(async () => {
        extensionBridge.init({
          settings: {
            name: 'custom event',
            parameters: [
              { key: 'a', value: 'b' },
              { key: 'c', value: 'd' }
            ]
          }
        });
      });

      const { deleteButton } = getKeyValueInputs('parameters[${index}]', 1);
      await act(async () => {
        fireEvent.click(deleteButton);
      });

      expect(extensionBridge.getSettings()).toEqual({
        name: 'custom event',
        parameters: [{ key: 'a', value: 'b' }]
      });
    });

    test('adds an empty row when there are no parameters', async () => {
      await act(async () => {
        extensionBridge.init({
          settings: {
            name: 'custom event'
          }
        });
      });

      const { keyInput, valueInput } = getKeyValueInputs(
        'parameters[${index}]',
        0
      );

      expect(keyInput).not.toBeNull();
      expect(valueInput).not.toBeNull();
    });

    test('does not show a delete button when there is only one empty row', async () => {
      await act(async () => {
        extensionBridge.init({
          settings: {
            name: 'custom event'
          }
        });
      });

      const { deleteButton } = getKeyValueInputs('parameters[${index}]', 1);
      expect(deleteButton).toBeNull();
    });
  });
});
