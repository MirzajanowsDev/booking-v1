import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './App';
import DatePickerComponent from './ui/dashboard/datapicker';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
       <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
        {/* <App /> */}
      <App/>
{/* <DatePickerComponent/> */}
  
    </BrowserRouter>
  </React.StrictMode>
       </Provider>
);
