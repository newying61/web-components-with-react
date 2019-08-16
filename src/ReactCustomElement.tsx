import React, { ComponentType } from "react";
import ReactDOM from "react-dom";

const createReactCustomElement = (
  Component: ComponentType<any>,
  useShadowDOM: boolean = true
): typeof HTMLElement => {
  return class ReactCustomElement extends HTMLElement {
    /*
     * Mounting point for react App.
     * If shadow DOM is not polyfilled and usable, will be the shadowRoot.
     * If not, will be the component itself.
     *
     */
    private renderRoot: Element|DocumentFragment;

    public constructor() {
      super();
      this.renderRoot = this.createRenderRoot();
    }

    public connectedCallback() {
      this.renderApp();
    }

    public renderApp() {
      ReactDOM.render(
        <Component renderRoot={this.renderRoot} />,
        this.renderRoot as Element
      );
    }

    public disconnectedCallback() {
      ReactDOM.unmountComponentAtNode(this.renderRoot as Element);
    }

    protected createRenderRoot(): Element|ShadowRoot {
      if (!useShadowDOM) {
        return this;
      }

      // If Shadow DOM is polyfilled, always render react app in light DOM.
      if ((window as any).ShadyDOM) {
        return this;
      }

      return this.attachShadow({mode: 'open'});
    }
  };
};

export default createReactCustomElement;
