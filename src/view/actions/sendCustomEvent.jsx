import React from 'react';

import { Flex } from '@adobe/react-spectrum';

import ExtensionView from '../components/extensionView';

import CustomEventFields from './sendCustomEventComponents/fields';
import getCustomEventInitValues from './sendCustomEventComponents/getInitValues';
import getCustomEventSettings from './sendCustomEventComponents/getSettings';
import validateCustomEventFields from './sendCustomEventComponents/validate';

import KeyValueEditor from './sendCustomEventComponents/keyValueEditor';
import getKeyValueEditorInitValues from './sendCustomEventComponents/getKeyValueEditorInitValues';
import getKeyValueEditorSettings from './sendCustomEventComponents/getKeyValueEditorSettings';
import validateKeyValueEditor from './sendCustomEventComponents/validateKeyValueEditor';

export default () => (
  <ExtensionView
    getInitialValues={({ initInfo }) => ({
      ...getCustomEventInitValues(initInfo),
      ...getKeyValueEditorInitValues(initInfo)
    })}
    getSettings={({ values }) => ({
      ...getCustomEventSettings(values),
      ...getKeyValueEditorSettings(values)
    })}
    validate={(values) => ({
      ...validateCustomEventFields(values),
      ...validateKeyValueEditor(values)
    })}
    render={() => (
      <Flex direction="column" gap="size-65">
        <CustomEventFields />
        <KeyValueEditor
          formKeyName="parameters"
          keyLabel="Key"
          keyProperty="key"
          valueLabel="Value"
          valueProperty="value"
        />
      </Flex>
    )}
  />
);
