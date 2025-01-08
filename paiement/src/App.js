import React from 'react'

import { StoreProvider } from './Components/Store'

import Router from './routes';


const App = () => {
  return (
    <div  style={{
      width: '100%',
      maxWidth: '100%',
    }}>
     
        <StoreProvider >
        <Router/> 
        </StoreProvider> 
      
    </div>
    
  );
}

export default App