## Unit Testing with React Testing Library, useContext and Material UI.

In this chapter, we are going to explore a simple Movie List App built with React, making use of useContext for state management and Material UI (MUI) for the user interface.

This Movie List App lets users view a list of movies, add new movies to the list, delete movies from the list, and filter the movie list based on a search term.

### Core Components

Our application consists of the following core components:

MovieProvider: This is our context provider that uses React's useReducer for state management. It provides the state and dispatch function to the child components.

MovieContext: This is our React context, where we define our state and actions. The state consists of a list of movies and a search term, and the actions are functions that modify this state.

List: This component displays a list of movies. It also includes a search input field to filter the movies based on their names.

Movie: This component displays a single movie. It receives a movie object as a prop and displays the movie's name and description.

**Remember:** The primary goal of unit testing is to take the smallest piece of testable software in the application, isolate it from the remainder of the code, and determine whether it behaves exactly as expected.

We will explain some of the main tests in this README, however you will find more test in the `.test.tsx` files that you can read, practice and modify for your own learning process.

#### Testing Movie Provider Initial State

- We are checking if our initial state is set as expected.
- Because the MovieProvider itself doesn't render anything, we need to create a test component that consumes the context and displays something based on its values.
- Create a TestComponent that renders the searchTerm from the context's state. This allows us to check the initial state when we render TestComponent inside MovieProvider.
- We then assert that the initial searchTerm is an empty string, which is the expected initial state for our MovieProvider.

```jsx
import { render, screen } from "@testing-library/react";
import { MovieProvider, MovieContext } from "../context/MovieProvider";

function TestComponent() {
  return (
    <MovieContext.Consumer>
      {({ state }) => <span>Initial searchTerm: {state.searchTerm}</span>}
    </MovieContext.Consumer>
  );
}

test("MovieProvider, given initial render, sets initial context state correctly", () => {
  render(
    <MovieProvider>
      <TestComponent />
    </MovieProvider>
  );

  expect(screen.getByText(/Initial searchTerm: /)).toHaveTextContent(
    "Initial searchTerm: "
  );
});
```

#### Testing Movie component rendering
- We first create a  `movieProps`  object containing the movie's details.
- Then we render the  `Movie`  component within the  `MovieProvider`  context provider.
- After that, we assert that the movie's name and description are present in the document.

``` jsx
test('Movie, given initial render, displays movie name and description', () => {
  const movieProps = {
    id: "1",
    name: "Test Movie",
    description: "This is a test movie",
    onDelete: jest.fn(),
  };

  render(
    <MovieProvider>
      <Movie {...movieProps} />
    </MovieProvider>
  )

  expect(screen.getByText('Test Movie')).toBeInTheDocument();
  expect(screen.getByText('This is a test movie')).toBeInTheDocument();
});
```

#### Testing Movie List Component
- We set up the props for the MovieList component.
- Then render it within the MovieProvider context provider. 
- Finally, we assert that the names of the movies in the list are present in the document.

``` jsx

test('MovieList, given initial render, displays list of movies', () => {
  const movieListProps = {
    movies: [
      { id: "1", name: "Movie 1", description: "This is movie 1" },
      { id: "2", name: "Movie 2", description: "This is movie 2" },
    ],
    onDelete: jest.fn(),
  };

  render(
    <MovieProvider>
      <MovieList {...movieListProps} />
    </MovieProvider>
  );

  expect(screen.getByText('Movie 1')).toBeInTheDocument();
  expect(screen.getByText('Movie 2')).toBeInTheDocument();
});
