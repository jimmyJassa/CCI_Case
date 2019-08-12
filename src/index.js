import React from "react";
import ReactDOM from "react-dom";
import {Provider as ReduxProvider} from "react-redux";
import App from './components/App';
import configureStore from './store.js'

const store = configureStore()


const rootElement = document.getElementById("root");
ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  rootElement
);
