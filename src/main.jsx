import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client'; // 导入 createRoot 和 hydrateRoot
import App from './App.jsx';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  // 使用 hydrateRoot 进行服务端渲染（SSR）的 hydration
  hydrateRoot(rootElement, <App />);
} else {
  // 使用 createRoot 进行客户端渲染
  const root = createRoot(rootElement);
  root.render(<App />);
}

serviceWorkerRegistration.register();


/*
import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App.jsx';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
serviceWorkerRegistration.register();
*/