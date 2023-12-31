
import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import AppRouter from './components/AppRouter';
import './main.css';



const App: React.FC = () => {

  return (
    <>
    <div>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600&family=Noto+Serif:ital,wght@0,400;0,700;1,200&display=swap"
          rel="stylesheet"
        />
      <div>
        <AppRouter />
        </div>
        </div>
    </>
  )
}

export default App;
