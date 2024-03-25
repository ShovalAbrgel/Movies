import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './Reducer.js'
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(Reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
    </React.StrictMode>
  );
  