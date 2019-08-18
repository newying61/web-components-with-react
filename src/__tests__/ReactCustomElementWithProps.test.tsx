import React from 'react';
import { ReactCustomElementWithProps } from '..';

jest.mock('../BaseReactCustomElement', () => class {
  public attachShadow() {
    return document.createElement('div');
  }
  public getAttribute() {
    return 'attr value';
  }
});

describe('ReactCustomElement', () => {
  it('should render React App and unmount the App', () => {
    const ReactApp = () => <div />;

    const CustomElement = ReactCustomElementWithProps(ReactApp, ['test-prop']);

    const component = new (CustomElement as any)();

    // Mimic custom element mounted
    component.connectedCallback();

    expect(component.renderRoot.innerHTML).toBe('<div></div>');

    // Mimic unmounted
    component.disconnectedCallback();

    expect(component.renderRoot.innerHTML).toBe('');
  });

  it('should pass attributes to react app', () => {
    let renderProps: any = null;
    const ReactApp = (props: any) => {
      renderProps = props;
      return <div />;
    }

    const properties = ['test-prop1', 'testProp2'];

    const CustomElement = ReactCustomElementWithProps(ReactApp, properties) as any;

    expect(CustomElement.observedAttributes).toBe(properties);

    const component = new (CustomElement as any)();
    component.attributeChangedCallback('test-prop1', null, 'test prop value 1');
    component.attributeChangedCallback('testProp2', null, 'test prop value 2');

    // Mimic custom element mounted
    component.connectedCallback();

    expect(component.renderRoot.innerHTML).toBe('<div></div>');

    // Validate render props
    expect(renderProps.renderRoot).not.toBe(null);
    expect(renderProps.testProp1).toBe('test prop value 1');
    expect(renderProps.testProp2).toBe('test prop value 2');

    // Mimic unmounted
    component.disconnectedCallback();

    expect(component.renderRoot.innerHTML).toBe('');
  });

  it('should monitor attribute change', (done) => {
    let renderProps: any = null;
    const ReactApp = (props: any) => {
      renderProps = props;
      return <div />;
    }

    const properties = ['test-prop1', 'testProp2'];

    const CustomElement = ReactCustomElementWithProps(ReactApp, properties) as any;

    const component = new (CustomElement as any)();
    component.attributeChangedCallback('test-prop1', null, 'test prop value 1');
    component.attributeChangedCallback('testProp2', null, 'test prop value 2');

    // Mimic custom element mounted
    component.connectedCallback();

    expect(component.renderRoot.innerHTML).toBe('<div></div>');

    // Validate render props
    expect(renderProps.renderRoot).not.toBe(null);
    expect(renderProps.testProp1).toBe('test prop value 1');
    expect(renderProps.testProp2).toBe('test prop value 2');

    // Attribute is the same value, will not trigger a re-render
    component.attributeChangedCallback('test-prop1', 'test prop value 1', 'test prop value 1');

    // New atrribute value will trigger a re-render
    component.attributeChangedCallback('test-prop1', null, 'new value 1');
    Promise.resolve().then(() => {
      expect(renderProps.testProp1).toBe('new value 1');
      expect(renderProps.testProp2).toBe('test prop value 2');

      done();
    })
  });

  it('should use component instance if useShadowDOM flag is false', () => {
    const ReactApp = () => <div />;

    const CustomElement = ReactCustomElementWithProps(ReactApp, [], false);

    const component = new (CustomElement as any)();

    expect(component.renderRoot).toBe(component);
  });
});
