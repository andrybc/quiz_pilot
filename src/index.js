import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from './GlobalState';
import { Provider } from 'react-redux';
import store from './redux store/store';
import { configureStore} from '@reduxjs/toolkit';
import './index.css';
import LoginPage from './components/Login/LoginPage';
import App from './components/App/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalProvider> 
  
        <App />
  
    </GlobalProvider>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
