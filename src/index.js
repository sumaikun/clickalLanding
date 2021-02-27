import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product

//import Components from "views/Components/Components.js";
//import LandingPage from "views/LandingPage/LandingPage.js";
import ClickalMedic from "views/ClickalMedic/Components";
//import ProfilePage from "views/ProfilePage/ProfilePage.js";
//import LoginPage from "views/LoginPage/LoginPage.js";


//flux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//import api from "./middleware/api";
import reducers from "./reducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const middleware = [thunk];

const composedEnhancers = compose(
  applyMiddleware(...middleware)
);
  
//const store = createStoreWithMiddleware(reducers);

const store = createStore(persistedReducer, {}, composedEnhancers);

Window.Store = store;

const persistor = persistStore(store)

var hist = createBrowserHistory();


ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router history={hist}>
        <Switch>
          <Redirect exact from="/" to="/clickal-page"/>
          { /*
            <Route path="/landing-page" component={LandingPage} />
            <Route path="/profile-page" component={ProfilePage} />
            <Route path="/login-page" component={LoginPage} />
            <Route path="/" component={Components} />            
          */} 
          <Route path="/clickal-page" component={ClickalMedic} />          
        </Switch>
      </Router>
      </PersistGate>
  </Provider>,
  document.getElementById("root")
);
