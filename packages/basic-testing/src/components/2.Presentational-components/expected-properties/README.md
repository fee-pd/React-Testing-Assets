<h3>Testing Expected Properties</h3>
Presentational components often have data passed into them as <strong>props</strong>. Consider the ExpectedPropertiesView component which expects the prop <strong>fakeEmployees</strong> to display a list of employees:

``` javascript
const ExpectedPropertiesView: React.FC<IProps> = (props) => {
  return (
    <table className="table table-striped">
      <thead className="thead-dark">
        {/*...*/}
      </thead>
      <tbody>
        {props.fakeEmployees.map((employee) => {
          return (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.title}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
```

We can test whether the component properly accepts and displays rows of employee data in the DOM.
<ol><li>Import the <strong>render</strong> and <strong>screen</strong> methods, the ExpectedPropertiesView, and the <strong>fakeEmployees</strong> mock:</li></ol>
``` javascript
import ExpectedPropertiesView from './ExpectedProperties.view';
import { render, screen } from '@testing-library/react';
import { fakeEmployees } from '../mocks/employees';
```
<ol start="2"><li>Declare the test and render the component, passing the <strong>fakeEmployees</strong> data:</li></ol>
``` javascript
it('renders with expected values', () => {
  render(<ExpectedPropertiesView fakeEmployees={fakeEmployees} />)
});
```

This will test the component with the expected properties and ensure that it renders as intended.