<h3>Testing Presentational Components</h3>
Presentational components are components that do not manage state. These components are used to present data received from parent components.
<h4>Creating Snapshots</h4>
Snapshot tests are a useful tool when you want to ensure the HTML output of a component doesn't change unexpectedly, or when the information is hardcoded.

For example, let's say developers modify the component HTML structure by adding another paragraph element with static text. This modification will cause the test to fail and provide a visual representation of the changes.

To test with snapshots:
<ol><li>Import the <strong>render</strong> method:</li></ol>
``` javascript
import { render } from '@testing-library/react';
```
<ol start="2"><li>Use object destructuring to get the <strong>container</strong> off the rendered component. This will represent the resulting HTML output:</li></ol>
``` javascript
const { container } = render(<PresentationalComponent />);
```
<ol start="3"><li>Use the <strong>toMatchInlineSnapshot</strong> method to capture the HTML output:</li></ol>
``` javascript
expect(container).toMatchInlineSnapshot(`
  <div>
    <div
      class="card text-center m-1"
      style="width: 18rem;"
    >
      <i
        class="material-icons"
        style="font-size: 4rem;"
      >
        airplanemode_active
      </i>
      <h4>
        Travel Anywhere
      </h4>
      <p
        class="p-1"
      >
        Our premium package allows you to take exotic trips anywhere at the cheapest prices!
      </p>
    </div>
  </div>
`);
```

The next time someone changes the output of the PresentationalComponent, the test will fail. You can try changing the text in the PresentationalComponent's <strong><h4></strong> tag to "Go Anywhere" to see this in action.

If the change was intentional, you can update the snapshot directly in your test code or by running  `npm test -- -u`  in your terminal. This will update all snapshots that are currently failing.
