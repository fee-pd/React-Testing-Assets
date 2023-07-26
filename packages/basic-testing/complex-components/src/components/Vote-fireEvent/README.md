
<h1>Unit Testing for complex components with React Testing Library using FireEvent</h1>
Unit testing is a way of verifying that individual units of your code (like functions or components) work as expected. It's like a safety net for your application that helps you catch bugs before they affect your users.

<h2>Understanding the Component</h2>
Before we start testing, it's essential to understand the component we're working with. In this guide, we're using a voting component that allows users to either upvote or downvote. The key aspect of this component is that a user can vote only once.

<h2>Writing Your First Test</h2>
We will start by testing if the component renders without crashing. Create a file named  `Vote.test.tsx`  in the same directory as your  `Vote.tsx`  file.

``` tsx
import { render, screen } from '@testing-library/react';
import Vote from './Vote';

test('renders without crashing', () => {
  render(<Vote totalGlobalLikes={10} />);
  expect(screen.getByText(/Note: You are not allowed to change your vote once selected!/i)).toBeInTheDocument();
});
```

This test checks if the component renders without throwing an error and if a specific text ("Note: You are not allowed to change your vote once selected!") is present in the document.

<h2>Testing User Interactions</h2>
Next, we'll test if the buttons in our component are working correctly. We'll use  `fireEvent`  from  `@testing-library/react`  to simulate user interactions.
<h3>Test Upvoting</h3>

``` tsx
import { fireEvent } from '@testing-library/react';

test('user can upvote', () => {
  const totalGlobalLikes = 10;
  render(<Vote totalGlobalLikes={totalGlobalLikes} />);
  
  const upButton = screen.getByRole('button', { name: /thumbs up/i });

  // User clicks the upvote button
  fireEvent.click(upButton);

  // Expect the totalLikes to have increased by one
  expect(screen.getByText('11')).toBeInTheDocument();
});
```

In this test, we're simulating a user clicking the upvote button, then checking if the number of likes increased by one.
<h3>Test Downvoting</h3>
We'll do something similar for downvoting:

``` tsx
test('user can downvote', () => {
  const totalGlobalLikes = 10;
  render(<Vote totalGlobalLikes={totalGlobalLikes} />);
  
  const downButton = screen.getByRole('button', { name: /thumbs down/i });

  // User clicks the downvote button
  fireEvent.click(downButton);

  // Expect the totalLikes to have decreased by one
  expect(screen.getByText('9')).toBeInTheDocument();
});
```
<h2>Testing Business Rules</h2>
Our voting component has a specific business rule: a user can only vote once. Let's write a test for this:

``` tsx
test('user can only vote once', () => {
  const totalGlobalLikes = 10;
  render(<Vote totalGlobalLikes={totalGlobalLikes} />);
  
  const upButton = screen.getByRole('button', { name: /thumbs up/i });
  const downButton = screen.getByRole('button', { name: /thumbs down/i });

  // User clicks the upvote button
  fireEvent.click(upButton);

  // Both buttons should now be disabled
  expect(upButton).toBeDisabled();
  expect(downButton).toBeDisabled();

  // Reset before the next click
  render(<Vote totalGlobalLikes={totalGlobalLikes} />);
  
  // User clicks the downvote button
  fireEvent.click(downButton);

  // Both buttons should now be disabled
  expect(upButton).toBeDisabled();
  expect(downButton).toBeDisabled();
});
```
In the test file you will find some extra examples of other ways of testing this component, by using different number in the props or by the background color of the button after being clicked.

We invite you to continue your practice by building the necessary test for the Reset Button.

