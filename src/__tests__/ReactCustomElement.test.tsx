import React from 'react';
import { ReactCustomElement } from '..';

jest.mock('../BaseReactCustomElement', () => class {
  public attachShadow() {
    return document.createElement('div');
  }
});

describe('ReactCustomElement', () => {
  it('should render React App and unmount the App', () => {
    const ReactApp = () => <div />;

    const CustomElement = ReactCustomElement(ReactApp);

    const component = new (CustomElement as any)();

    // Mimic custom element mounted
    component.connectedCallback();

    expect(component.renderRoot.innerHTML).toBe('<div></div>');

    // Mimic unmounted
    component.disconnectedCallback();

    expect(component.renderRoot.innerHTML).toBe('');
  });

  it('should use component instance if useShadowDOM flag is false', () => {
    const ReactApp = () => <div />;

    const CustomElement = ReactCustomElement(ReactApp, false);

    const component = new (CustomElement as any)();

    expect(component.renderRoot).toBe(component);
  });

  it('should use component instance if shadowDOM polyfilled', () => {
    const ReactApp = () => <div />;
    (window as any).ShadyDOM = {};

    const CustomElement = ReactCustomElement(ReactApp);

    const component = new (CustomElement as any)();

    expect(component.renderRoot).toBe(component);
  });
});
