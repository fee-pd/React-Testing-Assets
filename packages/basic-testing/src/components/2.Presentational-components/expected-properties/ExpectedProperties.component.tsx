import { fakeEmployees } from '../../../mocks/employees';
import ExpectedPropertiesView from './ExpectedProperties.view';

const ExpectedProperties = () => {
return (
  <ExpectedPropertiesView fakeEmployees={fakeEmployees} />
  )
};

export default ExpectedProperties;
                               