import { mount } from 'enzyme';
import Textfield from '@coralui/react-coral/lib/Textfield';
import ErrorTip from '@reactor/react-components/lib/errorTip';
import ExtensionConfiguration, { formConfig } from '../extensionConfiguration';
import createExtensionBridge from '../../__tests__/helpers/createExtensionBridge';
import bootstrap from '../../bootstrap';

const getReactComponents = wrapper => ({
  pixelIdField: wrapper.find(Textfield).node,
  pixelIdErrorTip: wrapper.find(ErrorTip).node
});

describe('parameters', () => {
  let extensionBridge;
  let instance;

  beforeEach(() => {
    extensionBridge = createExtensionBridge();
    instance = mount(bootstrap(ExtensionConfiguration, formConfig, extensionBridge));
  });

  it('sets form values from settings', () => {
    extensionBridge.init({
      settings: {
        pixelId: '12345'
      }
    });

    const {
      pixelIdField
    } = getReactComponents(instance);

    expect(pixelIdField.props.value).toBe('12345');
  });

  it('sets settings from form values', () => {
    extensionBridge.init();

    const {
      pixelIdField
    } = getReactComponents(instance);

    pixelIdField.props.onChange('123456');

    expect(extensionBridge.getSettings()).toEqual({
      pixelId: '123456',
      sendDataToAdobe: undefined
    });
  });

  it('sets pixelId as invalid if the value is not provided', () => {
    extensionBridge.init({
      settings: {
        pixelId: '12345'
      }
    });

    const {
      pixelIdField
    } = getReactComponents(instance);

    pixelIdField.props.onChange('');
    extensionBridge.validate();

    const {
      pixelIdErrorTip
    } = getReactComponents(instance);

    expect(pixelIdErrorTip).toBeDefined();
  });
});
