# web-components-with-react
Render React App inside web components, supporting React Hooks.

By default the react App will be rendered inside shadow DOM.

## Installation
Package web-components-with-react is available on npm.

```
yarn add web-components-with-react
```

or

```
npm install web-components-with-react
```

## Basic Usage
Wrap the React App with ReactCustomElement and then use customElements.define() to create the web component.

Or inheriting the class from ReactCustomElement(App) and customize, then define web component.

```
import { ReactCustomElement } from 'web-components-with-react';
import App from './App';

customElements.define('test-app', ReactCustomElement(App));
```

In the index.html file in public folder, simply use the web component tag.
```
<test-app></test-app>
```

The React App is rendered inside the web component (by default inside shadow DOM).

ReactCustomElement parameters:
- Component: React App component - without wrapping App inside \< \/\>.
- useShadowDOM: boolean, default to true

### Render App with styled-components in shadow DOM
```
import { StyleSheetManager } from 'styled-components'
import { ReactCustomElement } from 'web-components-with-react';
import App from './App';

const StyledApp = ({ renderRoot }) => {
  return (
    <StyleSheetManager target={renderRoot}>
      <App />
    </StyleSheetManager>
  );
}

customElements.define('test-app', ReactCustomElement(StyledApp));
```

createGlobalStyle from styled-components will render css string inside renderRoot (shadowRoot) as well.

### Render styles in shadow DOM
Create a wrapper App like this:
```
const AppWithStyles = ({ renderRoot }) => {
  return (
    <>
      <link rel="stylesheet" href="https://css-url.min.css"/>
      <style>{AppStyleString}</style>
      <App renderRoot={renderRoot} />
    </>
  );
}

customElements.define('test-app', ReactCustomElement(AppWithStyles));
```

### Pass host attributes value to React App and monitor attribute changes
Use ReactCustomElementWithProps factory method to create a custom element for monitoring host attributes changes.

The host attributes will be passed into React App as camelCased props (string type).

Please use JSON.parse() etc. to convert the attribute value string to object.

Each attribute change will trigger a React App re-render.

Example:
```
import { ReactCustomElementWithProps } from 'web-components-with-react';
import App from './App';

customElements.define('test-app', ReactCustomElementWithProps(App, ['app-config', 'app-state']));
```

React App will have { renderRoot, appConfig, appState } as props.

In the web component, specify attributes:
```
<test-app app-config='{"env":"dev"}' app-state='{"anyState":"stateValue"}'></test-app>
```

ReactCustomElementWithProps parameters:
- Component: React App component - without wrapping App inside \< \/\>.
- properties: string array. Attribute names to be monitored.
- useShadowDOM: boolean, default to true

### render App in light DOM
Passing false to useShadwoDOM parameter.
```
ReactCustomElement(App, false);
```

### un-mounting React App
When the custom element is removed from DOM, React App is unmounted as well.

### Browser support
Chrome >= 54, Firefox >= 63, Safari >= 10.1, IE Edge >= 76

For IE 11, and older browsers web components polyfill is needed and the React App is always rendered in light DOM.
[webcomponents.js (v1 spec polyfills)](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs)

