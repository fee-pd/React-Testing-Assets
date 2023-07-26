# Structuring test with React Testing Library

- The recommended pattern for writing test code, as per the creators, is Arrange-Act-Assert.

## Arrange - Render

- To test your React component's output, you need a method to render them into the DOM. The render method takes a passed-in component, places it inside a div element, and attaches it to the DOM.

``` jsx
import { render } from @testing-library/react;
import ElemetToTest from './ElementToTest;
it ('dislays the heading', () => { render (<ElementToTest />)}
```

- In many other testing frameworks, it's necessary to write additional code to clean up the DOM after the first test is executed, so the following tests start from a clean slate and are not affected by the code from the previous test. The render method automatically performs this action for us.

### Selecting elements in the DOM output - Act

- Once we have rendered the component to be tested into the DOM, the next step is to select the elements by querying the output, similar to how a user would.

- To query the DOM, there is a screen method:

``` jsx
import { render, screen } from '@testing-library/react';
```

- If we wanted to search for a DOM element with the text "Welcome to our site", there are two ways::

  - Using getByText - this looks for an element with the matching text, and we add a regular expression inside the method so that an uppercase or lowercase case doesn't affect the query.

``` jsx
it ('dislays the heading', () => {
  render (<ElementToTest />)
  screen.getByText(/welcome to our site!/i)
})
```

- Using getByRole - The DOM Testing Library team recommends using this method to select elements. This helps us to query the DOM similarly to how anyone, including screen readers, would search. Unlike getByText, the getByRole method will look for an element heading with the provided text.

``` jsx
it ('dislays the heading', () => {
  render (<ElementToTest />)
  screen.getByRole('heading', { name: /welcome to our site!/i })
  })
```

- With the two code snippets, you will receive an error. The errors are displayed automatically. In this case, you will see a list of all the possible roles that are in the DOM.

### Asserting expected behavior - Assert

- The last step is to assert expected behavior. In our examples, we can use the toBeInTheDocument method.

``` jsx
it('displays the heading', () => {
  render(<ElementToTest />)
  screen.getByRole('heading', { name: /welcome to our site!/i }).toBeInTheDocument()
});
```
