import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import "./bootstrap.min.css"
import "bootstrap"

import "bootstrap/dist/js/bootstrap.js"
import $ from "jquery"
import Popper from "popper.js"
import store from "./store"
import { Provider } from "react-redux"
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
