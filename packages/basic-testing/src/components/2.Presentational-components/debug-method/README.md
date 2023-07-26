<h3>Debug Method</h3>
You can use the debug method to log the entire DOM output of a component when you run your test:

``` javascript
it('displays the header and paragraph text', () => {
  render(<DebugMethod />)
  screen.debug()
});
```

By adding the <strong>screen.debug()</strong> call, the complete body of the component will be logged into the console.
<h4>Debugging Specific Component Elements</h4>
We can use the <strong>debug</strong> method to log specific elements of the DOM.

``` javascript
it('displays the header and paragraph text', () => {
  render(<DebugMethod />)
  const header = screen.getByRole('heading', { name: /travel anywhere/i })
  screen.debug(header)
});
```

By adding a variable to get a specific part of the DOM, it will be logged into the console, enabling you to focus your test on it.

Remember the importance of removing the debug methods before you commit any changes. Debug calls are great for development and testing, but they should not be included in production code.