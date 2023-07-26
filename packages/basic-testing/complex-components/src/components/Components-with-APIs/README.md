<h2>Unit Testing with React Testing Library</h2>

<h3>Getting Started</h3>
To start, we'll need to import the necessary libraries:

```javascript
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { rest } from "msw";
import DrinkSearch from "./DrinkSearch";
import { mockServer } from "./mocks/server.js";
```

This setup allows you to control how your application responds to network requests, which can be useful for testing different scenarios. You can simulate what should happen when the server returns an error, when the server returns certain data, etc., all without having to connect to a real server.

To test our App with API's we will need a way to mock or simulte the backend calls, and not directly call the service. This is the reason we are using `mockServer` and `rest` imports on our test files.

- `rest` from `msw` is a library that helps you control how your application interacts with network requests. It provides a way to intercept network requests and return mock responses. The `rest` import from `msw` allows us to create these handlers for RESTful APIs.

- The `mockServer` is an instance of a server set up by MSW. It will use the handlers we define to mock network responses. Handlers are a set of instructions for how `mockServer` should respond to certain network requests. 

- To complete this, you'll need to have two files: `handler.ts` and `serviceMock.ts`:
  - The `handler.ts` file, you are defining what response should be returned when the application makes a `GET` request.
  - `server.ts` file is sets the `mockServer` using the handlers defined in `handler.ts` . The `setupServer` function from `msw/node` takes the handlers as arguments and sets up a server with those handlers.

<h3>Setting Up the Server</h3>
Next, we set our mock server before and after our tests:

```javascript
beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());
```

<h3>Test Case 1: Renders Mock Drink Data</h3>
In our first test, we simulate a user searching for a drink. We then check if our mock drink data is displayed on the screen.

We use `render` to render our `DrinkSearch` component, `screen.getByRole` to get our search input, `user.type` to simulate typing into the search input and pressing enter, and `expect` along with `screen.findByRole` or `screen.getByText` to check that our mock drink data is displayed on the screen.

```javascript
test("renders mock drink data", async () => {
  render(<DrinkSearch />);
  const searchInput = screen.getByRole("searchbox");

  user.type(searchInput, "vodka", { enter });

  expect(
    await screen.findByRole("img", { name: /test drink/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /test drink/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/test ingredient/i)).toBeInTheDocument();
  expect(screen.getByText(/test instructions/i)).toBeInTheDocument();
});
```

<h3>Test Case 2: Renders No Drink Results</h3>
In our second test, we simulate a search where no drinks are found. We then check if a "No drinks found" message is displayed.

We use `mockServer.use` to mock our API's response so that it returns no drinks. After simulating the search, we then use `expect` along with `screen.findByRole` to check that a "No drinks found" message is displayed.

```javascript
test("renders no drink results", async () => {
  mockServer.use(
    rest.get(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php",
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            drinks: null,
          })
        );
      }
    )
  );

  render(<DrinkSearch />);
  const searchInput = screen.getByRole("searchbox");

  user.type(searchInput, "vodka", { enter });

  expect(
    await screen.findByRole("heading", { name: /no drinks found/i })
  ).toBeInTheDocument();
});
```

<h3>Test Case 3: Renders Service Unavailable</h3>
In our third test, we simulate a server error. We then check if a "Service unavailable" message is displayed.

We use `mockServer.use` to mock our API's response so that it returns a server error. After simulating the search, we then use `expect` along with `screen.findByRole` to check that a "Service unavailable" message is displayed.

```javascript
test("renders service unavailable", async () => {
  mockServer.use(
    rest.get(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php",
      (req, res, ctx) => {
        return res(ctx.status(503));
      }
    )
  );

  render(<DrinkSearch />);
  const searchInput = screen.getByRole("searchbox");

  user.type(searchInput, "vodka", { enter });

  expect(
    await screen.findByRole("heading", { name: /Service unavailable/i })
  ).toBeInTheDocument();
});
```

<h3>Test Case 4: Prevents GET Request When Search Input Empty</h3>
In our final test, we simulate pressing enter without typing anything into the search input. We then check that no drinks are displayed.

After rendering our component and getting our search input, we use `user.type` to simulate pressing enter without typing anything. We then use `expect` along with `screen.queryByRole` to check that no drinks are displayed. Note that we use `queryByRole` instead of `getByRole` because `queryByRole` does not throw an error when no elements match the provided query.

```javascript
test("prevents GET request when search input empty", async () => {
  render(<DrinkSearch />);
  const searchInput = screen.getByRole("searchbox");

  user.type(searchInput, "{enter}");

  expect(screen.queryByRole("heading")).not.toBeInTheDocument();
});
```