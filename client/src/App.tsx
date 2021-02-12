import React from 'react';
import './App.css';

// components
import YoutubeWrapper from './components/YoutubeWrapper';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <YoutubeWrapper/>
      </header>
    </div>
  );
};

export default App;
