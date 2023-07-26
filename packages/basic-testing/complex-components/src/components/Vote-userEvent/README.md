<h1>Unit Testing for complex components with React Testing Library using UserEvent</h1>

`user-event` and `fireEvent` are both part of the testing-library family, but they are used for slightly different purposes:

**fireEvent:** This is a function provided by @testing-library/react that allows you to simulate DOM events like click, change, mouseover, etc. It directly triggers the event on the specified element, so it's pretty straightforward and low-level.

**user-event:** This is a library built on top of fireEvent. Its main goal is to simulate the real events that would happen in the browser as closely as possible when a real user interacts with the page. For example, if you use userEvent.type() to type into an input, it triggers a focus event on the input, a keydown event for each key, and a change event when the value of the input changes, just like what would happen if a user really typed into the input.

Advantages:

- It provides a higher-level API that simulates user behavior more closely, which makes your tests more "realistic".
- It takes into account some specificities of user interactions that aren't covered by fireEvent, like the sequence of events during a click or a typing action.

Since it work for high-level API simulation, for the next test we will need to use **asyc-await** syntax and the **findBy** method instead of **getBy** in order to make our test work.

<h2>Testing if Component Renders Without Crashing</h2>
Our first test will be to see if the component renders without crashing.
In this test, we're using the  `render`  function to render our component. Then we're using the  `getByText`  function from  `screen`  to find the "Reset" button on the screen. If the "Reset" button is in the document, then we know that our component has rendered successfully.

```jsx
test("renders Vote component without crashing", () => {
  render(<VoteUserEvent totalGlobalLikes={0} />);
  expect(
    screen.getByText(
      /Note: You are not allowed to change your vote once selected!/i
    )
  ).toBeInTheDocument();
});
```

<h2>Testing if User Can Upvote</h2>
Next, let's test if a user can upvote.
Here, we're rendering the component and finding the upvote button using  `getByAltText` . We're then simulating a click event using  `userEvent.click(upvoteButton)` . We then expect the total likes to be '1', which indicates that the user was able to upvote.

```jsx
test("allows user to upvote", async() => {
    render(<VoteUserEvent totalGlobalLikes={0} />);
    const upButton = screen.getByRole("button", { name: /thumbs up/i });
  
    userEvent.click(upButton);
    const totalLikes = await screen.findByText(/1/i);
    expect(totalLikes).toBeInTheDocument();
  });
```

<h2>Testing if User Can Downvote</h2>
Now, we'll test if a user can downvote. 
Similar to the upvote test, we're using `userEvent.click(downvoteButton)`  to simulate a click event on the downvote button. We then expect the total likes to be '-1', indicating that the user was able to downvote.

```jsx
test("allows user to downvote", async() => {
    render(<VoteUserEvent totalGlobalLikes={0} />);
    const downButton = screen.getByRole("button", { name: /thumbs down/i });
  
    userEvent.click(downButton);
    const totalLikes = await screen.findByText(/-1/i);
    expect(totalLikes).toBeInTheDocument();
  });
```

<h2>Testing if User Can Only Vote Once</h2>
Finally, let's test that a user can only vote once.
Here, we're simulating a click on both the upvote and downvote buttons. After the first click, the buttons should be disabled, preventing further votes. The  `toBeDisabled()`  function from Jest checks if an element is disabled.

```jsx
 test("allows user to only vote once", async() => {
    render(<VoteUserEvent totalGlobalLikes={0} />);
    const upButton = screen.getByRole("button", { name: /thumbs up/i });
    const downButton = screen.getByRole("button", { name: /thumbs down/i });
  
    userEvent.click(upButton);
    
    const totalLikes = await screen.findByText(/1/i);
    expect(totalLikes).toBeInTheDocument();
    userEvent.click(downButton);
    expect(downButton).toBeDisabled();
    expect(totalLikes).toBeInTheDocument();
  });
```

We invite you to continue your practice by building the necessary test for the Reset Button.
