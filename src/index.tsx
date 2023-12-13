import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
`

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
