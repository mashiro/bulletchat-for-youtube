import { createHotContext } from '../vendor/vite-client.mjs.js';
import exports from '../vendor/react-refresh.js';
import react_default from '../vendor/deps/react.js';
import logo from './logo.svg.js';
import './App.css.js';
import react_jsx_dev_runtime_default from '../vendor/deps/react_jsx-dev-runtime.js';

import.meta.hot = createHotContext("/src/App.tsx.js");let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    exports.register(type, "/workspaces/bulletchat-for-youtube/src/App.tsx " + id);
  };
  window.$RefreshSig$ = exports.createSignatureFunctionForTransform;
}
var _jsxFileName = "/workspaces/bulletchat-for-youtube/src/App.tsx", _s = $RefreshSig$();
 const useState = react_default["useState"];
 const _jsxDEV = react_jsx_dev_runtime_default["jsxDEV"];
function App() {
  _s();
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ _jsxDEV("div", {
    className: "App",
    children: /* @__PURE__ */ _jsxDEV("header", {
      className: "App-header",
      children: [/* @__PURE__ */ _jsxDEV("img", {
        src: logo,
        className: "App-logo",
        alt: "logo"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("p", {
        children: "Hello Vite + React!"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("p", {
        children: /* @__PURE__ */ _jsxDEV("button", {
          type: "button",
          onClick: () => setCount((count2) => count2 + 1),
          children: ["count is: ", count]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 14,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("p", {
        children: ["Edit ", /* @__PURE__ */ _jsxDEV("code", {
          children: "App.tsx"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 19,
          columnNumber: 16
        }, this), " and save to test HMR updates."]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 9
      }, this), /* @__PURE__ */ _jsxDEV("p", {
        children: [/* @__PURE__ */ _jsxDEV("a", {
          className: "App-link",
          href: "https://reactjs.org",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "Learn React"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 22,
          columnNumber: 11
        }, this), " | ", /* @__PURE__ */ _jsxDEV("a", {
          className: "App-link",
          href: "https://vitejs.dev/guide/features.html",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "Vite Docs"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 9
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 5
  }, this);
}
_s(App, "oDgYfYHkD9Wkv4hrAPCkI/ev3YU=");
_c = App;
var _c;
$RefreshReg$(_c, "App");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  import.meta.hot.accept();
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      exports.performReactRefresh();
    }, 30);
  }
}

export { App as default };
