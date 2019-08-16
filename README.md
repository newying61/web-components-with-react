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
- Component: React App component - without wrapping \< \/\>.
- useShadowDOM: boolean, default to true

### Render App with styled-components in shadow DOM
```
import { StyleSheetManager } from 'styled-components'
import { ReactCustomElement } from 'web-components-with-react';
import App from './App';

const StyledApp = (renderRoot) => {
  return (
    <StyleSheetManager target={renderRoot}>
      <App />
    </StyleSheetManager>
  );
}

customElements.define('test-app', ReactCustomElement(StyledApp));
```

### render app in light DOM
Passing false to useShadwoDOM.
```
ReactCustomElement(App, false);
```

### un-mounting React App
When the custom element is removed from DOM, React App is unmounted as well.

## TODO:
- Supporting passing in attributes and re-render when atrributes change
- Supporting custom styles in shadow DOM
