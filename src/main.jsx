// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { WishlistProvider } from "./context/WishlistContext";


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
    
//     <WishlistProvider>
      
//     <App />
    
//     </WishlistProvider>
//   </StrictMode>,
// )






import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import { WishlistProvider } from "./context/WishlistContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>     
      <AuthProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);