import React from 'react';
import './App.css';
import VoteFireEvent from './components/Vote-fireEvent/VoteFireEvent';
import VoteUserEvent from './components/Vote-userEvent/VoteUserEvent';
import DrinkSearchAPITest from './components/Components-with-APIs/DrinksSearchAPITest';

// Comment and uncomment the components as you use them

function App() {
  return (
    <>
      <VoteFireEvent totalGlobalLikes={0} />
      {/* <VoteUserEvent totalGlobalLikes={0} /> */}
      {/* <DrinkSearchAPITest /> */}
    </>
  );
}

export default App;
