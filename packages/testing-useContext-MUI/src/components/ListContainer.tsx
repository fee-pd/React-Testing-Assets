import React, { useContext } from "react";
import { TextField } from '@mui/material';
import MovieList from "./MovieList";
import MovieForm from "./MovieForm";
import { MovieContext } from "../context/MovieContext";

const ListContainer = () => {
  const { state, dispatch } = useContext(MovieContext);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'FILTER', payload: event.target.value });
  };

  return (
    <section>
      <header>
        <TextField 
          type="text" 
          placeholder="Filter list" 
          value={state.searchTerm} 
          onChange={handleSearchChange}
        />
        <MovieList />
        <MovieForm />
        {/* <Button 
          variant="contained" 
          color="primary" 
          onClick={() => dispatch({ type: 'CLEAR_MOVIES' })}
        >
          Clear Movies
        </Button> */}
      </header>
    </section>
  );
};

export default ListContainer;
