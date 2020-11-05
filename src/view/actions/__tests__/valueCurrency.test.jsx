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
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ValueCurrency from '../valueCurrency';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

import { inputOnChange } from '../../__tests_helpers__/jsDomHelpers';

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
    valueInput: queryByLabelText(/value/i),
    currencyInput: queryByLabelText(/currency/i)
  };
};

describe('Configuration view', () => {
  beforeEach(() => {
    render(<ValueCurrency />);
  });

  test('sets form values from settings', async () => {
    await act(async () => {
      extensionBridge.init({
        settings: {
          value: 'abc',
          currency: 'USD'
        }
      });
    });

    const { valueInput, currencyInput } = getFromFields();

    expect(valueInput.value).toBe('abc');
    expect(currencyInput.value).toBe('USD');
  });

  test('sets settings from form values', async () => {
    await act(async () => {
      extensionBridge.init({
        settings: {
          value: 'abc',
          currency: 'USD'
        }
      });
    });

    const { valueInput, currencyInput } = getFromFields();

    await act(async () => {
      inputOnChange(valueInput, 'abcd');
      inputOnChange(currencyInput, 'EUR');
    });

    expect(extensionBridge.getSettings()).toEqual({
      value: 'abcd',
      currency: 'EUR'
    });
  });
});
