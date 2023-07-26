import React, { useContext } from "react";
import { Button } from '@mui/material';
import { MovieContext } from "../context/MovieContext";
import { MovieType } from "../types/types";

const Movie = ({ id, name, description }: Partial<MovieType>) => {
  const { dispatch } = useContext(MovieContext);

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <Button 
        variant="contained" 
        color="secondary"
        onClick={() => dispatch({ type: 'DELETE_MOVIE', payload: id! })}
      >
        Delete
      </Button>
    </div>
  );
};

export default Movie;
