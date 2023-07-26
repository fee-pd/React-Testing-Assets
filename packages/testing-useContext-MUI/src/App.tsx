import React from "react";
import { MovieProvider } from "./context/MovieProvider";
import ListContainer from "./components/ListContainer";

function App() {
  return (
    <MovieProvider>
      <section>
        <header>
          <ListContainer />
        </header>
      </section>
  </MovieProvider>
  );
}

export default App;
