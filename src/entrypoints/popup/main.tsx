import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Layout } from "./Layout.tsx";

// biome-ignore lint/style/noNonNullAssertion: boilerplate
const rootElement = document.getElementById("root")!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>,
);
