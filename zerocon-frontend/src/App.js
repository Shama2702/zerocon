import React from 'react'
import AOS from 'aos';
import "aos/dist/aos.css";
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from './views/Main';
import { Provider } from 'react-redux';
import store from './redux/store';

//import files for react alerts
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT
};

function App() {
  AOS.init();
  AOS.refresh();
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          <Switch>
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </AlertProvider>
    </Provider>
  )
}

export default App

