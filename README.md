# web-components-with-react
Render React App inside web components, supporting React Hooks.

By default the react App will be rendered inside shadow DOM.

## Installation
Package web-components-with-react is available on npm.

```
yarn add web-components-with-react
```

## Basic Usage
Wrapp the React App with ReactCustomElement and then use customElements.define to create the web component.

Or inheriting the class from ReactCustomElement(App) and then define web component.

```
import { ReactCustomElement } from 'web-components-with-react';
import App from './App';

customElements.define('test-app', ReactCustomElement(App));
```

Then in the index.html file in public folder, simply use add the tag.
```
<test-app></test-app>
```

By default, the React App is rendered inside shadow DOM.

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

createGlobalStyle from styled-components will render css tring inside renderRoot as well.

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

### render app in light DOM
Passing false to useShadwoDOM.
```
ReactCustomElement(App, false);
```

### un-mounting React App
When the custom element is removed from DOM, React App is unmounted as well.

### Browser support
Chrome >= 54, Firefox >= 63, Safari >= 10.1, IE Edge >= 76

For IE 11, and older browsers web components polyfill is needed and the React App is always rendered in light DOM.
[webcomponents.js (v1 spec polyfills)](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs)

